-- Backfill full_name e avatar_url em public.profiles a partir de auth.users.raw_user_meta_data
-- para perfis criados antes do link com OAuth (ex: cadastro email/senha)
UPDATE public.profiles p
SET
  full_name = COALESCE(p.full_name, au.raw_user_meta_data ->> 'full_name', au.raw_user_meta_data ->> 'name'),
  avatar_url = COALESCE(p.avatar_url, au.raw_user_meta_data ->> 'avatar_url', au.raw_user_meta_data ->> 'picture'),
  updated_at = NOW()
FROM auth.users au
WHERE p.id = au.id
  AND au.raw_user_meta_data IS NOT NULL
  AND (
    (p.full_name IS NULL AND (au.raw_user_meta_data ->> 'full_name' IS NOT NULL OR au.raw_user_meta_data ->> 'name' IS NOT NULL))
    OR
    (p.avatar_url IS NULL AND (au.raw_user_meta_data ->> 'avatar_url' IS NOT NULL OR au.raw_user_meta_data ->> 'picture' IS NOT NULL))
  );
