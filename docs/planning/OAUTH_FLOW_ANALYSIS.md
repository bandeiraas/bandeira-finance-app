# Análise do Fluxo OAuth Google — Bandeira Finance

## 1. Como o fluxo OAuth cria o usuário no Supabase

### Visão geral

O Supabase Auth utiliza o método único `signInWithOAuth({ provider: 'google' })` tanto para **Login** quanto para **Sign-Up**. Não há distinção no lado do Supabase:

- **Usuário novo**: Supabase cria um registro em `auth.users` e, via trigger, em `public.profiles`.
- **Usuário existente**: Supabase identifica a identidade e associa à sessão existente.

### Sequência do fluxo

1. **Frontend** chama `authService.signInWithOAuth('google')` (IAuthService).
2. **Supabase Client** redireciona o usuário para o consentimento do Google.
3. Após o consentimento, o Google redireciona de volta para a URL configurada (`redirectTo`).
4. O Supabase processa o callback (code exchange) e cria/atualiza o usuário em `auth.users`.
5. O trigger `on_auth_user_created` (AFTER INSERT ON auth.users) cria o registro em `public.profiles`.
6. O usuário é redirecionado para a aplicação já autenticado.

### Dados disponíveis do Google

O `raw_user_meta_data` em `auth.users` contém, para OAuth Google:

- `name` — nome do perfil Google
- `picture` — URL do avatar
- `email` — email verificado pelo Google

O cadastro via email/senha usa `full_name` e `avatar_url` em `user_metadata`; o trigger precisa tratar ambos os formatos.

---

## 2. Criação do perfil em `public.profiles`

### Recomendação: Database Trigger

A abordagem recomendada é usar um **Database Trigger** `AFTER INSERT ON auth.users`. Ela é:

- **Atômica**: perfil criado no mesmo momento em que o usuário é inserido.
- **Independente de rede**: não depende de chamada de API após o redirect.
- **Segura**: roda em `SECURITY DEFINER` no banco.
- **Simples**: mesma lógica para email/senha e OAuth.

O sistema **já possui** esse trigger e foi ajustado para Google OAuth na migration `20260221010211_fix_handle_new_user_google_oauth.sql`.

### Query SQL do trigger (já implementado)

```sql
-- Suporta metadata do Google OAuth (name, picture) além de full_name e avatar_url
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, email)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data ->> 'full_name',
      NEW.raw_user_meta_data ->> 'name'
    ),
    COALESCE(
      NEW.raw_user_meta_data ->> 'avatar_url',
      NEW.raw_user_meta_data ->> 'picture'
    ),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger vinculado (criado na migration inicial)
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### Alternativa: API Hono para finalizar cadastro

Uma abordagem alternativa seria o frontend chamar uma rota da API Hono após o redirect para criar ou atualizar o perfil. Pontos negativos:

- **Complexidade**: depende de o usuário completar o redirect e a página carregar sem erros.
- **Idempotência**: exige lógica para evitar duplicação.
- **Latência**: o usuário pode ver estados intermediários sem perfil.
- **Regras de negócio no frontend**: frontend teria que decidir quando chamar a API.

**Conclusão**: o trigger já atende o fluxo OAuth e deve permanecer como solução principal.

---

## 3. Fluxo ponta a ponta (Resumo)

| Etapa | Ação |
|-------|------|
| 1 | Usuário clica em "Registrar com Google" em `/register` (ou "Entrar com Google" em `/login`). |
| 2 | `signInWithOAuth('google')` inicia o fluxo OAuth. |
| 3 | Redirect para Google, consentimento do usuário. |
| 4 | Redirect de volta para `${origin}/login` (configurado em SupabaseAuthService). |
| 5 | Supabase processa o callback e insere em `auth.users` (ou atualiza identidade existente). |
| 6 | Trigger `handle_new_user` insere em `public.profiles` (novo usuário). |
| 7 | Sessão estabelecida; usuário redirecionado para `/dashboard`. |

---

## 4. Referências

- [Supabase Auth — OAuth](https://supabase.com/docs/guides/auth/social-login)
- [Supabase — Triggers for new users](https://supabase.com/docs/guides/auth/managing-user-data#using-triggers)
- Migration `supabase/migrations/20260221010211_fix_handle_new_user_google_oauth.sql`
- Setup: `docs/setup/OAUTH_GOOGLE_SETUP.md`
