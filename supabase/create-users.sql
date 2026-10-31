-- ══════════════════════════════════════════════════════════════
-- Foqui — Criar usuários operacionais
-- Execute no Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════

do $$
declare
  uid_adm    uuid := gen_random_uuid();
  uid_op01   uuid := gen_random_uuid();
  uid_op02   uuid := gen_random_uuid();
begin

  -- ── adm01 ──────────────────────────────────────────────────
  if not exists (select 1 from auth.users where email = 'adm01@foquitech.internal') then
    insert into auth.users (
      instance_id, id, aud, role,
      email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data,
      is_super_admin,
      confirmation_token, recovery_token,
      email_change, email_change_token_new
    ) values (
      '00000000-0000-0000-0000-000000000000', uid_adm,
      'authenticated', 'authenticated',
      'adm01@foquitech.internal',
      crypt('Foqui@Adm2026', gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"],"perfil":"admin"}',
      '{"nome":"Administrador","perfil":"admin"}',
      false, '', '', '', ''
    );
    insert into auth.identities (
      provider_id, user_id, identity_data, provider,
      last_sign_in_at, created_at, updated_at
    ) values (
      uid_adm::text, uid_adm,
      jsonb_build_object('sub', uid_adm::text, 'email', 'adm01@foquitech.internal'),
      'email', now(), now(), now()
    );
  end if;

  -- ── operador01 ─────────────────────────────────────────────
  if not exists (select 1 from auth.users where email = 'operador01@foquitech.internal') then
    insert into auth.users (
      instance_id, id, aud, role,
      email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data,
      is_super_admin,
      confirmation_token, recovery_token,
      email_change, email_change_token_new
    ) values (
      '00000000-0000-0000-0000-000000000000', uid_op01,
      'authenticated', 'authenticated',
      'operador01@foquitech.internal',
      crypt('Foqui@Op012026', gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"],"perfil":"operador"}',
      '{"nome":"Operador 01","perfil":"operador"}',
      false, '', '', '', ''
    );
    insert into auth.identities (
      provider_id, user_id, identity_data, provider,
      last_sign_in_at, created_at, updated_at
    ) values (
      uid_op01::text, uid_op01,
      jsonb_build_object('sub', uid_op01::text, 'email', 'operador01@foquitech.internal'),
      'email', now(), now(), now()
    );
  end if;

  -- ── operador02 ─────────────────────────────────────────────
  if not exists (select 1 from auth.users where email = 'operador02@foquitech.internal') then
    insert into auth.users (
      instance_id, id, aud, role,
      email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data,
      is_super_admin,
      confirmation_token, recovery_token,
      email_change, email_change_token_new
    ) values (
      '00000000-0000-0000-0000-000000000000', uid_op02,
      'authenticated', 'authenticated',
      'operador02@foquitech.internal',
      crypt('Foqui@Op022026', gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"],"perfil":"operador"}',
      '{"nome":"Operador 02","perfil":"operador"}',
      false, '', '', '', ''
    );
    insert into auth.identities (
      provider_id, user_id, identity_data, provider,
      last_sign_in_at, created_at, updated_at
    ) values (
      uid_op02::text, uid_op02,
      jsonb_build_object('sub', uid_op02::text, 'email', 'operador02@foquitech.internal'),
      'email', now(), now(), now()
    );
  end if;

end $$;

-- Verificar
select email, raw_user_meta_data->>'perfil' as perfil, created_at
from auth.users
where email like '%@foquitech.internal'
order by created_at;
