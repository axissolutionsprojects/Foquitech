# MANUAL DE FUNCIONALIDADES — Foqui Sanduíches · Painel Operacional
**Última atualização:** 14/11/2026 às 00h51
**Plataforma:** https://foquitech.vercel.app · SW `foqui-v49`

> Atualizado a cada modificação — nunca desatualizado.

---

## Home — `index.html`

- [x] Card Produção com `focaccia-banner.png` decorativo (direita, centralizado)
- [x] Card Finalização com `sanduiche-rosa.png` decorativo (direita, topo)
- [x] Card Atendimento com `el-rosa-02.png` decorativo (direita, topo) ← **novo v47**
- [x] Auth guard: sem sessão → redireciona para login
- [x] Link Admin visível apenas para perfil `admin`

---

## Atendimento — `atendimento-tablet.html`

### Home Atendimento
- [x] Card Abertura com progresso (X / 52 itens)
- [x] Card Fechamento com progresso (X / 57 itens)
- [x] Calendário de datas: janela 3 dias, navegável com setas
- [x] Datas passadas: modo leitura (toggleItem bloqueado)
- [x] Nome do usuário logado no topbar
- [x] Logout

### Seletor de responsável (aber e fech)
- [x] Pills: Francisco Alan / Geovana Prestes / Sara Sahari Caetano
- [x] Seleção salva em localStorage + dispara `upsertSessao`
- [x] Desabilitado ao visualizar datas passadas
- [x] Obrigatório para concluir turno

### QR Codes de ponto (topo, sempre visível)
- [x] Francisco Alan — CPF 099.495.752-14
- [x] Geovana Prestes — CPF 054.202.032-78
- [x] Sara Sahari Caetano — CPF 559.865.458-00
- [x] QR gerado via `api.qrserver.com` em tempo real

### Módulo Abertura (52 itens — AI[])
**Seções:** Entrada · Área Externa · Salão/Caixa · Cozinha · Estoque/Fundos

**Itens com foto obrigatória (ABER_FOTO):**
- `aber-7b` — Lixeiras do atendimento vazias
- `aber-20` — Ar condicionado do salão
- `aber-20b` — Lixeira do salão vazia
- `aber-26b` — Ralo limpo (cozinha)
- `aber-28` — Ar condicionado da cozinha
- `aber-31` — Registro geral de gás
- `aber-32b` — Lixeira da cozinha vazia e limpa
- `aber-39` — Refrigerador 4
- `aber-44b` — Refrigerador 5
- `aber-45b` — Refrigerador 6
- `aber-45c` — Banheiro/vestiário/lavanderia

#### O que o operador pode fazer
- [x] Ver barra de progresso (X / 52 itens)
- [x] Marcar / desmarcar cada item
- [x] Tirar foto nos itens obrigatórios (câmera do dispositivo)
- [x] Foto comprimida (900×675 max, JPEG 78%) antes do upload
- [x] Upload imediato para Supabase Storage bucket `atendimento`
- [x] URL gravada em `atendimento_fotos` ao tirar foto
- [x] `upsertSessao` disparado a cada check e foto (debounce 800ms)
- [x] QR de ponto visível ao atingir 100%
- [x] Concluir turno → popup "Loja aberta! ☀️ — Tenham um ótimo dia."
- [ ] Histórico de aberturas por operador no próprio tablet

### Módulo Fechamento (57 itens — FI[])
**Seções:** Banheiro/Vestiário/Lavanderia · Estoque/Congeladores · Cozinha · Salão/Caixa · Área Externa · Saída

**Itens com foto obrigatória (FECH_FOTO):**
- `fech-1c` — Banheiro dos fundos organizado
- `fech-1b` — Vestiário organizado
- `fech-2b` — Lavanderia organizada
- `fech-7` — Ralo limpo (após amassadeira)
- `fech-8b` — Ralo limpo (após ar-cond cozinha)
- `fech-12` — Ar condicionado da cozinha desligado
- `fech-12b` — Ralo limpo (antes das luzes)
- `fech-14b` — Lixeira da cozinha vazia (após impressora de pedidos)
- `fech-15` — Registro geral de gás fechado
- `fech-18` — Refrigerador 4
- `fech-18b` — Refrigerador 5
- `fech-18c` — Lixeira da cozinha vazia (após último ralo cozinha)
- `fech-20b` — Lixeira do salão vazia
- `fech-27` — Ar condicionado do salão desligado
- `fech-27b` — Lixeira do salão vazia (após AC salão)
- `fech-33b` — Lixeiras do atendimento vazias
- `fech-42` — Refrigerador 6

#### O que o operador pode fazer
- [x] Mesmas ações do módulo Abertura
- [x] Concluir turno → popup "Muito bem! 🎉 — Tenham um bom descanso."

### Lógica de upsert progressivo
- [x] `toggleItem`: salva em localStorage → `upsertSessao(tab)` com debounce 800ms
- [x] `uploadFoto`: upload → `atendimento_fotos` → `upsertSessao(tab)`
- [x] `upsertSessao`: payload `{user_id, data, tab, responsavel, itens_concluidos, fotos, progresso, concluido_at}`
- [x] `concluido_at: (existing && existing[tab]) || null` — null antes do concluir, timestamp depois
- [x] UNIQUE `(user_id, data, tab)` — uma linha por operador por dia por tab

---

## Admin — `admin.html`

### Autenticação
- [x] Apenas usuários com `perfil = 'admin'` acessam
- [x] Redireciona para `/login` se não autenticado
- [x] `window._sb = sb` e `window._supabase = sb` ambos definidos (fix v48)

### Relatórios → Checklist de Atendimento
- [x] Abre automaticamente ao entrar em Relatórios
- [x] Toggle Abertura / Fechamento
- [x] 4 cards por vez + "Ver mais" (+4) / "Ver menos" (volta para 4)
- [x] Card por dia: data, dia da semana, responsável, nº itens, nº fotos, barra de progresso
- [x] Badge amarelo "XX% ↻ em andamento" ou verde "✓ HH:MM" quando concluído
- [x] Clique no card → painel de detalhes com:
  - Responsável, itens concluídos / total, status badge, barra de progresso
  - Grade de thumbnails das fotos (signed URLs — bucket privado) ← **fix v49**
  - Clique na thumbnail → lightbox popup (backdrop blur, `✕`, click-outside, Escape) ← **novo v49**
- [ ] Refresh automático (polling)
- [ ] Filtro por intervalo de datas
- [ ] Exportar PDF/CSV
- [ ] Alerta quando dia passar sem registro

### Relatórios → Logs de Acesso e Modificações
- [x] Colapsável
- [x] Filtros: tipo de ação, busca por texto
- [x] Paginação

### Operadores (antigo "Usuários")
- [x] Listar, criar, editar, excluir operadores Supabase Auth

### Configurações
- [x] Ativo

### Em Breve (sidebar)
| Módulo | Status |
|--------|--------|
| Dashboard | 🔜 Badge "Em Breve" |
| Estoque | 🔜 Badge "Em Breve" |
| Gestão de Ponto | 🔜 Badge "Em Breve" |
| Gestão de RH | 🔜 Badge "Em Breve" |
| Gestão Financeira | 🔜 Badge "Em Breve" |

---

## Finalização — `finalizacao-tablet.html`

### Checklist Produção
- [x] Itens agrupados por operador, marcar/desmarcar
- [x] Badge amarelo com quantidade a produzir
- [x] Progresso separado: Sanduíches / Outros
- [x] Expandir seções grandes
- [x] Adicionar item manual
- [x] Per-item operator tag

### Checklist Reposição
- [x] Quantidade por item, filtro por > 0, marcar como reposto

### Contagem
- [x] Responsável + operadores
- [x] Per-item operator tag (sobrescreve seção)
- [x] Revisão por operador + envio → atualiza checklist

### Estoque Finalização
- [x] 5 categorias, editar nível, indicador visual

---

## Produção — `producao-tablet.html`

- [x] 14 receitas com calculadora proporcional
- [x] Programação diária — janela 3 dias
- [x] Estoque com barra de nível por categoria
- [x] Lista de compras prioritárias
- [x] 100% offline (fontes base64, SW cache-first)

---

## Infraestrutura

### Service Worker (`sw.js`)
- [x] Cache-first para todos os assets estáticos
- [x] Network-first para `/api/`
- [x] Bump de versão a cada deploy para invalidar cache antigo
- Versão atual: `foqui-v49`

### Supabase Storage — bucket `atendimento`
- [x] Privado (não público)
- [x] Acesso via signed URLs de 1h
- [x] Path: `{user_id}/{YYYY-MM-DD}/{tab}/{item_id}_{timestamp}.jpg`

### Deploy
- Plataforma: Vercel
- URL canônica: https://foquitech.vercel.app
- Repositório local: `/Users/Fe/Documents/Foqui v2`

---

## Legenda
| Ícone | Significado |
|-------|-------------|
| [x] | Implementado e funcional |
| [ ] | Previsto / sugerido / não implementado |
| 🔜 | Em desenvolvimento / mockup pronto |
