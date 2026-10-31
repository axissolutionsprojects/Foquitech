-- ══════════════════════════════════════════════════════════════
-- Foqui — Criar usuários operacionais
-- Execute no Supabase SQL Editor APÓS o schema.sql
-- IMPORTANTE: troque as senhas antes de ir para produção
-- ══════════════════════════════════════════════════════════════

-- adm01 / Foqui@Adm2026
insert into auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, role, aud
) values (
  gen_random_uuid(), '00000000-0000-0000-0000-000000000000',
  'adm01@foquitech.internal',
  crypt('Foqui@Adm2026', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"],"perfil":"admin"}',
  '{"nome":"Administrador","perfil":"admin"}',
  'authenticated', 'authenticated'
) on conflict (email) do nothing;

-- operador01 / Foqui@Op012026
insert into auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, role, aud
) values (
  gen_random_uuid(), '00000000-0000-0000-0000-000000000000',
  'operador01@foquitech.internal',
  crypt('Foqui@Op012026', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"],"perfil":"operador"}',
  '{"nome":"Operador 01","perfil":"operador"}',
  'authenticated', 'authenticated'
) on conflict (email) do nothing;

-- operador02 / Foqui@Op022026
insert into auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, role, aud
) values (
  gen_random_uuid(), '00000000-0000-0000-0000-000000000000',
  'operador02@foquitech.internal',
  crypt('Foqui@Op022026', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"],"perfil":"operador"}',
  '{"nome":"Operador 02","perfil":"operador"}',
  'authenticated', 'authenticated'
) on conflict (email) do nothing;
