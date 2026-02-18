# Bandeira Finance App

Aplicativo de finanças pessoais moderno e responsivo.

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

- `/src`
  - `/core`: Configurações, tipos e constantes globais.
  - `/features`: Módulos funcionais (Auth, Transactions, Accounts, etc.).
  - `/pages`: Componentes de página.
  - `/shared`: Componentes e utilitários compartilhados.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run preview`: Visualiza o build de produção localmente.
- `npm run lint`: Executa a verificação de linting.
