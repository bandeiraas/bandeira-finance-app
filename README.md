# 🚩 Bandeira Finance App

<p align="center">
  <strong>Aplicativo de finanças pessoais moderno, responsivo e seguro.</strong>
</p>

<p align="center">
  Controle receitas, despesas, contas bancárias, cartões e faturas em um único lugar.
  Construído com arquitetura de monorepo, API REST tipada e design system completo com suporte a Dark/Light mode.
</p>

---

## 🛠 Tech Stack

| Camada | Tecnologias |
| :--- | :--- |
| **Monorepo** | [Turborepo](https://turbo.build/) + npm workspaces |
| **Frontend** | React 19, Vite 7, TailwindCSS, TanStack Query, React Router |
| **Backend** | Node.js, [Hono](https://hono.dev/) (framework HTTP) |
| **Validação** | [Zod](https://zod.dev/) |
| **Banco de Dados** | [Supabase](https://supabase.com/) (PostgreSQL + Auth) |
| **UI/UX** | Dark/Light mode, Glassmorphism, shadcn/ui (Radix), Lucide Icons |

---

## 📁 Estrutura do Monorepo

```
bandeira.finance.app/
├── apps/
│   ├── web/                    # 🌐 Frontend React (Vite)
│   │   ├── src/
│   │   │   ├── components/     # Componentes UI reutilizáveis
│   │   │   ├── features/       # Módulos por domínio (auth, accounts, transactions…)
│   │   │   ├── layouts/        # Layouts da aplicação
│   │   │   ├── pages/          # Páginas/Rotas
│   │   │   └── lib/            # API client HTTP tipado, helpers
│   │   └── ...
│   │
│   └── api/                    # ⚡ Backend API (Hono + Node.js)
│       ├── src/
│       │   ├── routes/         # Endpoints REST
│       │   ├── services/       # Regras de negócio
│       │   ├── repositories/   # Acesso ao Supabase
│       │   └── middleware/     # Auth, CORS, rate limiting
│       └── ...
│
├── packages/
│   ├── shared/                 # 📦 Código compartilhado
│   │   └── types, interfaces, schemas Zod, padrão Result<T,E>, validação
│   │
│   └── database/               # 🗄 Cliente Supabase
│       └── createClient, configuração do banco
│
├── docs/                       # 📚 Documentação
├── supabase/                   # Migrations do banco
└── .github/                    # CI, Contributing, Security
```

### Regra de Ouro: Desacoplamento

> **`apps/web` NUNCA importa de `apps/api`, `packages/database` ou Supabase diretamente** (exceto o Auth SDK para login).  
> Toda comunicação com dados passa pela **API via cliente HTTP tipado** em `lib/api.ts`.

| Pacote | Pode depender de |
| :--- | :--- |
| `apps/web` | `@bandeira/shared` |
| `apps/api` | `@bandeira/shared`, `@bandeira/database` |
| `packages/shared` | — |
| `packages/database` | `@bandeira/shared` |

---

## 📋 Pré-requisitos

- **Node.js** 18 ou superior
- **npm** (ou pnpm, caso configurado)
- **Docker** (opcional, para rodar web + API via `docker compose`)

---

## ⚙️ Variáveis de Ambiente

O projeto usa **um único arquivo `.env.local` na raiz do monorepo**, carregado tanto pela API quanto pelo frontend. Copie o exemplo e preencha com suas chaves:

```bash
cp .env.example .env.local
```

### Variáveis

| Variável | Usado por | Descrição |
| :--- | :--- | :--- |
| `SUPABASE_URL` | API | URL do projeto Supabase |
| `SUPABASE_ANON_KEY` | API | Chave anônima do Supabase |
| `VITE_SUPABASE_URL` | Web | URL do Supabase (Auth no browser) |
| `VITE_SUPABASE_ANON_KEY` | Web | Chave anônima (Auth no browser) |
| `VITE_API_URL` | Web | URL da API (ex: `http://localhost:3001`) |
| `CORS_ORIGINS` | API | Origens permitidas, separadas por vírgula |

**Exemplo `.env.local` (desenvolvimento local):**

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_anon_key

VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key
VITE_API_URL=http://localhost:3001

CORS_ORIGINS=http://localhost:5173,http://localhost:5174
```

> Em produção, ajuste `VITE_API_URL` e `CORS_ORIGINS` para seus domínios reais.

---

## 🚀 Como Rodar o Projeto

### Instalação

```bash
npm install
```

### Desenvolvimento (ambos os apps)

```bash
npm run dev
```

- **Web:** `http://localhost:5173`
- **API:** `http://localhost:3001`

### Rodar apenas Web ou API

```bash
npm run dev:web    # Só o frontend
npm run dev:api    # Só a API
```

### Build e preview

```bash
npm run build
npm run preview    # Visualiza o build do web localmente
```

### Docker (Web + API)

```bash
npm run docker:up
```

Web em `http://localhost` (porta 80) e API em `http://localhost:3001`. Usa `.env.local` como `--env-file`.

```bash
npm run docker:down   # Para os containers
```

---

## 🧪 Qualidade e Boas Práticas

| Prática | Onde |
| :--- | :--- |
| **`Result<T, E>`** | Services retornam `Result` em vez de `throw`; erros são tratados de forma explícita |
| **Validação Zod** | POST/PUT/PATCH validados com schemas do `@bandeira/shared`; respostas 400 com `{ error, message, fields }` |
| **Interfaces** | Services recebem `IAccountRepository`, `ITransactionRepository`, etc., não implementações concretas |
| **Factories** | Criação de entidades via `TransactionFactory`, `AccountFactory`, etc., garantindo invariantes |
| **Dark/Light mode** | Tailwind `dark:` + `class` strategy; suporte a Glassmorphism e paleta semântica |
| **Error Boundary** | App envolvido por `ErrorBoundary`; `ApiErrorBanner` exibe erros de queries de forma amigável |

### Scripts de qualidade

```bash
npx turbo run lint      # ESLint em todos os pacotes
npx turbo run test      # Vitest em todos os pacotes
npx turbo run build     # Build de todos os apps
```

---

## 📚 Documentação Adicional

| Documento | Descrição |
| :--- | :--- |
| [Análise Arquitetural](docs/architecture/ARCHITECTURE_ANALYSIS.md) | Análise profunda da arquitetura e padrões de design |
| [Design System](docs/design/DESIGN.md) | Tipografia, cores, Dark mode, componentes |
| [Plano de Implementação](docs/planning/IMPLEMENTATION_PLAN.md) | Plano detalhado da refatoração arquitetural |
| [Monorepo e Arquitetura](docs/planning/MONOREPO_ARCHITECTURE.md) | Migração para monorepo, desacoplamento e diagramas |
| [Auditoria Frontend](docs/AUDITORIA_FRONTEND.md) | Relatório de auditoria do `apps/web` |
| [Roadmap / TODO](docs/planning/todo.md) | Mapa de telas e próximos passos |
| [Contributing](.github/CONTRIBUTING.md) | Guia de contribuição |
| [Security](.github/SECURITY.md) | Política de segurança |

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia Web e API em desenvolvimento |
| `npm run dev:web` | Apenas o frontend |
| `npm run dev:api` | Apenas a API |
| `npm run build` | Build de todos os pacotes (Turbo) |
| `npm run preview` | Preview do build do web |
| `npx turbo run lint` | Lint em todos os pacotes |
| `npx turbo run test` | Testes em todos os pacotes |
| `npm run db:types` | Gera tipos TS a partir do schema Supabase |
| `npm run db:push` | Aplica migrations ao banco |
| `npm run db:migrate` | Cria nova migration |
| `npm run docker:up` | Sobe Web + API via Docker |
| `npm run docker:down` | Para os containers |

---

## 📄 Licença

Veja [LICENSE](LICENSE) para detalhes.
