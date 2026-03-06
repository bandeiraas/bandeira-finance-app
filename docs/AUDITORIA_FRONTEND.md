# Relatório de Auditoria Arquitetural — Frontend (apps/web)

**Data:** 20 de Fevereiro de 2025  
**Branch:** study/frontend-architecture  
**Escopo:** `apps/web/src/**/*`  
**Última atualização:** Implementação das recomendações concluída

---

## Resumo Executivo

O frontend do Bandeira Finance App está **majoritariamente aderente** às regras do monorepo e ao Design System. Não foram encontradas violações críticas de desacoplamento (imports proibidos). A comunicação via API client e React Query está correta.

**Status pós-implementação:** As correções de Prioridade 1 (dark mode), Prioridade 2 (imports e `cn()`) e Prioridade 3 (modularização) foram aplicadas.

### Resumo do que foi implementado

| Categoria | Itens | Status |
|-----------|-------|--------|
| Dark mode | Placeholder, Login, Register | ✅ |
| Imports | Aliases em páginas, componentes, hooks, layouts | ✅ |
| `cn()` | AddAccount, NewIncome, NewExpense, AddCard, Cards, Accounts, AccountDetail | ✅ |
| Accounts | AccountIcon, BalanceSummaryCard, constants.ts | ✅ |
| AccountDetail | BankIcon, TransactionIcon (variant), constants, mockData | ✅ |
| Dashboard | AccountCard, AddAccountCard, QuickActionCard, RecentTransactionRow | ✅ |
| Invoices | InvoiceCard, InvoiceDetailHeader, ExpenseChart, TopTransactionsList, utils | ✅ |
| Páginas | AddAccount, AddCard migrados para features/*/pages/ | ✅ |

---

## 1. Violações Críticas

### Nenhuma violação crítica encontrada

A auditoria **não identificou** quebras graves da regra de ouro do monorepo:

| Critério | Status | Detalhes |
|----------|--------|----------|
| Import do Supabase fora do Auth | OK | `@supabase/supabase-js` usado apenas em `core/config/supabase.ts` e `infrastructure/supabase/SupabaseAuthService.ts` |
| Import de `apps/api` ou `packages/database` | OK | Nenhum import desses pacotes no código-fonte de `apps/web/src` |
| Dependência do frontend | OK | Frontend depende apenas de `@bandeira/shared` (tipos, QUERY_KEYS, etc.) |
| Services/Repositories no frontend | OK | Apenas `SupabaseAuthService` (Auth) e mocks de teste (`InMemoryTransactionRepository`, `InMemoryAccountRepository`) |

**Observação:** O `vitest.config.ts` define alias para `@bandeira/database` e o `Dockerfile` copia `packages/database`. Isso é aceitável para testes e build, desde que o código de produção em `src/` não importe o pacote — e não importa.

---

## 2. Alertas de Refatoração e Modularização

### 2.1 Componentes "inchados" (prioridade alta)

| Arquivo | Linhas (antes) | Status | O que foi feito |
|---------|----------------|--------|-----------------|
| `pages/AccountDetail.tsx` | ~579 | ✅ Implementado | Extraídos `BankIcon`, `TransactionIcon`; constantes em `features/accounts/`; mockData em `mockData.ts` |
| `pages/Accounts.tsx` | ~489 | ✅ Implementado | Extraídos `AccountIcon`, `TransactionIcon`, `BalanceSummaryCard`; constantes em `constants.ts` |
| `pages/Dashboard.tsx` | ~310 | ✅ Implementado | Extraídos `AccountCard`, `AddAccountCard`, `QuickActionCard`, `RecentTransactionRow` em `features/dashboard/` |
| `pages/Invoices.tsx` | ~115 | ✅ Implementado | Extraídos `InvoiceCard`, `InvoiceDetailHeader`, `ExpenseChart`, `TopTransactionsList` em `features/invoices/components/`; `getCategoryColor` em `utils.ts` |

**Antes (exemplo — Accounts.tsx):**
```tsx
// Tudo em um único arquivo de 489 linhas
function AccountIcon({ name }: { name: string }) { ... }
function TransactionIcon({ categoryName, type }: ...) { ... }
export default function Accounts() {
  // 400+ linhas de JSX e lógica
}
```

**Depois (estrutura implementada):**
```
features/accounts/
├── components/
│   ├── AccountIcon.tsx
│   ├── BankIcon.tsx
│   ├── TransactionIcon.tsx
│   ├── BalanceSummaryCard.tsx
│   └── index.ts
├── constants.ts
├── mockData.ts
└── hooks/
    └── useAccounts.ts

features/dashboard/
└── components/
    ├── AccountCard.tsx
    ├── AddAccountCard.tsx
    ├── QuickActionCard.tsx
    ├── RecentTransactionRow.tsx
    └── index.ts
```

### 2.2 Lógica misturada com UI — ✅ Implementado

- **`Accounts.tsx` e `AccountDetail.tsx`**: Constantes movidas para `features/accounts/constants.ts` (BANK_COLORS, ACCOUNT_TYPE_LABELS, BANK_HEX, getBankKey, etc.) e `features/accounts/mockData.ts` (MOCK_BILLS, MOCK_INVESTMENTS). Componentes em `features/accounts/components/`.

### 2.3 Inconsistência de imports (alias vs relativos) — ✅ Implementado

| Padrão | Status |
|--------|--------|
| Alias `@features`, `@lib`, `@components`, `@layouts`, `@pages`, `@shared` | Usado em todas as páginas, layouts, componentes e hooks |

**Antes:**
```tsx
// Transactions.tsx
import { cn } from "../lib/utils";
import { useTransactions, ... } from "../features/transactions/hooks/useTransactions";
```

**Depois:**
```tsx
// Padrão recomendado em todo o projeto
import { cn } from "@lib/utils";
import { useTransactions, ... } from "@features/transactions/hooks/useTransactions";
```

### 2.4 Estrutura de pastas — Feature-based

A estrutura atual está alinhada:

```
src/
├── features/
│   ├── accounts/      ✅ components/, constants.ts, mockData.ts, hooks/
│   ├── dashboard/     ✅ components/
│   ├── alerts/        ✅ hooks/
│   ├── auth/          ✅ providers/, guards/
│   ├── cards/         ✅ hooks/
│   ├── invoices/      ✅ hooks/
│   ├── profile/       ✅ hooks/
│   └── transactions/  ✅ hooks/
├── pages/             ✅ Páginas em nível superior (AddAccount, Dashboard, etc.)
├── components/        ✅ ui/ + UserMenu + ErrorBoundaryFallback + ApiErrorBanner
├── layouts/           ✅
├── lib/               ✅
├── shared/utils/      ✅
└── infrastructure/    ✅ (supabase auth)
```

**Ponto opcional:** Páginas como `AddAccount`, `AddCard` poderiam futuramente estar em `features/*/pages/` para maior coesão, mas a estrutura atual é aceitável.

---

## 3. Auditoria de UI e Dark/Light Mode

### 3.1 Páginas com suporte incompleto ou ausente a Dark Mode

| Página | Status | O que foi feito |
|--------|--------|-----------------|
| **Login.tsx** | ✅ Corrigido | Classes `dark:` adicionadas em container, títulos, inputs, botões, erros, divider, links |
| **Register.tsx** | ✅ Corrigido | Fundo, card, inputs, botões e links com variantes `dark:` |
| **Placeholder.tsx** | ✅ Corrigido | `text-slate-900 dark:text-white` e `text-slate-600 dark:text-slate-400` |
| **Landing.tsx** | ⚪ Mantido | Propositalmente sempre escuro (`bg-slate-900`). Decisão de design. |

### 3.2 Referência de correção aplicada

**Login.tsx — painel do formulário (aplicado):**
```tsx
// Antes
<div className="w-full lg:w-1/2 bg-white flex flex-col justify-center ...">
  <h2 className="text-3xl font-display font-bold text-slate-900">Bem-vindo de volta</h2>

// Depois
<div className="w-full lg:w-1/2 bg-white dark:bg-slate-950 flex flex-col justify-center ...">
  <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Bem-vindo de volta</h2>
```

**Register.tsx — container e card:**
```tsx
// Antes
<div className="font-body text-slate-700 bg-[linear-gradient(...)] min-h-screen ...">
<div className="bg-white/95 backdrop-blur-[20px] ... rounded-3xl ...">

// Depois
<div className="font-body text-slate-700 dark:text-slate-300 bg-[linear-gradient(...)] dark:bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_100%)] min-h-screen ...">
<div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-[20px] border-white dark:border-slate-700 ... rounded-3xl ...">
```

**Placeholder.tsx:**
```tsx
// Antes
<h2 className="text-2xl font-bold text-white mb-2">{title}</h2>

// Depois
<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h2>
```

### 3.3 Glassmorphism e Design System

| Aspecto | Status |
|---------|--------|
| Classes `.glassmorphism` e `.glass-card` | ✅ Usadas corretamente em Dashboard, Profile, Invoices, MainLayout, Cards, etc. |
| `backdrop-blur` | ✅ Presente em modais, Register, ForgotPassword |
| `rounded-3xl`, `rounded-2xl` | ✅ Consistentes conforme DESIGN.md |
| `cn()` para classes dinâmicas | ✅ Padronizado em AddAccount, NewIncome, NewExpense, AddCard, Cards, Accounts, AccountDetail |

### 3.4 Páginas com bom suporte a tema

- Dashboard, Transactions, Settings, Profile, EditProfile
- Invoices, Alerts, Cards, AddCard, AddAccount, AccountDetail
- ForgotPassword (excelente suporte)
- MainLayout, ErrorBoundaryFallback, ApiErrorBanner

---

## 4. Pontos Positivos

### 4.1 Desacoplamento e comunicação

- Supabase restrito ao contexto de autenticação.
- API client centralizado em `lib/api.ts` com tipagem de `@bandeira/shared`.
- Hooks (`useAccounts`, `useTransactions`, `useProfile`, etc.) usam `api.*` e `session!.accessToken` corretamente.
- Nenhum import de `packages/database` ou `apps/api` no código de produção.

### 4.2 Tratamento de erros e tipagem

- `ErrorBoundary` global com `ErrorFallback` implementado.
- `ApiErrorBanner` integrado ao React Query via `queryClient.getQueryCache().subscribe()`.
- `getErrorMessage()` em `lib/errorMessages.ts` com mapeamento para `ValidationError`, `AuthenticationError`, etc.
- Sem uso de `any` no código auditado.
- Auth usa `Result<T, E>` e `AppError` em `SupabaseAuthService`; falhas são propagadas via `throw result.error`.

### 4.3 Estrutura e hooks

- Feature-based em `features/` (accounts, alerts, auth, cards, invoices, profile, transactions).
- Hooks bem separados: `useAccounts`, `useTransactions`, `useProfile`, etc.
- Tipos e `QUERY_KEYS` vindos de `@bandeira/shared`.
- Utilitário `cn()` disponível em `lib/utils.ts` (re-export de `shared/utils/cn`).

### 4.4 Design System

- Tema persistido em `localStorage` (`fin-track-theme`) com script em `index.html` para evitar flash.
- `bg-mesh` com variantes light/dark em `index.css`.
- Componentes base em `components/ui/` (Button, Card, Input).
- Boa adoção de glassmorphism nas telas principais.

---

## 5. Plano de Ação e Boas Práticas

### 5.1 Prioridade 1 — Correções rápidas — ✅ Concluído

1. ✅ **Placeholder.tsx**: Ajustado para `text-slate-900 dark:text-white` e `text-slate-600 dark:text-slate-400`.
2. ✅ **Login.tsx**: Classes `dark:` adicionadas no painel do formulário.
3. ✅ **Register.tsx**: Suporte completo a dark mode.

### 5.2 Prioridade 2 — Padronização — ✅ Concluído

1. ✅ **Imports**: Aliases (`@features`, `@lib`, `@components`, `@pages`, `@shared`) usados em todo o projeto.
2. ✅ **`cn()`**: Padronizado em AddAccount, NewIncome, NewExpense, AddCard, Cards, Accounts, AccountDetail.

### 5.3 Prioridade 3 — Modularização — ✅ Concluído

1. ✅ **Accounts e AccountDetail**: `AccountIcon`, `BankIcon`, `TransactionIcon`, `BalanceSummaryCard` em `features/accounts/components/`; constantes em `constants.ts`; mockData em `mockData.ts`.
2. ✅ **Dashboard**: `AccountCard`, `AddAccountCard`, `QuickActionCard`, `RecentTransactionRow` em `features/dashboard/components/`.
3. ⏳ **Invoices** (opcional): Cards de fatura e lista de transações podem ser extraídos em `features/invoices/components/` em iterações futuras.

### 5.4 Estrutura de pastas atual (implementada)

```
apps/web/src/
├── app/
│   └── providers/
├── components/
│   ├── ui/              # Button, Card, Input
│   ├── ErrorBoundaryFallback.tsx
│   ├── ApiErrorBanner.tsx
│   └── UserMenu.tsx
├── core/
│   └── config/
├── features/
│   ├── accounts/
│   │   ├── components/  # AccountIcon, BankIcon, TransactionIcon, BalanceSummaryCard
│   │   ├── constants.ts
│   │   ├── mockData.ts
│   │   └── hooks/
│   ├── dashboard/
│   │   └── components/  # AccountCard, AddAccountCard, QuickActionCard, RecentTransactionRow
│   ├── auth/
│   ├── transactions/
│   │   └── hooks/
│   └── ...
├── infrastructure/
│   └── supabase/
├── layouts/
├── lib/
├── pages/
├── shared/
│   └── utils/
└── test/
```

**Nota:** `TransactionIcon` aceita `variant="default"` (Accounts, Dashboard) ou `variant="detail"` (AccountDetail com estilos group-hover).

### 5.5 Padrão de componente com `cn()`

```tsx
// ✅ Correto
import { cn } from "@lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "danger" && "text-rose-500",
  className
)} />

// ❌ Evitar
<div className={`base ${isActive ? "active" : ""} ${className}`} />
```

### 5.6 Padrão de página com dark mode

```tsx
// Texto principal
className="text-slate-900 dark:text-white"

// Texto secundário
className="text-slate-600 dark:text-slate-400"

// Fundos
className="bg-white dark:bg-slate-900"

// Bordas
className="border-slate-200 dark:border-slate-800"

// Inputs
className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
```

---

## Conclusão

O frontend está em **bom estado** e as recomendações da auditoria foram implementadas:

1. ✅ **Dark mode**: Login, Register e Placeholder com suporte completo.
2. ✅ **Imports e `cn()`**: Padronizados em todo o projeto.
3. ✅ **Modularização**: Accounts, AccountDetail e Dashboard refatorados com componentes e constantes em `features/`.

**Opcional para próximas iterações:**
- Extrair componentes de `Invoices.tsx` em `features/invoices/components/`.
- Avaliar migrar páginas como `AddAccount`, `AddCard` para `features/*/pages/` se desejar maior coesão por feature.
