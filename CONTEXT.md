# CONTEXT — Foqui Sanduíches · Painel Operacional
**Última atualização:** 14/11/2026
**Cache SW atual:** `foqui-v50`
**Deploy:** https://foquitech.vercel.app

---

## Estado atual dos módulos

| Rota | Arquivo | Status |
|------|---------|--------|
| `/` | `index.html` | ✅ v50 — esm.sh pinado |
| `/producao` | `producao-tablet.html` | ✅ Estável |
| `/finalizacao` | `finalizacao-tablet.html` | ✅ Estável |
| `/atendimento` | `atendimento-tablet.html` | ✅ v50 — sync indicator, toast, retry upload, logout limpa foqui_ |
| `/admin` | `admin.html` | ✅ v50 — API auth guard, esc(), _authFetch, app_metadata |
| `/login` | `login.html` | ✅ v50 — esm.sh pinado |

---

## Segurança — fixes aplicados (v50)

### CRÍTICOS
- **C1 — Privilege escalation:** admin.html agora verifica SOMENTE `app_metadata.perfil` (imutável pelo usuário). Antes verificava `user_metadata` primeiro, que qualquer operador podia alterar via `updateUser()`
- **C2 — API routes sem auth:** todos os 4 endpoints (`/api/create-user`, `/api/update-user`, `/api/delete-user`, `/api/get-users`) agora verificam Bearer token + `app_metadata.perfil === 'admin'` via `api/_auth.js`
- **C3 — perfil em user_metadata:** `create-user.js` agora usa `app_metadata: { perfil }` + `update-user.js` atualiza `app_metadata` via Admin API

### ALTOS
- **A1 — XSS admin:** função `esc()` adicionada; aplicada em `r.responsavel`, `u.nome`, `u.perfil`, `f.item_id` em todos os innerHTML com dados do banco
- **A2 — XSS topbar operador:** `b.innerHTML` com `nome` substituído por `textContent` via DOM
- **A3 — getPublicUrl em bucket privado:** `uploadFoto` agora salva o `path` em vez de URL pública; `_storagePath()` aceita tanto URL quanto path direto (retrocompatível)

### MÉDIOS
- **M1 — Headers HTTP:** `vercel.json` com `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy: camera=self`
- **M2 — esm.sh pinado:** `@2.49.1` em todos os 4 arquivos HTML
- **M3 — SW cache:** excluídos `supabase.co`, `esm.sh` e `qrserver.com` do cache do SW
- **M4 — Logout:** limpa chaves `foqui_*` além de `sb-*` no localStorage

### UX
- **U2 — Sync indicator:** ícone `↻` / `✓` / `⚠` no topbar do operador mostra estado de sincronização em tempo real
- **U3 — Retry upload:** botão "⚠ tentar de novo" ao lado da foto quando upload falha; re-usa base64 do localStorage
- **U1 — Toasts:** `_showToast()` substitui `alert()` nos erros de fotos faltando e erro ao salvar (non-blocking, auto-fecha em 4s)

---

## API Routes — `/api/`

| Rota | Método | Auth requerida |
|------|--------|----------------|
| `/api/get-users` | GET | Bearer token admin |
| `/api/create-user` | POST | Bearer token admin |
| `/api/update-user` | POST | Bearer token admin |
| `/api/delete-user` | DELETE | Bearer token admin |

Shared helper: `api/_auth.js` — verifica JWT + `app_metadata.perfil === 'admin'`

---

## Supabase
- Projeto: `dmqvxrvazwtpqzkgxhcb`
- Admin user: `adm01@foquitech.internal` (app_metadata.perfil = 'admin' ✓)
- Bucket `atendimento`: privado, fotos salvas por PATH (não URL pública), signed URLs de 1h no admin

## Próximos passos
- Ativar Gestão de Ponto / RH / Financeiro (mockups prontos)
- Notificação push ao concluir turno
- Filtro por data no relatório admin
