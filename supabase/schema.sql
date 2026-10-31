-- ══════════════════════════════════════════════════════════════
-- Foqui Operacional — Schema v1
-- Execute no Supabase SQL Editor: Dashboard → SQL Editor → New
-- ══════════════════════════════════════════════════════════════

-- Estoque
create table if not exists estoque (
  id uuid default gen_random_uuid() primary key,
  loja_id text not null default 'sp01',
  item_id text not null,
  quantidade numeric not null default 0,
  atualizado_por uuid references auth.users(id),
  atualizado_em timestamptz default now(),
  unique(loja_id, item_id)
);

-- Checklist diário
create table if not exists checklist (
  id uuid default gen_random_uuid() primary key,
  loja_id text not null default 'sp01',
  item_id text not null,
  concluido boolean default false,
  concluido_por uuid references auth.users(id),
  data date default current_date,
  atualizado_em timestamptz default now(),
  unique(loja_id, item_id, data)
);

-- Contagem de finalização
create table if not exists contagem (
  id uuid default gen_random_uuid() primary key,
  loja_id text not null default 'sp01',
  item_id text not null,
  disponivel numeric default 0,
  atualizado_por uuid references auth.users(id),
  data date default current_date,
  atualizado_em timestamptz default now(),
  unique(loja_id, item_id, data)
);

-- Logs de produção
create table if not exists producao_log (
  id uuid default gen_random_uuid() primary key,
  loja_id text not null default 'sp01',
  receita_nome text not null,
  quantidade_base numeric,
  unidade text,
  operador_id uuid references auth.users(id),
  produzido_em timestamptz default now()
);

-- Auditoria geral
create table if not exists audit_logs (
  id uuid default gen_random_uuid() primary key,
  usuario_id uuid references auth.users(id),
  usuario_email text,
  acao text not null,
  detalhes jsonb default '{}',
  criado_em timestamptz default now()
);

-- ── RLS ───────────────────────────────────────────────────────
alter table estoque enable row level security;
alter table checklist enable row level security;
alter table contagem enable row level security;
alter table producao_log enable row level security;
alter table audit_logs enable row level security;

-- Apenas usuários autenticados lêem e escrevem
create policy "auth_read"  on estoque      for select using (auth.role() = 'authenticated');
create policy "auth_write" on estoque      for all    using (auth.role() = 'authenticated');
create policy "auth_read"  on checklist    for select using (auth.role() = 'authenticated');
create policy "auth_write" on checklist    for all    using (auth.role() = 'authenticated');
create policy "auth_read"  on contagem     for select using (auth.role() = 'authenticated');
create policy "auth_write" on contagem     for all    using (auth.role() = 'authenticated');
create policy "auth_read"  on producao_log for select using (auth.role() = 'authenticated');
create policy "auth_write" on producao_log for all    using (auth.role() = 'authenticated');
create policy "auth_write_logs" on audit_logs for insert using (auth.role() = 'authenticated');
create policy "auth_read_logs"  on audit_logs for select using (auth.role() = 'authenticated');
