-- Foqui Operacional — Schema v1
-- Execute no Supabase SQL Editor (projeto de staging primeiro, depois produção)

-- Estoque (espelha o localStorage atual)
create table if not exists estoque (
  id              uuid default gen_random_uuid() primary key,
  loja_id         text not null default 'sp01',
  item_id         text not null,
  quantidade      numeric not null default 0,
  atualizado_em   timestamptz default now(),
  unique(loja_id, item_id)
);

-- Checklist de finalização (por dia)
create table if not exists checklist (
  id              uuid default gen_random_uuid() primary key,
  loja_id         text not null default 'sp01',
  item_id         text not null,
  concluido       boolean default false,
  data            date default current_date,
  atualizado_em   timestamptz default now(),
  unique(loja_id, item_id, data)
);

-- Contagem de finalização (por dia)
create table if not exists contagem (
  id              uuid default gen_random_uuid() primary key,
  loja_id         text not null default 'sp01',
  item_id         text not null,
  disponivel      numeric default 0,
  data            date default current_date,
  atualizado_em   timestamptz default now(),
  unique(loja_id, item_id, data)
);

-- Log de produções realizadas
create table if not exists producao_log (
  id              uuid default gen_random_uuid() primary key,
  loja_id         text not null default 'sp01',
  receita_nome    text not null,
  quantidade_base numeric,
  unidade         text,
  produzido_em    timestamptz default now()
);

-- RLS (ativar após implementar autenticação)
alter table estoque      enable row level security;
alter table checklist    enable row level security;
alter table contagem     enable row level security;
alter table producao_log enable row level security;
