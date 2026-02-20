# Bandeira Finance App

Aplicativo de finanças pessoais moderno e responsivo, construído com React, TypeScript, Vite e Supabase.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- NPM ou Yarn

## Configuração

1. Clone o repositório ou baixe os arquivos.
2. Crie um arquivo `.env.local` na raiz do projeto com as chaves do Supabase:
   ```env
   VITE_SUPABASE_URL=seu_supabase_url
   VITE_SUPABASE_ANON_KEY=sua_supabase_anon_key
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Como Rodar

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`.

## Estrutura do Projeto

```
├── apps/
│   └── web/               # Frontend React (Vite)
│       ├── src/
│       │   ├── app/       # Providers e configuração
│       │   ├── core/      # DI, config Supabase
│       │   ├── features/  # Módulos funcionais (Auth, Transactions, etc.)
│       │   ├── infrastructure/
│       │   ├── pages/
│       │   ├── shared/
│       │   └── test/
│       └── ...
├── packages/
│   ├── shared/            # Types, errors, interfaces, validation
│   └── database/          # Supabase createClient
├── docs/                  # Documentação
├── .github/               # CI, contributing, security
├── supabase/              # Migrations
└── skills/                # Skills para AI assistants
```

## Documentação

| Documento | Descrição |
| :--- | :--- |
| [Análise Arquitetural](docs/architecture/ARCHITECTURE_ANALYSIS.md) | Análise profunda da arquitetura e padrões de design |
| [Design System](docs/design/DESIGN.md) | Tipografia, cores, efeitos e layout |
| [Plano de Implementação](docs/planning/IMPLEMENTATION_PLAN.md) | Plano detalhado da refatoração arquitetural |
| [Monorepo e Arquitetura](docs/planning/MONOREPO_ARCHITECTURE.md) | Migração para monorepo, desacoplamento e OOP avançado |
| [Roadmap / TODO](docs/planning/todo.md) | Mapa de telas e próximos passos |
| [Contributing](.github/CONTRIBUTING.md) | Guia de contribuição |
| [Security](.github/SECURITY.md) | Política de segurança |

## Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila o projeto para produção |
| `npm run preview` | Visualiza o build de produção localmente |
| `npm run lint` | Executa a verificação de linting |
| `npm test` | Executa os testes unitários |
| `npm run test:watch` | Executa os testes em modo watch |
| `npm run test:coverage` | Executa os testes com relatório de cobertura |
| `npm run db:types` | Gera tipos TypeScript a partir do schema Supabase |
| `npm run db:push` | Aplica migrations ao banco Supabase |
| `npm run db:migrate` | Cria uma nova migration |

## Licença

Veja [LICENSE](LICENSE) para detalhes.
