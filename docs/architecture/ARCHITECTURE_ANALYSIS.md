# Análise Arquitetural — Bandeira Finance App

> **Data**: 18/02/2026  
> **Escopo**: Backend (camada de dados, serviços, autenticação, design patterns)  
> **Objetivo**: Identificar melhorias arquiteturais com foco em boas práticas de OOP, desacoplamento e manutenibilidade  

---

## Sumário Executivo

O projeto já possui uma base sólida com separação por features, camada de repositories e services, e uso de React Query para gerenciamento de estado do servidor. No entanto, há **oportunidades críticas de melhoria** relacionadas a:

1. **Acoplamento direto** de todos os repositories com o Supabase SDK
2. **Ausência de interfaces/contratos** (impossibilita testes e substituição de providers)
3. **Inconsistência** na aplicação de camadas (alguns módulos têm Service, outros não)
4. **Falta de validação** de dados na camada de serviço
5. **Tratamento de erros** genérico e inconsistente
6. **Exposição de credenciais** no repositório (`.gemini/settings.json`)

---

## 1. Estado Atual da Arquitetura

### 1.1 Estrutura de Diretórios

```
src/
├── app/providers/           # QueryProvider (React Query)
├── components/ui/           # Componentes UI genéricos (Button, Card, Input)
├── core/
│   ├── config/supabase.ts   # Singleton do cliente Supabase
│   ├── constants/           # Query keys, enums
│   └── types/               # database.types.ts, models.ts
├── features/
│   ├── accounts/            # Repository + Service + Hook ✅
│   ├── alerts/              # Repository + Hook ⚠️ (sem Service)
│   ├── auth/                # Service + Provider + Guard ✅
│   ├── cards/               # Repository + Hook ⚠️ (sem Service)
│   ├── invoices/            # Repository + Hook ⚠️ (sem Service)
│   ├── profile/             # Repository + Hook ⚠️ (sem Service)
│   └── transactions/        # Repository + Service + Hook ✅
├── layouts/                 # MainLayout
├── lib/utils.ts             # Utilitário cn() (tailwind-merge)
├── pages/                   # Componentes de página
└── shared/utils/            # formatCurrency, formatDate, parseBRL
```

### 1.2 Fluxo de Dados Atual

```
Componente (Page) → Hook (React Query) → Service → Repository → Supabase SDK → Supabase DB
```

### 1.3 Módulos e suas Camadas

| Feature      | Repository | Service | Hook | Provider | Guard |
|:-------------|:----------:|:-------:|:----:|:--------:|:-----:|
| auth         | —          | ✅      | —    | ✅       | ✅    |
| accounts     | ✅         | ✅      | ✅   | —        | —     |
| transactions | ✅         | ✅      | ✅   | —        | —     |
| profile      | ✅         | —       | ✅   | —        | —     |
| cards        | ✅         | —       | ✅   | —        | —     |
| invoices     | ✅         | —       | ✅   | —        | —     |
| alerts       | ✅         | —       | ✅   | —        | —     |

---

## 2. Problemas Identificados

### 2.1 CRÍTICO — Acoplamento Direto com Supabase

**Onde**: Todos os Repositories (`AccountRepository.ts`, `TransactionRepository.ts`, etc.)

Cada repository importa a instância do Supabase diretamente:

```typescript
import { supabase } from '../../../core/config/supabase'
```

**Impacto**:
- Impossível testar unitariamente sem o Supabase real
- Impossível trocar o provider de dados (ex.: migrar para outro BaaS, API REST própria, ou usar mock em desenvolvimento)
- Viola o **Dependency Inversion Principle (DIP)** — módulos de alto nível dependem de detalhes concretos

### 2.2 CRÍTICO — Ausência Total de Interfaces/Contratos

Nenhum repository ou service implementa uma interface. Os services que recebem repository por constructor injection fazem isso com tipos concretos:

```typescript
// AccountService.ts — recebe tipo concreto, não uma interface
constructor(repository: AccountRepository = accountRepository) {
    this.repository = repository
}
```

**Impacto**:
- Sem contrato formal para o que cada camada expõe
- Impossível substituir implementações (mock, cache, diferentes providers)
- Dificulta documentação automática e compreensão dos contratos

### 2.3 ALTO — Inconsistência na Aplicação de Camadas

Apenas `accounts` e `transactions` possuem camada de Service. Os demais módulos (`profile`, `cards`, `invoices`, `alerts`) vão do Hook direto para o Repository:

```
Hook → Repository (sem Service)
```

Isso significa que **regras de negócio futuras** (validações, transformações, orquestração) não têm onde morar nesses módulos.

### 2.4 ALTO — Ausência de Validação de Dados

Nenhuma camada valida os dados de entrada antes de enviá-los ao Supabase. Exemplo no `TransactionService`:

```typescript
async createIncome(userId: string, data: { amount: number; ... }) {
    // Nenhuma validação: amount pode ser negativo, description pode estar vazia
    return this.repository.create({ ... })
}
```

**Impacto**:
- Dados inválidos podem chegar ao banco
- Erros do Supabase são genéricos e difíceis de mapear para o usuário
- Sem garantia de integridade no frontend

### 2.5 ALTO — Tratamento de Erros Genérico

Os repositories fazem apenas:

```typescript
if (error) throw error
```

Somente o `AuthService` tem tratamento de erros com mensagens amigáveis. Todos os outros módulos propagam o erro cru do Supabase.

**Impacto**:
- Mensagens de erro do PostgreSQL/Supabase expostas ao usuário
- Sem categorização de erros (rede, validação, autorização, não encontrado)
- Impossível tratar diferentes tipos de falha na UI

### 2.6 ALTO — Tipos do Database Manuais

O arquivo `database.types.ts` foi escrito manualmente:

```typescript
// Auto-generated types placeholder
// In production, run: supabase gen types typescript --local > src/core/types/database.types.ts
```

**Impacto**:
- Risco de divergência entre o schema real e os tipos TypeScript
- Manutenção manual propensa a erros
- Não reflete alterações feitas diretamente no Supabase

### 2.7 MÉDIO — Singletons Exportados no Nível do Módulo

Cada arquivo exporta um singleton no final:

```typescript
export const accountRepository = new AccountRepository()
export const accountService = new AccountService()
```

**Impacto**:
- Dificulta testes (não é possível substituir sem mocking de módulos)
- Sem controle do ciclo de vida das instâncias
- Impossível fazer lazy loading de dependências

### 2.8 MÉDIO — Ausência de Lógica no Banco de Dados

O cálculo de saldo total é feito no frontend:

```typescript
// AccountRepository.ts
async getTotalBalance(userId: string): Promise<number> {
    const accounts = await this.findByUser(userId)
    return accounts.reduce((sum, a) => sum + Number(a.balance), 0)
}
```

O cálculo mensal de receitas/despesas também é feito no frontend após buscar **todas** as transações do mês.

**Impacto**:
- Performance degradada com muitos registros
- Transferência desnecessária de dados pela rede
- O banco de dados é mais eficiente para agregações

### 2.9 MÉDIO — Sobreposição de Diretórios de Utilitários

Existem três locais para utilitários:
- `src/components/ui/` — componentes UI
- `src/shared/utils/` — formatCurrency, formatDate, parseBRL
- `src/lib/utils.ts` — cn() (tailwind-merge)

O `lib/` é uma convenção herdada do shadcn/ui mas está isolado do restante da estrutura.

### 2.10 SEGURANÇA — Token Exposto no Repositório

```json
// .gemini/settings.json
{
    "mcpServers": {
        "supabase": {
            "args": [
                "--access-token",
                "sbp_b32a4b2927522b7aeaf77495737acb7cde678391"
            ]
        }
    }
}
```

O `access-token` do Supabase MCP Server está hardcoded e commitado. Mesmo que `.gemini/` pareça configuração local, se este arquivo for commitado no Git, o token estará exposto.

---

## 3. Design Patterns Recomendados

### 3.1 Repository Pattern com Interface (Refino do Atual)

O padrão já está parcialmente implementado, mas sem contratos formais. A recomendação é introduzir **interfaces para cada repository**, permitindo múltiplas implementações:

```typescript
// core/interfaces/IAccountRepository.ts
interface IAccountRepository {
    findByUser(userId: string): Promise<Account[]>
    findById(id: string): Promise<Account>
    create(account: AccountInsert): Promise<Account>
    update(id: string, updates: AccountUpdate): Promise<Account>
    delete(id: string): Promise<void>
}

// features/accounts/repositories/SupabaseAccountRepository.ts
class SupabaseAccountRepository implements IAccountRepository { ... }

// Para testes
class InMemoryAccountRepository implements IAccountRepository { ... }
```

### 3.2 Adapter Pattern — Desacoplamento do Supabase

Criar uma **abstração do cliente de dados** que encapsula o Supabase, permitindo trocar o provider sem impactar os repositories:

```typescript
// core/interfaces/IDataClient.ts
interface IDataClient {
    from<T>(table: string): IQueryBuilder<T>
    auth: IAuthClient
    storage: IStorageClient
}

// core/adapters/SupabaseDataClient.ts
class SupabaseDataClient implements IDataClient {
    constructor(private client: SupabaseClient<Database>) {}
    from<T>(table: string): IQueryBuilder<T> { ... }
}
```

**Benefícios**:
- Trocar Supabase por outro BaaS (Firebase, Appwrite) exige mudar apenas o adapter
- Testes usam um `InMemoryDataClient`
- A autenticação pode ser desacoplada da mesma forma

### 3.3 Service Layer Pattern (Padronização)

Padronizar **todos os módulos** com uma camada de Service, mesmo que inicialmente apenas delegue ao repository. Isso garante que há sempre um lugar para:
- Validação de dados de entrada
- Regras de negócio
- Orquestração entre múltiplos repositories
- Transformação de dados

### 3.4 Dependency Injection (DI) via Container

Substituir os singletons exportados por um **container de injeção de dependência**. Para manter a simplicidade sem frameworks como tsyringe ou inversify, um **Service Locator leve** pode ser utilizado:

```typescript
// core/di/container.ts
class Container {
    private services = new Map<string, unknown>()

    register<T>(key: string, factory: () => T): void { ... }
    resolve<T>(key: string): T { ... }
}

export const container = new Container()

// core/di/bootstrap.ts
function bootstrap() {
    const client = new SupabaseDataClient(supabaseInstance)
    container.register('IAccountRepository', () => new SupabaseAccountRepository(client))
    container.register('AccountService', () => new AccountService(container.resolve('IAccountRepository')))
}
```

### 3.5 Result Pattern para Tratamento de Erros

Substituir `throw error` por um **Result type** que torna os erros parte explícita do tipo de retorno:

```typescript
// core/types/Result.ts
type Result<T, E = AppError> = 
    | { success: true; data: T }
    | { success: false; error: E }

// Uso no service
async getAccounts(userId: string): Promise<Result<Account[]>> {
    try {
        const accounts = await this.repository.findByUser(userId)
        return { success: true, data: accounts }
    } catch (err) {
        return { success: false, error: AppError.fromSupabase(err) }
    }
}
```

### 3.6 Factory Pattern para Entidades de Domínio

Criar **factories** para encapsular a criação de entidades com validação:

```typescript
class TransactionFactory {
    static createIncome(data: CreateIncomeDTO): Result<TransactionInsert> {
        if (data.amount <= 0) return Result.fail('Valor deve ser positivo')
        if (!data.description?.trim()) return Result.fail('Descrição obrigatória')
        // ... demais validações
        return Result.ok({ ... })
    }
}
```

---

## 4. Fluxo de Autenticação — Análise e Desacoplamento

### 4.1 Fluxo Atual

```
                     ┌──────────────┐
                     │  AuthProvider │ (React Context)
                     │              │
                     │ state: user, │
                     │ session,     │
                     │ isLoading    │
                     └──────┬───────┘
                            │ usa
                     ┌──────▼───────┐
                     │  AuthService │ (Classe concreta)
                     │              │
                     │ signIn()     │
                     │ signUp()     │
                     │ signOut()    │
                     │ getSession() │
                     └──────┬───────┘
                            │ importa diretamente
                     ┌──────▼───────┐
                     │   supabase   │ (Singleton do SDK)
                     │   .auth.*    │
                     └──────────────┘
```

**Problemas**:
- `AuthService` importa `supabase` diretamente — forte acoplamento
- `AuthProvider` instancia `authService` no nível do módulo
- `AuthService.toAuthUser()` é um método estático que conhece a estrutura do `User` do Supabase
- Não há interface `IAuthService` — impossível substituir por outro provider de autenticação

### 4.2 Proposta de Desacoplamento

```
                     ┌──────────────┐
                     │  AuthProvider │ (React Context)
                     └──────┬───────┘
                            │ depende de
                     ┌──────▼───────┐
                     │ IAuthService │ ← Interface
                     └──────┬───────┘
                            │ implementada por
              ┌─────────────┼─────────────┐
              │             │             │
   ┌──────────▼──┐  ┌──────▼──────┐  ┌───▼──────────┐
   │  Supabase   │  │  Firebase   │  │  Mock/Fake   │
   │ AuthService │  │ AuthService │  │ AuthService  │
   └─────────────┘  └─────────────┘  └──────────────┘
```

**Interface proposta**:

```typescript
// core/interfaces/IAuthService.ts
interface IAuthService {
    signUp(data: SignUpData): Promise<Result<AuthResult>>
    signIn(data: SignInData): Promise<Result<AuthResult>>
    signOut(): Promise<Result<void>>
    resetPassword(email: string): Promise<Result<void>>
    getSession(): Promise<AuthSession | null>
    getCurrentUser(): Promise<AuthUser | null>
    onAuthStateChange(callback: AuthStateCallback): AuthSubscription
}

// Tipos independentes de provider
interface AuthSession {
    accessToken: string
    refreshToken: string
    expiresAt: number
    user: AuthUser
}

interface AuthUser {
    id: string
    email: string
    fullName: string | null
    avatarUrl: string | null
}

type AuthStateCallback = (event: AuthEvent, session: AuthSession | null) => void
type AuthEvent = 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED' | 'PASSWORD_RECOVERY'
```

**Benefícios**:
- `AuthProvider` depende apenas de `IAuthService`
- Trocar Supabase Auth por outro provider exige apenas nova implementação da interface
- Testes usam `FakeAuthService` sem nenhuma dependência externa
- Os tipos `AuthUser`, `AuthSession` são do domínio da aplicação, não do Supabase

---

## 5. Proposta de Arquitetura Refatorada

### 5.1 Estrutura de Diretórios Proposta

```
src/
├── core/
│   ├── di/                          # Dependency Injection
│   │   ├── container.ts             # Container simples de DI
│   │   └── bootstrap.ts             # Registro de todas as dependências
│   ├── errors/                      # Tratamento de erros padronizado
│   │   ├── AppError.ts              # Classe base de erros da aplicação
│   │   ├── AuthError.ts             # Erros de autenticação
│   │   ├── ValidationError.ts       # Erros de validação
│   │   └── NotFoundError.ts         # Erros de recurso não encontrado
│   ├── interfaces/                  # Contratos (interfaces)
│   │   ├── auth/
│   │   │   └── IAuthService.ts
│   │   ├── repositories/
│   │   │   ├── IAccountRepository.ts
│   │   │   ├── ITransactionRepository.ts
│   │   │   ├── ICardRepository.ts
│   │   │   ├── IInvoiceRepository.ts
│   │   │   ├── IAlertRepository.ts
│   │   │   ├── IProfileRepository.ts
│   │   │   └── ICategoryRepository.ts
│   │   └── data/
│   │       └── IDataClient.ts       # Abstração do client de dados
│   ├── types/
│   │   ├── database.types.ts        # Auto-gerado pelo Supabase CLI
│   │   ├── models.ts                # Modelos de domínio
│   │   └── Result.ts                # Result<T, E> type
│   ├── config/
│   │   └── supabase.ts              # Singleton do Supabase (infraestrutura)
│   ├── constants/
│   │   └── index.ts
│   └── validation/                  # Schemas de validação (Zod)
│       ├── accountSchema.ts
│       ├── transactionSchema.ts
│       └── profileSchema.ts
│
├── infrastructure/                  # Implementações concretas de infraestrutura
│   ├── supabase/
│   │   ├── SupabaseAuthService.ts
│   │   ├── SupabaseAccountRepository.ts
│   │   ├── SupabaseTransactionRepository.ts
│   │   ├── SupabaseCardRepository.ts
│   │   ├── SupabaseInvoiceRepository.ts
│   │   ├── SupabaseAlertRepository.ts
│   │   ├── SupabaseProfileRepository.ts
│   │   └── SupabaseCategoryRepository.ts
│   └── mappers/                     # Conversão DB Row ↔ Domain Model
│       ├── AccountMapper.ts
│       ├── TransactionMapper.ts
│       └── ...
│
├── features/
│   ├── accounts/
│   │   ├── services/
│   │   │   └── AccountService.ts    # Depende de IAccountRepository
│   │   ├── hooks/
│   │   │   └── useAccounts.ts
│   │   └── validation/
│   │       └── accountSchema.ts     # (opcional, pode ficar em core)
│   ├── auth/
│   │   ├── providers/
│   │   │   └── AuthProvider.tsx      # Depende de IAuthService
│   │   └── guards/
│   │       └── ProtectedRoute.tsx
│   ├── transactions/
│   │   ├── services/
│   │   │   └── TransactionService.ts
│   │   └── hooks/
│   │       ├── useTransactions.ts
│   │       └── useCategories.ts
│   ├── cards/
│   │   ├── services/
│   │   │   └── CardService.ts       # NOVO
│   │   └── hooks/
│   │       └── useCards.ts
│   ├── invoices/
│   │   ├── services/
│   │   │   └── InvoiceService.ts    # NOVO
│   │   └── hooks/
│   │       └── useInvoices.ts
│   ├── alerts/
│   │   ├── services/
│   │   │   └── AlertService.ts      # NOVO
│   │   └── hooks/
│   │       └── useAlerts.ts
│   └── profile/
│       ├── services/
│       │   └── ProfileService.ts    # NOVO
│       └── hooks/
│           └── useProfile.ts
│
├── app/
│   └── providers/
│       ├── QueryProvider.tsx
│       └── DIProvider.tsx            # NOVO — Provider de DI para React
├── shared/
│   ├── components/ui/               # Mover de src/components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   └── utils/
│       ├── formatCurrency.ts
│       ├── formatDate.ts
│       ├── parseBRL.ts
│       └── cn.ts                    # Mover de src/lib/utils.ts
│
├── layouts/
├── pages/
├── App.tsx
├── main.tsx
└── index.css
```

### 5.2 Diagrama de Dependências (Camadas)

```
┌─────────────────────────────────────────────────────────┐
│                        UI LAYER                         │
│  Pages, Layouts, Components                             │
│  (Apenas React, sem lógica de negócio)                  │
└──────────────────────────┬──────────────────────────────┘
                           │ usa hooks
┌──────────────────────────▼──────────────────────────────┐
│                    APPLICATION LAYER                     │
│  Hooks (React Query), Providers (Auth, DI, Query)       │
│  (Orquestra UI ↔ Domain)                                │
└──────────────────────────┬──────────────────────────────┘
                           │ usa services
┌──────────────────────────▼──────────────────────────────┐
│                     DOMAIN LAYER                        │
│  Services, Interfaces, Models, Validation, Errors       │
│  (Regras de negócio — ZERO dependência de framework)    │
└──────────────────────────┬──────────────────────────────┘
                           │ depende de interfaces
┌──────────────────────────▼──────────────────────────────┐
│                 INFRASTRUCTURE LAYER                     │
│  SupabaseRepositories, SupabaseAuthService, Mappers     │
│  (Implementações concretas — só esta camada sabe o      │
│   que é Supabase)                                       │
└─────────────────────────────────────────────────────────┘
```

**Regra de ouro**: Dependências apontam sempre para dentro (Infrastructure → Domain, Application → Domain). O Domain **nunca** depende de Infrastructure ou Application.

---

## 6. Melhorias no Backend (Supabase)

### 6.1 Migrations Incrementais

Atualmente existe apenas `001_initial_schema.sql` com todo o schema. Recomenda-se:
- Uma migration por alteração lógica
- Nomenclatura com timestamp: `20260218_create_profiles.sql`
- Usar `supabase migration new` para gerar migrations

### 6.2 Database Functions para Agregações

Mover cálculos pesados para o banco:

```sql
-- Exemplo: função para saldo total do usuário
CREATE OR REPLACE FUNCTION get_total_balance(p_user_id UUID)
RETURNS NUMERIC AS $$
    SELECT COALESCE(SUM(balance), 0)
    FROM public.accounts
    WHERE user_id = p_user_id;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Exemplo: função para resumo mensal
CREATE OR REPLACE FUNCTION get_monthly_summary(
    p_user_id UUID, p_start DATE, p_end DATE
) RETURNS TABLE (
    total_income NUMERIC,
    total_expenses NUMERIC,
    balance NUMERIC
) AS $$
    SELECT
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0)
    FROM public.transactions
    WHERE user_id = p_user_id
      AND date BETWEEN p_start AND p_end;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;
```

### 6.3 Triggers para Atualização Automática de Saldo

Quando uma transação é criada/deletada, o saldo da conta deve ser atualizado automaticamente:

```sql
CREATE OR REPLACE FUNCTION update_account_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE accounts SET balance = balance +
            CASE WHEN NEW.type = 'income' THEN NEW.amount ELSE -NEW.amount END
        WHERE id = NEW.account_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE accounts SET balance = balance -
            CASE WHEN OLD.type = 'income' THEN OLD.amount ELSE -OLD.amount END
        WHERE id = OLD.account_id;
    END IF;
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 6.4 Edge Functions para Lógica Sensível

Operações que exigem validações server-side ou acesso a APIs externas:
- Verificação de limites de crédito antes de criar transações
- Notificações por email/push (integração com serviços externos)
- Geração de relatórios financeiros
- Webhooks para integração bancária

### 6.5 RLS — Melhorias nas Policies

As policies atuais estão corretas para o cenário básico. Recomendações adicionais:
- **Policy para INSERT de transações**: Validar que o `account_id` pertence ao `user_id`
- **Policy para invoices INSERT**: Validar que o `card_id` pertence ao `user_id`
- **Considerar** policies mais granulares para operações específicas

### 6.6 Indexes Adicionais

```sql
-- Index composto para queries mensais (muito frequentes)
CREATE INDEX IF NOT EXISTS idx_transactions_user_date_type
    ON public.transactions(user_id, date, type);

-- Index para categories por type (filtro frequente)
CREATE INDEX IF NOT EXISTS idx_categories_type
    ON public.categories(type);

-- Index parcial para invoices abertas/vencidas
CREATE INDEX IF NOT EXISTS idx_invoices_open
    ON public.invoices(user_id, due_date)
    WHERE status IN ('open', 'overdue');
```

### 6.7 Gerar Tipos Automaticamente

Adicionar script ao `package.json`:

```json
{
    "scripts": {
        "db:types": "supabase gen types typescript --local > src/core/types/database.types.ts"
    }
}
```

---

## 7. Plano de Validação de Dados

### 7.1 Biblioteca Recomendada: Zod

O Zod é a escolha ideal para este projeto porque:
- TypeScript-first — infere tipos automaticamente
- Zero dependências
- Composável e extensível
- Funciona tanto no frontend quanto em Edge Functions

### 7.2 Exemplos de Schemas

```typescript
// core/validation/transactionSchema.ts
import { z } from 'zod'

export const createTransactionSchema = z.object({
    amount: z.number()
        .positive('O valor deve ser positivo')
        .max(999_999_999.99, 'Valor excede o limite'),
    description: z.string()
        .min(1, 'Descrição é obrigatória')
        .max(255, 'Descrição muito longa'),
    categoryId: z.string().uuid('Categoria inválida'),
    accountId: z.string().uuid('Conta inválida'),
    date: z.string().date('Data inválida'),
})

export type CreateTransactionDTO = z.infer<typeof createTransactionSchema>
```

### 7.3 Onde Validar

```
UI (feedback imediato) → Service (validação formal) → DB (constraints)
```

A validação no Service é a **barreira principal**. A validação na UI é para UX, e as constraints no DB são a última linha de defesa.

---

## 8. Tratamento de Erros — Proposta Completa

### 8.1 Hierarquia de Erros

```typescript
// core/errors/AppError.ts
abstract class AppError extends Error {
    abstract readonly code: string
    abstract readonly statusCode: number
    readonly timestamp: Date
    readonly context?: Record<string, unknown>
}

// core/errors/AuthenticationError.ts
class AuthenticationError extends AppError {
    readonly code = 'AUTH_ERROR'
    readonly statusCode = 401
}

// core/errors/ValidationError.ts
class ValidationError extends AppError {
    readonly code = 'VALIDATION_ERROR'
    readonly statusCode = 400
    readonly fields: Record<string, string[]>
}

// core/errors/NotFoundError.ts
class NotFoundError extends AppError {
    readonly code = 'NOT_FOUND'
    readonly statusCode = 404
}

// core/errors/NetworkError.ts
class NetworkError extends AppError {
    readonly code = 'NETWORK_ERROR'
    readonly statusCode = 0
}
```

### 8.2 Error Boundary Global

Criar um Error Boundary React que captura erros não tratados e apresenta UI adequada com opção de retry.

---

## 9. Checklist de Implementação (Priorizado)

### Fase 1 — Fundação (Alta prioridade)

- [ ] **Remover credenciais expostas** de `.gemini/settings.json` e revogar o token
- [ ] **Gerar `database.types.ts` automaticamente** via Supabase CLI
- [ ] **Criar interfaces** para todos os repositories (`IAccountRepository`, etc.)
- [ ] **Criar interface `IAuthService`** com tipos independentes de provider
- [ ] **Definir `Result<T, E>` type** em `core/types/Result.ts`
- [ ] **Definir hierarquia de erros** (`AppError`, `ValidationError`, etc.)

### Fase 2 — Desacoplamento (Alta prioridade)

- [ ] **Mover repositories para `infrastructure/supabase/`** renomeando para `SupabaseXxxRepository`
- [ ] **Implementar interfaces** nos repositories existentes
- [ ] **Criar container de DI** simples em `core/di/`
- [ ] **Refatorar `AuthProvider`** para depender de `IAuthService`
- [ ] **Refatorar `AuthService`** para receber o client Supabase por injeção

### Fase 3 — Padronização (Média prioridade)

- [ ] **Criar Services faltantes**: `CardService`, `InvoiceService`, `AlertService`, `ProfileService`
- [ ] **Instalar Zod** e criar schemas de validação para cada entidade
- [ ] **Aplicar validação** na camada de Service antes de delegar ao repository
- [ ] **Padronizar tratamento de erros** — cada repository converte erro Supabase para `AppError`
- [ ] **Consolidar utilitários** — mover `lib/utils.ts` para `shared/utils/cn.ts`

### Fase 4 — Backend Supabase (Média prioridade)

- [ ] **Criar Database Functions** para `get_total_balance` e `get_monthly_summary`
- [ ] **Criar trigger** de atualização automática de saldo
- [ ] **Adicionar indexes compostos** para queries frequentes
- [ ] **Refinar RLS policies** — validação cross-table em INSERTs
- [ ] **Separar migration** monolítica em migrations incrementais

### Fase 5 — Qualidade (Prioridade contínua)

- [ ] **Configurar testes unitários** com Vitest
- [ ] **Criar implementações InMemory** dos repositories para testes
- [ ] **Testar Services** isoladamente (sem dependência do Supabase)
- [ ] **Adicionar path aliases** no `tsconfig.app.json` (`@core/`, `@features/`, etc.)
- [ ] **Configurar CI/CD** para rodar testes e linting automaticamente

---

## 10. Resumo das Recomendações por Design Pattern

| Design Pattern          | Estado Atual                  | Recomendação                                     |
|:------------------------|:------------------------------|:-------------------------------------------------|
| **Repository**          | Implementado sem interfaces   | Adicionar interfaces + mover para infrastructure  |
| **Service Layer**       | Parcial (2 de 7 módulos)      | Padronizar em todos os módulos                    |
| **Singleton**           | SupabaseClient ✅, demais ⚠️  | Usar Container DI em vez de exports               |
| **Dependency Injection**| Ausente                       | Container leve + constructor injection            |
| **Adapter**             | Ausente                       | Adapter para o client Supabase                    |
| **Factory**             | Ausente                       | Factories para criação validada de entidades      |
| **Result/Either**       | Ausente (usa throw)           | Result<T, E> em retornos de Services              |
| **Observer**             | AuthProvider ✅ (onAuthChange) | Manter, mas abstrair o evento                    |
| **Strategy**            | Ausente                       | Futuro: estratégias de notificação/export         |
| **Unit of Work**        | Ausente                       | Futuro: transações multi-tabela via DB functions  |

---

## 11. Considerações Finais

A arquitetura atual demonstra bom entendimento de separação por features e camadas (Repository → Service → Hook). O ponto mais crítico é o **acoplamento com o Supabase SDK em toda a codebase**. Ao implementar as interfaces e mover as implementações concretas para uma camada de infraestrutura, o projeto ganha:

1. **Testabilidade** — Services podem ser testados sem o Supabase
2. **Flexibilidade** — Trocar o BaaS exige mudar apenas a camada de infraestrutura
3. **Manutenibilidade** — Contratos claros facilitam onboarding e refatorações
4. **Segurança** — Validação formal previne dados inválidos
5. **Performance** — Agregações no banco reduzem transferência de dados

A migração pode ser feita **incrementalmente**, módulo a módulo, sem quebrar a aplicação em nenhum momento.
