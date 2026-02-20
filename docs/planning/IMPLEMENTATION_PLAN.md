# Plano de Implementação — Refatoração Arquitetural

> **Referência**: [ARCHITECTURE_ANALYSIS.md](../architecture/ARCHITECTURE_ANALYSIS.md)  
> **Data**: 18/02/2026  
> **Estratégia**: Migração incremental, módulo a módulo, sem quebrar a aplicação em nenhum momento  

---

## Visão Geral das Fases

| Fase | Nome                    | Objetivo                                          | Tasks | Dependência |
|:----:|:------------------------|:--------------------------------------------------|:-----:|:-----------:|
| 0    | Segurança Imediata      | Remover credenciais expostas                      | 2     | —           |
| 1    | Fundação do Core        | Criar tipos base, Result, hierarquia de erros     | 6     | —           |
| 2    | Contratos (Interfaces)  | Definir todas as interfaces de Repository e Auth  | 9     | Fase 1      |
| 3    | Infraestrutura          | Mover repositories para `infrastructure/`         | 9     | Fase 2      |
| 4    | Container DI            | Criar container e integrar com React              | 4     | Fase 3      |
| 5    | Serviços Completos      | Padronizar Service Layer em todos os módulos      | 7     | Fase 4      |
| 6    | Validação               | Instalar Zod e criar schemas                      | 8     | Fase 5      |
| 7    | Backend Supabase        | DB Functions, triggers, indexes, migrations       | 6     | Fase 1      |
| 8    | Qualidade               | Testes, path aliases, CI/CD                       | 5     | Fase 6      |
|      |                         | **TOTAL**                                         | **56**|             |

---

## Fase 0 — Segurança Imediata

> **Prioridade**: URGENTE  
> **Risco**: Token do Supabase exposto publicamente  
> **Tempo estimado**: 15 minutos

### Task 0.1 — Revogar e remover token do `.gemini/settings.json`

**Arquivo**: `.gemini/settings.json`

**Estado atual**:
```json
{
    "mcpServers": {
        "supabase": {
            "command": "npx",
            "args": [
                "-y",
                "@supabase/mcp-server-supabase@latest",
                "--access-token",
                "sbp_b32a4b2927522b7aeaf77495737acb7cde678391"
            ]
        }
    }
}
```

**Ações**:
1. Acessar o painel do Supabase e **revogar** o access token `sbp_b32a...`
2. Gerar um novo token
3. Alterar o arquivo para usar variável de ambiente:

```json
{
    "mcpServers": {
        "supabase": {
            "command": "npx",
            "args": [
                "-y",
                "@supabase/mcp-server-supabase@latest",
                "--access-token",
                "${SUPABASE_ACCESS_TOKEN}"
            ]
        }
    }
}
```

**Critério de aceite**: Token antigo revogado, nenhum segredo hardcoded no repositório.

### Task 0.2 — Adicionar `.gemini/` ao `.gitignore`

**Arquivo**: `.gitignore`

**Ação**: Adicionar no bloco de configurações locais:

```gitignore
# Gemini / AI IDE config (pode conter tokens)
.gemini/
```

**Critério de aceite**: `.gemini/` não é mais rastreado pelo Git.

---

## Fase 1 — Fundação do Core

> **Prioridade**: Alta  
> **Objetivo**: Criar os tipos e estruturas base que todas as camadas vão utilizar  
> **Tempo estimado**: 2-3 horas  
> **Pode ser feito em paralelo com**: Fase 7 (Backend Supabase)

### Task 1.1 — Criar o tipo `Result<T, E>`

**Criar arquivo**: `src/core/types/Result.ts`

```typescript
export type Result<T, E = AppError> =
    | { success: true; data: T }
    | { success: false; error: E }

export const Result = {
    ok<T>(data: T): Result<T, never> {
        return { success: true, data }
    },
    fail<E>(error: E): Result<never, E> {
        return { success: false, error }
    },
}
```

**Por que**: Elimina o uso de `throw` como mecanismo de controle de fluxo, tornando erros parte explícita da assinatura de retorno. Todos os Services e Repositories passarão a retornar `Result` em vez de lançar exceções.

**Critério de aceite**: Tipo exportado e sem erros de compilação.

### Task 1.2 — Criar hierarquia de erros `AppError`

**Criar arquivos**:
- `src/core/errors/AppError.ts`
- `src/core/errors/ValidationError.ts`
- `src/core/errors/AuthenticationError.ts`
- `src/core/errors/NotFoundError.ts`
- `src/core/errors/NetworkError.ts`
- `src/core/errors/index.ts` (barrel export)

**Detalhamento de `AppError.ts`**:
```typescript
export abstract class AppError extends Error {
    abstract readonly code: string
    abstract readonly statusCode: number
    readonly timestamp: Date

    constructor(message: string, readonly context?: Record<string, unknown>) {
        super(message)
        this.name = this.constructor.name
        this.timestamp = new Date()
    }

    static fromUnknown(err: unknown): AppError {
        if (err instanceof AppError) return err
        if (err instanceof Error) return new UnexpectedError(err.message)
        return new UnexpectedError(String(err))
    }
}
```

**Detalhamento de `ValidationError.ts`**:
```typescript
export class ValidationError extends AppError {
    readonly code = 'VALIDATION_ERROR'
    readonly statusCode = 400

    constructor(
        message: string,
        readonly fields: Record<string, string[]> = {}
    ) {
        super(message, { fields })
    }
}
```

**Detalhamento de `AuthenticationError.ts`**:
```typescript
export class AuthenticationError extends AppError {
    readonly code = 'AUTH_ERROR'
    readonly statusCode = 401
}
```

**Detalhamento de `NotFoundError.ts`**:
```typescript
export class NotFoundError extends AppError {
    readonly code = 'NOT_FOUND'
    readonly statusCode = 404

    constructor(entity: string, id?: string) {
        super(`${entity} não encontrado${id ? `: ${id}` : ''}`, { entity, id })
    }
}
```

**Detalhamento de `NetworkError.ts`**:
```typescript
export class NetworkError extends AppError {
    readonly code = 'NETWORK_ERROR'
    readonly statusCode = 0

    constructor(message = 'Falha na conexão com o servidor') {
        super(message)
    }
}
```

**Critério de aceite**: Todos os erros estendem `AppError`, barrel export funcional.

### Task 1.3 — Criar tipos de domínio para autenticação

**Criar arquivo**: `src/core/types/auth.types.ts`

```typescript
export interface AuthUser {
    id: string
    email: string
    fullName: string | null
    avatarUrl: string | null
}

export interface AuthSession {
    accessToken: string
    refreshToken: string
    expiresAt: number
    user: AuthUser
}

export interface SignUpData {
    email: string
    password: string
    fullName: string
}

export interface SignInData {
    email: string
    password: string
}

export interface AuthResult {
    user: AuthUser
    session: AuthSession
}

export type AuthEvent = 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED' | 'PASSWORD_RECOVERY'
export type AuthStateCallback = (event: AuthEvent, session: AuthSession | null) => void
export interface AuthSubscription {
    unsubscribe: () => void
}
```

**Por que**: Os tipos de autenticação atuais em `models.ts` e `AuthService.ts` estão acoplados ao Supabase (`User`, `Session` do `@supabase/supabase-js`). Estes tipos são do **domínio da aplicação**, independentes do provider.

**Ação adicional**: Atualizar `src/core/types/models.ts` para importar `AuthUser` de `auth.types.ts` em vez de redefinir.

**Critério de aceite**: Nenhum tipo de auth depende de `@supabase/supabase-js`.

### Task 1.4 — Criar helper para converter erros do Supabase

**Criar arquivo**: `src/core/errors/SupabaseErrorMapper.ts`

```typescript
import { PostgrestError } from '@supabase/supabase-js'
import { AppError } from './AppError'
import { NotFoundError } from './NotFoundError'
import { NetworkError } from './NetworkError'
import { AuthenticationError } from './AuthenticationError'

export class SupabaseErrorMapper {
    static toAppError(error: unknown, entity?: string): AppError {
        if (error instanceof AppError) return error

        if (isPostgrestError(error)) {
            if (error.code === 'PGRST116') return new NotFoundError(entity ?? 'Registro')
            if (error.code === '42501') return new AuthenticationError('Sem permissão para esta operação')
            return new DatabaseError(error.message, error.code)
        }

        if (error instanceof Error && error.message.includes('fetch')) {
            return new NetworkError()
        }

        return AppError.fromUnknown(error)
    }
}
```

**Por que**: Centraliza a conversão de erros do Supabase em erros do domínio. Cada repository usará este mapper em vez de fazer `if (error) throw error`.

**Critério de aceite**: Mapper consegue classificar os erros mais comuns do Supabase.

### Task 1.5 — Configurar path aliases no `tsconfig.app.json`

**Arquivo**: `tsconfig.app.json`

**Adicionar** em `compilerOptions`:
```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@core/*": ["src/core/*"],
            "@features/*": ["src/features/*"],
            "@infrastructure/*": ["src/infrastructure/*"],
            "@shared/*": ["src/shared/*"],
            "@app/*": ["src/app/*"],
            "@pages/*": ["src/pages/*"],
            "@layouts/*": ["src/layouts/*"]
        }
    }
}
```

**Arquivo**: `vite.config.ts`

**Adicionar** resolve aliases para espelhar os paths do TypeScript:
```typescript
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@core': path.resolve(__dirname, 'src/core'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@app': path.resolve(__dirname, 'src/app'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
        },
    },
})
```

**Por que**: Elimina imports relativos profundos como `../../../core/config/supabase`. Melhora legibilidade e facilita refatorações de diretório.

**Critério de aceite**: Imports com `@core/`, `@features/` etc. resolvem corretamente. Build sem erros.

### Task 1.6 — Gerar `database.types.ts` automaticamente

**Ação 1**: Adicionar script ao `package.json`:
```json
{
    "scripts": {
        "db:types": "npx supabase gen types typescript --project-id uhlxfptxkvzonuuzrlpy > src/core/types/database.types.ts"
    }
}
```

**Ação 2**: Executar `npm run db:types` para gerar os tipos reais.

**Ação 3**: Validar que os tipos gerados são compatíveis com o código existente. Ajustar `models.ts` se necessário.

**Por que**: O arquivo atual é manual e pode divergir do schema real. A geração automática garante sincronia.

**Critério de aceite**: Tipos gerados automaticamente, build compila sem erros.

---

## Fase 2 — Contratos (Interfaces)

> **Prioridade**: Alta  
> **Objetivo**: Definir todas as interfaces que regem as camadas de Repository e Auth  
> **Tempo estimado**: 2-3 horas  
> **Dependência**: Fase 1 (precisa do `Result<T,E>` e tipos de auth)

### Task 2.1 — Interface `IAuthService`

**Criar arquivo**: `src/core/interfaces/auth/IAuthService.ts`

```typescript
import type { Result } from '@core/types/Result'
import type {
    AuthUser, AuthSession, AuthResult,
    SignUpData, SignInData,
    AuthStateCallback, AuthSubscription
} from '@core/types/auth.types'

export interface IAuthService {
    signUp(data: SignUpData): Promise<Result<AuthResult>>
    signIn(data: SignInData): Promise<Result<AuthResult>>
    signOut(): Promise<Result<void>>
    resetPassword(email: string): Promise<Result<void>>
    getSession(): Promise<AuthSession | null>
    getCurrentUser(): Promise<AuthUser | null>
    onAuthStateChange(callback: AuthStateCallback): AuthSubscription
}
```

**Contrato definido por esta interface**:
- Todos os métodos que podem falhar retornam `Result`
- `getSession()` e `getCurrentUser()` retornam `null` quando não há sessão (não falha)
- `onAuthStateChange` retorna um objeto com `unsubscribe` (não depende do tipo do Supabase)

### Task 2.2 — Interface `IAccountRepository`

**Criar arquivo**: `src/core/interfaces/repositories/IAccountRepository.ts`

```typescript
import type { Account } from '@core/types/models'
import type { InsertTables, UpdateTables } from '@core/types/database.types'

export interface IAccountRepository {
    findByUser(userId: string): Promise<Account[]>
    findById(id: string): Promise<Account | null>
    create(account: InsertTables<'accounts'>): Promise<Account>
    update(id: string, updates: UpdateTables<'accounts'>): Promise<Account>
    delete(id: string): Promise<void>
    getTotalBalance(userId: string): Promise<number>
}
```

**Mudança em relação ao atual**: `findById` retorna `Account | null` em vez de lançar exceção quando não encontra.

### Task 2.3 — Interface `ITransactionRepository`

**Criar arquivo**: `src/core/interfaces/repositories/ITransactionRepository.ts`

```typescript
import type { Transaction } from '@core/types/models'
import type { InsertTables, UpdateTables } from '@core/types/database.types'

export interface ITransactionRepository {
    findByUser(userId: string, limit?: number): Promise<Transaction[]>
    findByDateRange(userId: string, startDate: string, endDate: string): Promise<Transaction[]>
    findByCategory(userId: string, categoryId: string): Promise<Transaction[]>
    create(transaction: InsertTables<'transactions'>): Promise<Transaction>
    update(id: string, updates: UpdateTables<'transactions'>): Promise<Transaction>
    delete(id: string): Promise<void>
}
```

### Task 2.4 — Interface `ICategoryRepository`

**Criar arquivo**: `src/core/interfaces/repositories/ICategoryRepository.ts`

```typescript
import type { Category } from '@core/types/models'

export interface ICategoryRepository {
    findAll(): Promise<Category[]>
    findByType(type: 'income' | 'expense'): Promise<Category[]>
}
```

### Task 2.5 — Interface `ICardRepository`

**Criar arquivo**: `src/core/interfaces/repositories/ICardRepository.ts`

```typescript
import type { Card } from '@core/types/models'
import type { InsertTables } from '@core/types/database.types'

export interface ICardRepository {
    findByUser(userId: string): Promise<Card[]>
    create(card: InsertTables<'cards'>): Promise<Card>
    delete(id: string): Promise<void>
}
```

### Task 2.6 — Interface `IInvoiceRepository`

**Criar arquivo**: `src/core/interfaces/repositories/IInvoiceRepository.ts`

```typescript
import type { Invoice } from '@core/types/models'

export interface IInvoiceRepository {
    findByUser(userId: string): Promise<Invoice[]>
    findByCard(cardId: string): Promise<Invoice[]>
    updateStatus(id: string, status: string): Promise<Invoice>
}
```

### Task 2.7 — Interface `IProfileRepository`

**Criar arquivo**: `src/core/interfaces/repositories/IProfileRepository.ts`

```typescript
import type { Profile } from '@core/types/models'
import type { UpdateTables } from '@core/types/database.types'

export interface IProfileRepository {
    findById(userId: string): Promise<Profile | null>
    update(userId: string, updates: UpdateTables<'profiles'>): Promise<Profile>
    uploadAvatar(userId: string, file: File): Promise<string>
}
```

### Task 2.8 — Interface `IAlertRepository`

**Criar arquivo**: `src/core/interfaces/repositories/IAlertRepository.ts`

```typescript
import type { Alert } from '@core/types/models'

export interface IAlertRepository {
    findByUser(userId: string): Promise<Alert[]>
    getUnreadCount(userId: string): Promise<number>
    markAsRead(id: string): Promise<void>
    markAllAsRead(userId: string): Promise<void>
}
```

### Task 2.9 — Barrel export das interfaces

**Criar arquivo**: `src/core/interfaces/index.ts`

```typescript
export type { IAuthService } from './auth/IAuthService'
export type { IAccountRepository } from './repositories/IAccountRepository'
export type { ITransactionRepository } from './repositories/ITransactionRepository'
export type { ICategoryRepository } from './repositories/ICategoryRepository'
export type { ICardRepository } from './repositories/ICardRepository'
export type { IInvoiceRepository } from './repositories/IInvoiceRepository'
export type { IProfileRepository } from './repositories/IProfileRepository'
export type { IAlertRepository } from './repositories/IAlertRepository'
```

**Critério de aceite para toda a Fase 2**: Todas as interfaces definidas, compilação sem erros, nenhuma interface importa nada de `@supabase/supabase-js`.

---

## Fase 3 — Infraestrutura (Implementações Concretas)

> **Prioridade**: Alta  
> **Objetivo**: Mover os repositories existentes para `infrastructure/supabase/` e implementar as interfaces  
> **Tempo estimado**: 3-4 horas  
> **Dependência**: Fase 2  
> **Estratégia**: Para cada repository, criar o novo arquivo, adaptar, re-exportar do local antigo para não quebrar imports

### Task 3.1 — Criar `SupabaseAccountRepository`

**Criar arquivo**: `src/infrastructure/supabase/SupabaseAccountRepository.ts`

**Origem**: `src/features/accounts/repositories/AccountRepository.ts`

**Mudanças**:
1. Classe implementa `IAccountRepository`
2. Recebe `SupabaseClient<Database>` via constructor (em vez de importar singleton)
3. `findById` retorna `null` em vez de lançar exceção quando `.single()` falha com PGRST116
4. Tratamento de erros via `SupabaseErrorMapper`

**Estrutura**:
```typescript
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@core/types/database.types'
import type { IAccountRepository } from '@core/interfaces/repositories/IAccountRepository'
import { SupabaseErrorMapper } from '@core/errors/SupabaseErrorMapper'

export class SupabaseAccountRepository implements IAccountRepository {
    constructor(private readonly client: SupabaseClient<Database>) {}

    async findByUser(userId: string): Promise<Account[]> {
        const { data, error } = await this.client
            .from('accounts')
            .select('*')
            .eq('user_id', userId)
            .order('is_primary', { ascending: false })

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Account')
        return data
    }

    // ... demais métodos seguindo o mesmo padrão
}
```

**Compatibilidade**: Manter `src/features/accounts/repositories/AccountRepository.ts` temporariamente com re-export para não quebrar imports existentes nos hooks (será removido na Fase 5).

### Task 3.2 — Criar `SupabaseTransactionRepository`

**Criar arquivo**: `src/infrastructure/supabase/SupabaseTransactionRepository.ts`

**Origem**: `src/features/transactions/repositories/TransactionRepository.ts`

**Mudanças**: Mesmo padrão da Task 3.1 — implementa `ITransactionRepository`, recebe client por constructor, usa `SupabaseErrorMapper`.

### Task 3.3 — Criar `SupabaseCategoryRepository`

**Criar arquivo**: `src/infrastructure/supabase/SupabaseCategoryRepository.ts`

**Origem**: `src/features/transactions/repositories/CategoryRepository.ts`

**Mudanças**: Implementa `ICategoryRepository`, recebe client por constructor.

### Task 3.4 — Criar `SupabaseCardRepository`

**Criar arquivo**: `src/infrastructure/supabase/SupabaseCardRepository.ts`

**Origem**: `src/features/cards/repositories/CardRepository.ts`

### Task 3.5 — Criar `SupabaseInvoiceRepository`

**Criar arquivo**: `src/infrastructure/supabase/SupabaseInvoiceRepository.ts`

**Origem**: `src/features/invoices/repositories/InvoiceRepository.ts`

### Task 3.6 — Criar `SupabaseAlertRepository`

**Criar arquivo**: `src/infrastructure/supabase/SupabaseAlertRepository.ts`

**Origem**: `src/features/alerts/repositories/AlertRepository.ts`

### Task 3.7 — Criar `SupabaseProfileRepository`

**Criar arquivo**: `src/infrastructure/supabase/SupabaseProfileRepository.ts`

**Origem**: `src/features/profile/repositories/ProfileRepository.ts`

**Atenção especial**: Este repository usa `supabase.storage` para upload de avatar. O constructor precisa receber o client completo (que inclui `.storage`).

### Task 3.8 — Criar `SupabaseAuthService`

**Criar arquivo**: `src/infrastructure/supabase/SupabaseAuthService.ts`

**Origem**: `src/features/auth/services/AuthService.ts`

**Mudanças críticas**:
1. Implementa `IAuthService`
2. Recebe `SupabaseClient<Database>` via constructor
3. `toAuthUser()` converte `User` do Supabase para `AuthUser` do domínio internamente
4. Todos os métodos retornam `Result<T>` em vez de lançar exceções
5. `onAuthStateChange` mapeia os eventos do Supabase para o enum `AuthEvent` do domínio
6. `getSession` retorna `AuthSession` do domínio (não `Session` do Supabase)

**Mapeamento de eventos**:
```typescript
private mapAuthEvent(event: string): AuthEvent {
    const eventMap: Record<string, AuthEvent> = {
        'SIGNED_IN': 'SIGNED_IN',
        'SIGNED_OUT': 'SIGNED_OUT',
        'TOKEN_REFRESHED': 'TOKEN_REFRESHED',
        'PASSWORD_RECOVERY': 'PASSWORD_RECOVERY',
    }
    return eventMap[event] ?? 'SIGNED_IN'
}
```

### Task 3.9 — Barrel export da infraestrutura

**Criar arquivo**: `src/infrastructure/supabase/index.ts`

Exporta todas as classes `Supabase*Repository` e `SupabaseAuthService`.

**Critério de aceite para toda a Fase 3**: Todos os 8 arquivos criados em `infrastructure/supabase/`, cada um implementando sua interface. Os arquivos originais em `features/*/repositories/` ainda existem como re-exports temporários. Build compila sem erros.

---

## Fase 4 — Container de Injeção de Dependência

> **Prioridade**: Alta  
> **Objetivo**: Centralizar a criação de todas as instâncias em um container DI  
> **Tempo estimado**: 2-3 horas  
> **Dependência**: Fase 3

### Task 4.1 — Criar o Container DI

**Criar arquivo**: `src/core/di/Container.ts`

```typescript
type Factory<T> = () => T

export class Container {
    private factories = new Map<string, Factory<unknown>>()
    private instances = new Map<string, unknown>()

    register<T>(key: string, factory: Factory<T>): void {
        this.factories.set(key, factory)
    }

    resolve<T>(key: string): T {
        if (this.instances.has(key)) {
            return this.instances.get(key) as T
        }

        const factory = this.factories.get(key)
        if (!factory) {
            throw new Error(`Dependência não registrada: ${key}`)
        }

        const instance = factory() as T
        this.instances.set(key, instance) // Singleton por padrão
        return instance
    }

    reset(): void {
        this.instances.clear()
    }
}

export const container = new Container()
```

**Por que um container próprio em vez de tsyringe/inversify**: O projeto é frontend React — as bibliotecas de DI tradicionais são otimizadas para Node.js e adicionam complexidade desnecessária (decorators, reflect-metadata). Um container leve de ~30 linhas é suficiente.

### Task 4.2 — Criar o Bootstrap (registro de dependências)

**Criar arquivo**: `src/core/di/bootstrap.ts`

```typescript
import { container } from './Container'
import { supabase } from '@core/config/supabase'

// Infrastructure
import { SupabaseAuthService } from '@infrastructure/supabase/SupabaseAuthService'
import { SupabaseAccountRepository } from '@infrastructure/supabase/SupabaseAccountRepository'
import { SupabaseTransactionRepository } from '@infrastructure/supabase/SupabaseTransactionRepository'
import { SupabaseCategoryRepository } from '@infrastructure/supabase/SupabaseCategoryRepository'
import { SupabaseCardRepository } from '@infrastructure/supabase/SupabaseCardRepository'
import { SupabaseInvoiceRepository } from '@infrastructure/supabase/SupabaseInvoiceRepository'
import { SupabaseAlertRepository } from '@infrastructure/supabase/SupabaseAlertRepository'
import { SupabaseProfileRepository } from '@infrastructure/supabase/SupabaseProfileRepository'

// Services
import { AccountService } from '@features/accounts/services/AccountService'
import { TransactionService } from '@features/transactions/services/TransactionService'
// ... demais services (criados na Fase 5)

export const DI_KEYS = {
    AUTH_SERVICE: 'IAuthService',
    ACCOUNT_REPO: 'IAccountRepository',
    TRANSACTION_REPO: 'ITransactionRepository',
    CATEGORY_REPO: 'ICategoryRepository',
    CARD_REPO: 'ICardRepository',
    INVOICE_REPO: 'IInvoiceRepository',
    ALERT_REPO: 'IAlertRepository',
    PROFILE_REPO: 'IProfileRepository',
    ACCOUNT_SERVICE: 'AccountService',
    TRANSACTION_SERVICE: 'TransactionService',
    // ... demais services
} as const

export function bootstrap(): void {
    // Repositories (todos recebem o client Supabase)
    container.register(DI_KEYS.AUTH_SERVICE, () => new SupabaseAuthService(supabase))
    container.register(DI_KEYS.ACCOUNT_REPO, () => new SupabaseAccountRepository(supabase))
    container.register(DI_KEYS.TRANSACTION_REPO, () => new SupabaseTransactionRepository(supabase))
    container.register(DI_KEYS.CATEGORY_REPO, () => new SupabaseCategoryRepository(supabase))
    container.register(DI_KEYS.CARD_REPO, () => new SupabaseCardRepository(supabase))
    container.register(DI_KEYS.INVOICE_REPO, () => new SupabaseInvoiceRepository(supabase))
    container.register(DI_KEYS.ALERT_REPO, () => new SupabaseAlertRepository(supabase))
    container.register(DI_KEYS.PROFILE_REPO, () => new SupabaseProfileRepository(supabase))

    // Services (recebem interfaces via container)
    container.register(DI_KEYS.ACCOUNT_SERVICE,
        () => new AccountService(container.resolve(DI_KEYS.ACCOUNT_REPO)))
    container.register(DI_KEYS.TRANSACTION_SERVICE,
        () => new TransactionService(container.resolve(DI_KEYS.TRANSACTION_REPO)))
}
```

**Ponto-chave**: Este é o **único arquivo** que sabe quais implementações concretas estão sendo usadas. Para trocar o Supabase por outro provider, bastaria alterar este arquivo.

### Task 4.3 — Criar DIProvider para React

**Criar arquivo**: `src/app/providers/DIProvider.tsx`

```typescript
import { createContext, useContext, type ReactNode } from 'react'
import { container, Container } from '@core/di/Container'
import { bootstrap } from '@core/di/bootstrap'
import { DI_KEYS } from '@core/di/bootstrap'

// Inicializa o container uma vez
bootstrap()

const DIContext = createContext<Container>(container)

export function DIProvider({ children }: { children: ReactNode }) {
    return (
        <DIContext.Provider value={container}>
            {children}
        </DIContext.Provider>
    )
}

export function useContainer(): Container {
    return useContext(DIContext)
}

// Hooks de conveniência com tipagem forte
export function useResolve<T>(key: string): T {
    const c = useContainer()
    return c.resolve<T>(key)
}
```

### Task 4.4 — Integrar DIProvider na árvore de componentes

**Arquivo a modificar**: `src/App.tsx`

**Estado atual**:
```typescript
<QueryProvider>
    <AuthProvider>
        <BrowserRouter>
```

**Estado final**:
```typescript
<DIProvider>
    <QueryProvider>
        <AuthProvider>
            <BrowserRouter>
```

**Ordem dos providers**:
1. `DIProvider` (mais externo — precisa existir antes de qualquer provider que use DI)
2. `QueryProvider` (React Query)
3. `AuthProvider` (agora recebe `IAuthService` do container)
4. `BrowserRouter` (rotas)

**Critério de aceite para toda a Fase 4**: Container funcional, bootstrap registra todas as dependências, `DIProvider` na árvore de componentes, aplicação funciona normalmente.

---

## Fase 5 — Service Layer Completa

> **Prioridade**: Média-Alta  
> **Objetivo**: Criar Services para todos os módulos que não têm e refatorar os existentes  
> **Tempo estimado**: 3-4 horas  
> **Dependência**: Fase 4

### Task 5.1 — Refatorar `AccountService`

**Arquivo**: `src/features/accounts/services/AccountService.ts`

**Mudanças**:
1. Constructor recebe `IAccountRepository` (interface) em vez de `AccountRepository` (classe concreta)
2. Métodos retornam `Result<T>` em vez de lançar exceções
3. Remover singleton exportado (`export const accountService = ...`)

**Antes**:
```typescript
export class AccountService {
    private repository: AccountRepository
    constructor(repository: AccountRepository = accountRepository) {
```

**Depois**:
```typescript
export class AccountService {
    constructor(private readonly repository: IAccountRepository) {}
```

### Task 5.2 — Refatorar `TransactionService`

**Arquivo**: `src/features/transactions/services/TransactionService.ts`

**Mudanças**: Mesmo padrão da Task 5.1 — `ITransactionRepository`, retorno `Result<T>`.

### Task 5.3 — Criar `CardService`

**Criar arquivo**: `src/features/cards/services/CardService.ts`

```typescript
import type { ICardRepository } from '@core/interfaces'
import type { Card } from '@core/types/models'
import type { Result } from '@core/types/Result'

export class CardService {
    constructor(private readonly repository: ICardRepository) {}

    async getCards(userId: string): Promise<Result<Card[]>> { ... }
    async createCard(userId: string, data: CreateCardDTO): Promise<Result<Card>> { ... }
    async deleteCard(id: string): Promise<Result<void>> { ... }
}
```

### Task 5.4 — Criar `InvoiceService`

**Criar arquivo**: `src/features/invoices/services/InvoiceService.ts`

```typescript
export class InvoiceService {
    constructor(private readonly repository: IInvoiceRepository) {}

    async getInvoices(userId: string): Promise<Result<Invoice[]>> { ... }
    async getInvoicesByCard(cardId: string): Promise<Result<Invoice[]>> { ... }
    async markAsPaid(id: string): Promise<Result<Invoice>> { ... }
}
```

### Task 5.5 — Criar `AlertService`

**Criar arquivo**: `src/features/alerts/services/AlertService.ts`

```typescript
export class AlertService {
    constructor(private readonly repository: IAlertRepository) {}

    async getAlerts(userId: string): Promise<Result<Alert[]>> { ... }
    async getUnreadCount(userId: string): Promise<Result<number>> { ... }
    async markAsRead(id: string): Promise<Result<void>> { ... }
    async markAllAsRead(userId: string): Promise<Result<void>> { ... }
}
```

### Task 5.6 — Criar `ProfileService`

**Criar arquivo**: `src/features/profile/services/ProfileService.ts`

```typescript
export class ProfileService {
    constructor(private readonly repository: IProfileRepository) {}

    async getProfile(userId: string): Promise<Result<Profile>> { ... }
    async updateProfile(userId: string, updates: UpdateProfileDTO): Promise<Result<Profile>> { ... }
    async uploadAvatar(userId: string, file: File): Promise<Result<string>> { ... }
}
```

### Task 5.7 — Refatorar todos os Hooks para usar Services via DI

**Padrão de migração** (exemplo com `useCards.ts`):

**Antes** (acesso direto ao repository):
```typescript
import { cardRepository } from '../repositories/CardRepository'

export function useCards() {
    const { user } = useAuth()
    return useQuery({
        queryFn: () => cardRepository.findByUser(user!.id),
    })
}
```

**Depois** (acesso via Service do container):
```typescript
import { useResolve } from '@app/providers/DIProvider'
import { DI_KEYS } from '@core/di/bootstrap'
import type { CardService } from '../services/CardService'

export function useCards() {
    const { user } = useAuth()
    const cardService = useResolve<CardService>(DI_KEYS.CARD_SERVICE)

    return useQuery({
        queryFn: () => cardService.getCards(user!.id),
    })
}
```

**Hooks a migrar**:
- `useAccounts.ts` → usa `AccountService`
- `useTransactions.ts` → usa `TransactionService`
- `useCategories.ts` → usa `CategoryService` (ou mantém via `TransactionService`)
- `useCards.ts` → usa `CardService`
- `useInvoices.ts` → usa `InvoiceService`
- `useAlerts.ts` → usa `AlertService`
- `useProfile.ts` → usa `ProfileService`

**Ação final**: Remover os arquivos originais de repository em `features/*/repositories/` e remover todos os singletons exportados.

**Critério de aceite para toda a Fase 5**: Todos os 7 módulos possuem Service. Nenhum hook importa repository diretamente. Nenhum singleton exportado com `export const xxxService = new ...`. Aplicação funciona normalmente.

---

## Fase 6 — Validação com Zod

> **Prioridade**: Média  
> **Objetivo**: Validar todos os dados de entrada na camada de Service  
> **Tempo estimado**: 3-4 horas  
> **Dependência**: Fase 5

### Task 6.1 — Instalar Zod

```bash
npm install zod
```

### Task 6.2 — Schema de Transaction

**Criar arquivo**: `src/core/validation/transactionSchema.ts`

```typescript
import { z } from 'zod'

export const createTransactionSchema = z.object({
    amount: z.number()
        .positive('O valor deve ser positivo')
        .max(999_999_999.99, 'Valor excede o limite permitido'),
    description: z.string()
        .min(1, 'Descrição é obrigatória')
        .max(255, 'Descrição deve ter no máximo 255 caracteres')
        .trim(),
    categoryId: z.string().uuid('Categoria inválida'),
    accountId: z.string().uuid('Conta inválida'),
    date: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        'Data inválida'
    ),
})

export type CreateTransactionDTO = z.infer<typeof createTransactionSchema>
```

### Task 6.3 — Schema de Account

**Criar arquivo**: `src/core/validation/accountSchema.ts`

```typescript
import { z } from 'zod'
import { AccountType } from '@core/constants'

export const createAccountSchema = z.object({
    bankName: z.string()
        .min(2, 'Nome do banco é obrigatório')
        .max(100, 'Nome do banco muito longo'),
    accountType: z.enum(
        [AccountType.CHECKING, AccountType.SAVINGS, AccountType.INVESTMENT],
        { errorMap: () => ({ message: 'Tipo de conta inválido' }) }
    ),
    balance: z.number().default(0),
    color: z.string().optional(),
    isPrimary: z.boolean().default(false),
})

export type CreateAccountDTO = z.infer<typeof createAccountSchema>
```

### Task 6.4 — Schema de Card

**Criar arquivo**: `src/core/validation/cardSchema.ts`

```typescript
import { z } from 'zod'

export const createCardSchema = z.object({
    lastFour: z.string()
        .length(4, 'Informe os 4 últimos dígitos')
        .regex(/^\d{4}$/, 'Apenas números'),
    brand: z.string().min(1, 'Bandeira é obrigatória'),
    expiry: z.string()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato inválido (MM/AA)'),
    cardName: z.string().min(1, 'Nome do cartão é obrigatório').max(50),
    creditLimit: z.number().positive('Limite deve ser positivo'),
})

export type CreateCardDTO = z.infer<typeof createCardSchema>
```

### Task 6.5 — Schema de Profile

**Criar arquivo**: `src/core/validation/profileSchema.ts`

```typescript
import { z } from 'zod'

export const updateProfileSchema = z.object({
    full_name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100).optional(),
    phone: z.string().max(20).optional().nullable(),
    username: z.string()
        .min(3, 'Username deve ter pelo menos 3 caracteres')
        .max(30)
        .regex(/^[a-zA-Z0-9_]+$/, 'Apenas letras, números e underscore')
        .optional()
        .nullable(),
    website: z.string().url('URL inválida').optional().nullable(),
})

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>
```

### Task 6.6 — Schema de Auth

**Criar arquivo**: `src/core/validation/authSchema.ts`

```typescript
import { z } from 'zod'

export const signInSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const signUpSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres')
        .max(72, 'Senha muito longa'),
    fullName: z.string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(100, 'Nome muito longo'),
})

export const resetPasswordSchema = z.object({
    email: z.string().email('Email inválido'),
})
```

### Task 6.7 — Helper para converter erros do Zod em `ValidationError`

**Criar arquivo**: `src/core/validation/validate.ts`

```typescript
import { z } from 'zod'
import { ValidationError } from '@core/errors'
import { Result } from '@core/types/Result'

export function validate<T>(schema: z.ZodSchema<T>, data: unknown): Result<T, ValidationError> {
    const result = schema.safeParse(data)

    if (result.success) {
        return Result.ok(result.data)
    }

    const fields: Record<string, string[]> = {}
    for (const issue of result.error.issues) {
        const key = issue.path.join('.')
        if (!fields[key]) fields[key] = []
        fields[key].push(issue.message)
    }

    return Result.fail(new ValidationError('Dados inválidos', fields))
}
```

### Task 6.8 — Aplicar validação nos Services

**Exemplo de aplicação no `TransactionService.createIncome()`**:

```typescript
async createIncome(userId: string, data: unknown): Promise<Result<Transaction>> {
    const validation = validate(createTransactionSchema, data)
    if (!validation.success) return validation

    try {
        const transaction = await this.repository.create({
            user_id: userId,
            type: 'income',
            amount: validation.data.amount,
            description: validation.data.description,
            category_id: validation.data.categoryId,
            account_id: validation.data.accountId,
            date: validation.data.date,
        })
        return Result.ok(transaction)
    } catch (err) {
        return Result.fail(AppError.fromUnknown(err))
    }
}
```

**Services a atualizar**: Todos os 7 services criados/refatorados na Fase 5.

**Critério de aceite para toda a Fase 6**: Zod instalado, schemas criados para todas as entidades, validação aplicada em todos os métodos de criação/atualização dos Services, erros de validação retornam `ValidationError` com detalhes por campo.

---

## Fase 7 — Backend Supabase

> **Prioridade**: Média  
> **Objetivo**: Otimizar o banco de dados com functions, triggers e indexes  
> **Tempo estimado**: 3-4 horas  
> **Dependência**: Apenas Fase 1 (pode ser feito em paralelo com Fases 2-6)

### Task 7.1 — Criar migration para Database Functions

**Criar arquivo**: `supabase/migrations/002_database_functions.sql`

**Conteúdo**:
```sql
-- Função: Saldo total do usuário
CREATE OR REPLACE FUNCTION get_total_balance(p_user_id UUID)
RETURNS NUMERIC AS $$
    SELECT COALESCE(SUM(balance), 0)
    FROM public.accounts
    WHERE user_id = p_user_id;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Função: Resumo mensal
CREATE OR REPLACE FUNCTION get_monthly_summary(
    p_user_id UUID,
    p_start_date DATE,
    p_end_date DATE
)
RETURNS TABLE (
    total_income NUMERIC,
    total_expenses NUMERIC,
    balance NUMERIC
) AS $$
    SELECT
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expenses,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) AS balance
    FROM public.transactions
    WHERE user_id = p_user_id
      AND date >= p_start_date
      AND date <= p_end_date;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Função: Despesas agrupadas por categoria
CREATE OR REPLACE FUNCTION get_expenses_by_category(
    p_user_id UUID,
    p_start_date DATE,
    p_end_date DATE
)
RETURNS TABLE (
    category_name TEXT,
    category_color TEXT,
    total NUMERIC,
    percentage NUMERIC
) AS $$
    WITH totals AS (
        SELECT COALESCE(SUM(amount), 0) AS grand_total
        FROM public.transactions
        WHERE user_id = p_user_id
          AND type = 'expense'
          AND date >= p_start_date
          AND date <= p_end_date
    )
    SELECT
        COALESCE(c.name, 'Sem categoria') AS category_name,
        c.color AS category_color,
        COALESCE(SUM(t.amount), 0) AS total,
        CASE WHEN tt.grand_total > 0
             THEN ROUND((SUM(t.amount) / tt.grand_total) * 100, 2)
             ELSE 0
        END AS percentage
    FROM public.transactions t
    LEFT JOIN public.categories c ON t.category_id = c.id
    CROSS JOIN totals tt
    WHERE t.user_id = p_user_id
      AND t.type = 'expense'
      AND t.date >= p_start_date
      AND t.date <= p_end_date
    GROUP BY c.name, c.color, tt.grand_total
    ORDER BY total DESC;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;
```

**Impacto no frontend**: Após criar estas functions, o `TransactionService.getMonthlySummary()` pode usar `supabase.rpc('get_monthly_summary', {...})` em vez de buscar todas as transações e calcular no cliente.

### Task 7.2 — Criar migration para Trigger de saldo

**Criar arquivo**: `supabase/migrations/003_balance_trigger.sql`

```sql
-- Trigger: Atualiza saldo da conta quando transação é criada/deletada
CREATE OR REPLACE FUNCTION update_account_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.accounts
        SET balance = balance +
            CASE WHEN NEW.type = 'income' THEN NEW.amount ELSE -NEW.amount END
        WHERE id = NEW.account_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.accounts
        SET balance = balance -
            CASE WHEN OLD.type = 'income' THEN OLD.amount ELSE -OLD.amount END
        WHERE id = OLD.account_id;
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Reverte o valor antigo
        UPDATE public.accounts
        SET balance = balance -
            CASE WHEN OLD.type = 'income' THEN OLD.amount ELSE -OLD.amount END
        WHERE id = OLD.account_id;
        -- Aplica o novo valor
        UPDATE public.accounts
        SET balance = balance +
            CASE WHEN NEW.type = 'income' THEN NEW.amount ELSE -NEW.amount END
        WHERE id = NEW.account_id;
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_transaction_change
    AFTER INSERT OR UPDATE OR DELETE ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_account_balance();
```

### Task 7.3 — Criar migration para Indexes adicionais

**Criar arquivo**: `supabase/migrations/004_additional_indexes.sql`

```sql
-- Index composto para queries mensais (muito frequentes no dashboard)
CREATE INDEX IF NOT EXISTS idx_transactions_user_date_type
    ON public.transactions(user_id, date, type);

-- Index para categories por type
CREATE INDEX IF NOT EXISTS idx_categories_type
    ON public.categories(type);

-- Index parcial para invoices abertas/vencidas
CREATE INDEX IF NOT EXISTS idx_invoices_open
    ON public.invoices(user_id, due_date)
    WHERE status IN ('open', 'overdue');

-- Index parcial para alertas não lidos
-- (já existe idx_alerts_unread, mas podemos verificar)
```

### Task 7.4 — Criar migration para RLS refinado

**Criar arquivo**: `supabase/migrations/005_refined_rls.sql`

```sql
-- Transactions INSERT: Verificar que account_id pertence ao user_id
DROP POLICY IF EXISTS "Users can insert own transactions" ON public.transactions;
CREATE POLICY "Users can insert own transactions"
    ON public.transactions FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM public.accounts
            WHERE accounts.id = account_id
              AND accounts.user_id = auth.uid()
        )
    );

-- Invoices INSERT: Verificar que card_id pertence ao user_id
CREATE POLICY "Users can insert own invoices"
    ON public.invoices FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM public.cards
            WHERE cards.id = card_id
              AND cards.user_id = auth.uid()
        )
    );
```

### Task 7.5 — Atualizar repositories para usar RPC

**Após** as Database Functions estarem criadas (Task 7.1), atualizar os repositories da infraestrutura:

**Arquivo**: `src/infrastructure/supabase/SupabaseAccountRepository.ts`

Método `getTotalBalance`:
```typescript
async getTotalBalance(userId: string): Promise<number> {
    const { data, error } = await this.client.rpc('get_total_balance', {
        p_user_id: userId
    })
    if (error) throw SupabaseErrorMapper.toAppError(error, 'Account')
    return data ?? 0
}
```

**Arquivo**: `src/infrastructure/supabase/SupabaseTransactionRepository.ts`

Novo método para summary via RPC (usado pelo `TransactionService`).

### Task 7.6 — Adicionar script de tipos ao package.json

**Arquivo**: `package.json`

Adicionar no bloco `scripts`:
```json
"db:types": "npx supabase gen types typescript --project-id uhlxfptxkvzonuuzrlpy > src/core/types/database.types.ts",
"db:push": "npx supabase db push",
"db:migrate": "npx supabase migration new"
```

**Critério de aceite para toda a Fase 7**: Migrations criadas e aplicáveis via `supabase db push`. Repositories atualizados para usar RPC onde aplicável. Scripts de DB no `package.json`.

---

## Fase 8 — Qualidade e Testes

> **Prioridade**: Contínua  
> **Objetivo**: Garantir que a arquitetura é testável e configurar CI  
> **Tempo estimado**: 4-6 horas  
> **Dependência**: Fase 6

### Task 8.1 — Instalar e configurar Vitest

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Criar arquivo**: `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.ts',
    },
    resolve: {
        alias: {
            '@core': path.resolve(__dirname, 'src/core'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@app': path.resolve(__dirname, 'src/app'),
        },
    },
})
```

### Task 8.2 — Criar implementações InMemory para testes

**Criar diretório**: `src/test/mocks/`

**Criar arquivo**: `src/test/mocks/InMemoryAccountRepository.ts`

```typescript
import type { IAccountRepository } from '@core/interfaces'
import type { Account } from '@core/types/models'

export class InMemoryAccountRepository implements IAccountRepository {
    private accounts: Account[] = []

    async findByUser(userId: string): Promise<Account[]> {
        return this.accounts.filter(a => a.user_id === userId)
    }

    async findById(id: string): Promise<Account | null> {
        return this.accounts.find(a => a.id === id) ?? null
    }

    async create(account: any): Promise<Account> {
        const newAccount = { id: crypto.randomUUID(), ...account, created_at: new Date().toISOString() }
        this.accounts.push(newAccount)
        return newAccount
    }

    // ... demais métodos

    // Helper para testes
    seed(accounts: Account[]): void {
        this.accounts = [...accounts]
    }
}
```

**Criar InMemory para cada repository**: `InMemoryTransactionRepository`, `InMemoryCardRepository`, etc.

**Criar**: `src/test/mocks/FakeAuthService.ts`

```typescript
import type { IAuthService } from '@core/interfaces'

export class FakeAuthService implements IAuthService {
    private currentUser: AuthUser | null = null

    async signIn(data: SignInData): Promise<Result<AuthResult>> {
        this.currentUser = { id: '1', email: data.email, fullName: 'Test', avatarUrl: null }
        return Result.ok({ user: this.currentUser, session: { ... } })
    }
    // ... demais métodos
}
```

### Task 8.3 — Escrever testes dos Services

**Exemplo**: `src/features/accounts/services/__tests__/AccountService.test.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { AccountService } from '../AccountService'
import { InMemoryAccountRepository } from '@test/mocks/InMemoryAccountRepository'

describe('AccountService', () => {
    let service: AccountService
    let repository: InMemoryAccountRepository

    beforeEach(() => {
        repository = new InMemoryAccountRepository()
        service = new AccountService(repository)
    })

    it('deve criar uma conta com dados válidos', async () => {
        const result = await service.createAccount('user-1', {
            bankName: 'Nubank',
            accountType: 'corrente',
        })
        expect(result.success).toBe(true)
    })

    it('deve rejeitar conta com nome de banco vazio', async () => {
        const result = await service.createAccount('user-1', {
            bankName: '',
            accountType: 'corrente',
        })
        expect(result.success).toBe(false)
    })
})
```

### Task 8.4 — Adicionar scripts de teste ao `package.json`

```json
{
    "scripts": {
        "test": "vitest run",
        "test:watch": "vitest",
        "test:coverage": "vitest run --coverage"
    }
}
```

### Task 8.5 — Criar workflow de CI

**Criar arquivo**: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, feature/*]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

**Critério de aceite para toda a Fase 8**: Vitest configurado, pelo menos 1 teste por Service, InMemory repositories funcionais, CI pipeline rodando no GitHub Actions.

---

## Organização dos Utilitários (Limpeza final)

Esta tarefa pode ser feita em qualquer momento após a Fase 1:

| De (atual)                    | Para (proposto)              |
|:------------------------------|:-----------------------------|
| `src/lib/utils.ts`           | `src/shared/utils/cn.ts`    |
| `src/components/ui/`         | `src/shared/components/ui/` |
| `src/components/UserMenu.tsx` | `src/shared/components/UserMenu.tsx` |

**Atualizar imports em**:
- `src/layouts/MainLayout.tsx` (importa `cn` de `../lib/utils`)
- Todos os componentes que importam de `../components/ui/`

---

## Diagrama de Dependência entre Fases

```
Fase 0 (Segurança)
    │
    ▼
Fase 1 (Core) ──────────────────────┐
    │                                │
    ▼                                ▼
Fase 2 (Interfaces)           Fase 7 (Backend DB)
    │                                │
    ▼                                │
Fase 3 (Infrastructure)             │
    │                                │
    ▼                                │
Fase 4 (Container DI)               │
    │                                │
    ▼                                │
Fase 5 (Services) ◄─────────────────┘
    │             (usa DB functions via RPC)
    ▼
Fase 6 (Validação)
    │
    ▼
Fase 8 (Testes + CI)
```

**Caminhos paralelos possíveis**:
- **Caminho A** (Frontend): Fase 0 → 1 → 2 → 3 → 4 → 5 → 6 → 8
- **Caminho B** (Backend): Fase 0 → 1 → 7
- Fase 7 converge com Fase 5 (repositories começam a usar RPC)

---

## Resumo de Arquivos

### Arquivos Novos (42)
| Fase | Quantidade | Local |
|:----:|:----------:|:------|
| 1    | 8          | `src/core/types/`, `src/core/errors/` |
| 2    | 10         | `src/core/interfaces/` |
| 3    | 9          | `src/infrastructure/supabase/` |
| 4    | 3          | `src/core/di/`, `src/app/providers/` |
| 5    | 4          | `src/features/*/services/` |
| 6    | 6          | `src/core/validation/` |
| 7    | 4          | `supabase/migrations/` |
| 8    | ~8         | `src/test/`, `.github/workflows/` |

### Arquivos Modificados (15)
| Arquivo | Fase | Mudança |
|:--------|:----:|:--------|
| `.gitignore` | 0 | Adicionar `.gemini/` |
| `.gemini/settings.json` | 0 | Remover token hardcoded |
| `tsconfig.app.json` | 1 | Path aliases |
| `vite.config.ts` | 1 | Resolve aliases |
| `package.json` | 1,6,7,8 | Scripts, dependências |
| `src/App.tsx` | 4 | Adicionar DIProvider |
| `src/features/accounts/services/AccountService.ts` | 5 | Interface + Result |
| `src/features/transactions/services/TransactionService.ts` | 5 | Interface + Result |
| `src/features/accounts/hooks/useAccounts.ts` | 5 | Usar DI |
| `src/features/transactions/hooks/useTransactions.ts` | 5 | Usar DI |
| `src/features/cards/hooks/useCards.ts` | 5 | Usar DI + Service |
| `src/features/invoices/hooks/useInvoices.ts` | 5 | Usar DI + Service |
| `src/features/alerts/hooks/useAlerts.ts` | 5 | Usar DI + Service |
| `src/features/profile/hooks/useProfile.ts` | 5 | Usar DI + Service |
| `src/features/auth/providers/AuthProvider.tsx` | 5 | Usar IAuthService via DI |

### Arquivos Removidos (após migração completa)
| Arquivo | Fase | Motivo |
|:--------|:----:|:-------|
| `src/features/accounts/repositories/AccountRepository.ts` | 5 | Substituído por `infrastructure/` |
| `src/features/transactions/repositories/TransactionRepository.ts` | 5 | Substituído |
| `src/features/transactions/repositories/CategoryRepository.ts` | 5 | Substituído |
| `src/features/cards/repositories/CardRepository.ts` | 5 | Substituído |
| `src/features/invoices/repositories/InvoiceRepository.ts` | 5 | Substituído |
| `src/features/alerts/repositories/AlertRepository.ts` | 5 | Substituído |
| `src/features/profile/repositories/ProfileRepository.ts` | 5 | Substituído |
| `src/features/auth/services/AuthService.ts` | 5 | Substituído |
| `src/lib/utils.ts` | Limpeza | Movido para `shared/utils/cn.ts` |

---

## Próximos Passos

Após concluir todas as 8 fases, a arquitetura estará pronta para evoluções futuras como:

- **Testes E2E** com Playwright
- **Storybook** para componentes UI
- **Edge Functions** para lógica server-side sensível
- **Real-time subscriptions** do Supabase para alertas ao vivo
- **i18n** (internacionalização) na camada de erros
- **Cache layer** entre Service e Repository (decorator pattern)
- **Logging/Observability** centralizado
