# Configuração do Login com Google (OAuth)

Este guia descreve os passos necessários para configurar o login com Google OAuth no Bandeira Finance App. O fluxo utiliza **Supabase Auth** e requer configuração tanto no **Google Cloud Console** quanto no **Supabase Dashboard**.

---

## 1. Google Cloud Console

### 1.1 Criar um projeto (ou usar existente)

1. Acesse [Google Cloud Console](https://console.cloud.google.com/).
2. No seletor de projetos (topo da página), clique em **Novo Projeto**.
3. Informe o nome (ex: "Bandeira Finance") e clique em **Criar**.

### 1.2 Configurar a tela de consentimento OAuth

1. No menu lateral, vá em **APIs e Serviços** → **Tela de consentimento OAuth**.
2. Se solicitado, escolha **Externo** (para testes com qualquer conta Google) e clique em **Criar**.
3. Preencha os campos obrigatórios:
   - **Nome do aplicativo**: Bandeira Finance (ou FinTrack)
   - **E-mail de suporte do usuário**: seu e-mail
   - **Domínios autorizados** (em Produção): seu domínio, ex: `seudominio.com`
4. Clique em **Salvar e continuar**.
5. Em **Escopos**, clique em **Adicionar ou remover escopos**.
6. Adicione `email`, `profile` e `openid` (suficiente para login básico).
7. Salve e continue até concluir a configuração.

### 1.3 Criar credenciais OAuth

1. Vá em **APIs e Serviços** → **Credenciais**.
2. Clique em **+ Criar credenciais** → **ID do cliente OAuth**.
3. Tipo de aplicativo: **Aplicativo da Web**.
4. Nome: ex. "Bandeira Finance Web".
5. Em **URIs de redirecionamento autorizados**, adicione **exatamente**:
   ```
   https://<SEU_PROJECT_REF>.supabase.co/auth/v1/callback
   ```
   - Pegue o **Project Ref** da sua URL do Supabase (ex: `https://uhlxfptxkvzonuuzrlpy.supabase.co` → ref = `uhlxfptxkvzonuuzrlpy`).
   - **Importante:** use a URL do Supabase, **não** `http://localhost:5173` nem `/login`. O Google redireciona primeiro para o Supabase, que depois redireciona para o seu app.
6. Clique em **Criar**.
7. Copie o **ID do cliente** e o **Segredo do cliente** — você usará no Supabase.

---

## 2. Supabase Dashboard

### 2.1 Habilitar o provedor Google

1. Acesse [Supabase Dashboard](https://supabase.com/dashboard) e selecione seu projeto.
2. No menu lateral, vá em **Authentication** → **Providers**.
3. Localize **Google** e clique para expandir.
4. Ative o provedor (toggle **Enable Sign in with Google**).
5. Cole:
   - **Client ID**: o ID do cliente do Google Cloud.
   - **Client Secret**: o segredo do cliente do Google Cloud.
6. Clique em **Save**.

### 2.2 Configurar Redirect URIs

1. Em **Authentication** → **URL Configuration**.
2. Em **Redirect URLs**, adicione as URLs onde seu app será acessado:

   **Desenvolvimento local:**
   ```
   http://localhost:5173/login
   ```

   **Produção (substitua pelo seu domínio):**
   ```
   https://seudominio.com/login
   ```

3. Em **Site URL**, configure:
   - Desenvolvimento: `http://localhost:5173`
   - Produção: `https://seudominio.com`

4. Salve as alterações.

---

## 3. Variáveis de ambiente

Nenhuma variável extra é necessária no frontend para OAuth. O app usa as mesmas credenciais Supabase (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`). A configuração do Google fica apenas no Supabase Dashboard.

---

## 4. Fluxo de autenticação

1. Usuário clica em **Entrar com Google** na tela de Login.
2. O app chama `signInWithOAuth({ provider: 'google' })` com `redirectTo: /login`.
3. O usuário é redirecionado para a tela de consentimento do Google.
4. Após autorizar, o Google redireciona para o callback do Supabase.
5. O Supabase troca o código por tokens e redireciona de volta para `/login`.
6. O `AuthProvider` detecta a sessão e redireciona o usuário para `/dashboard`.

---

## 5. Troubleshooting

### Error 400: redirect_uri_mismatch

**Causa:** A URI cadastrada no Google Cloud não bate com a que o Supabase envia.

**Correção no Google Cloud Console:**

1. Vá em **Credenciais** → clique no seu **ID do cliente OAuth**.
2. Em **URIs de redirecionamento autorizados**, confira se existe **apenas** a URL do Supabase:
   ```
   https://<SEU_PROJECT_REF>.supabase.co/auth/v1/callback
   ```
3. Exemplo com seu projeto: `https://uhlxfptxkvzonuuzrlpy.supabase.co/auth/v1/callback`
4. Não inclua `http://localhost:5173/login` nem outras URLs de app aqui — isso vai no Supabase (Redirect URLs).

| Problema | Solução |
|----------|---------|
| "Redirect URI mismatch" | No Google Cloud, use **somente** `https://<project_ref>.supabase.co/auth/v1/callback`. |
| Erro ao retornar do Google | Confirme que `/login` está listado em **Redirect URLs** no Supabase. |
| "Access blocked" no Google | Verifique a tela de consentimento OAuth e se o app está em modo de teste ou publicado. |
| Sessão não persiste | Garanta que o domínio da aplicação está na lista de Redirect URLs do Supabase. |
