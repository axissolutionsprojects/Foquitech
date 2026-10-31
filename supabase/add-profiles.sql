-- ══════════════════════════════════════════════════════════════
-- Foqui — Tabela profiles + trigger
-- Execute no Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════

create table if not exists profiles (
  id uuid references auth.users(id) primary key,
  nome text,
  perfil text check (perfil in ('admin','operador')),
  ativo boolean default true,
  criado_em timestamptz default now()
);

alter table profiles enable row level security;

drop policy if exists "auth_read_profiles" on profiles;
drop policy if exists "auth_admin_write" on profiles;
create policy "auth_read_profiles" on profiles for select using (auth.role() = 'authenticated');
create policy "auth_admin_write" on profiles for all using (auth.role() = 'authenticated');

-- Trigger: cria profile ao criar usuário
create or replace function handle_new_user() returns trigger as $$
begin
  insert into profiles (id, nome, perfil)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', split_part(new.email,'@',1)),
    coalesce(new.raw_app_meta_data->>'perfil', new.raw_user_meta_data->>'perfil', 'operador')
  ) on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Criar profiles para usuários já existentes
insert into profiles (id, nome, perfil)
select
  id,
  coalesce(raw_user_meta_data->>'nome', split_part(email,'@',1)),
  coalesce(raw_app_meta_data->>'perfil', raw_user_meta_data->>'perfil', 'operador')
from auth.users
where email like '%@foquitech.internal'
on conflict (id) do nothing;

select * from profiles;
