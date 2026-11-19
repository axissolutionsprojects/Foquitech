# CONTEXT — Foqui Sanduíches · Painel Operacional
**Última atualização:** 19/11/2026
**Cache SW atual:** `foqui-v58`
**Deploy:** https://foquitech.vercel.app

---

## Estado atual dos módulos

| Rota | Arquivo | Status |
|------|---------|--------|
| `/` | `index.html` | ✅ v58 |
| `/producao` | `producao-tablet.html` | ✅ Estável |
| `/finalizacao` | `finalizacao-tablet.html` | ✅ Estável |
| `/atendimento` | `atendimento-tablet.html` | ✅ v58 — fotos nomeadas HH-MM-SS_(nome_item).jpg |
| `/admin` | `admin.html` | ✅ v58 — Realtime + notif push + voz FOQUI |
| `/login` | `login.html` | ✅ Estável |

---

## Checklist — totais definitivos

| Tab | Total itens | IDs de controle |
|-----|------------|-----------------|
| Abertura (AI) | 60 | aber-1 … aber-45d |
| Fechamento (FI) | 59 | fech-1c … fech-46 |

**Itens com foto obrigatória:**
- `ABER_FOTO` (16 ids): aber-7b, aber-20, aber-20b, aber-26b, aber-28, aber-31, aber-32b–32f, aber-39, aber-44b, aber-45b–45d
- `FECH_FOTO` (18 ids): fech-1c, fech-1d, fech-1b, fech-2b, fech-7, fech-8b, fech-12, fech-12b, fech-14b, fech-15, fech-18, fech-18b, fech-18c, fech-20b, fech-27, fech-27b, fech-33b, fech-42

---

## Fotos — convenção de nomeação (v58)

Formato do path no Storage:
```
{uid}/{YYYY-MM-DD}/{tab}/HH-MM-SS_(Nome_do_Item).jpg
```
- Hora exata no momento do upload
- Nome extraído do `.at-lbl` do item no DOM (automático, sem mapa manual)
- Acentos removidos, espaços/especiais → `_`

---

## Admin — relatórios de checklist

- `_renderAtRelList` e `showAtendDet`: ambos usam `totalItens = 55` e `pct = r.concluido_at ? 100 : (r.progresso || Math.round(nItens/totalItens*100))`
- Sort: `concluido_at DESC nullsFirst:false` (concluídos primeiro)
- Auto-refresh: 30s quando aba relatorios está ativa
- **Realtime:** subscription `foqui-checklist-realtime` em `atendimento_sessoes` → `loadAtendRel()` instantâneo + notificação push com `speechSynthesis` voz "FOQUI" ao `concluido_at` aparecer

---

## Segurança — fixes aplicados (v50+)

- **C1** `app_metadata.perfil` para verificação de admin (imutável pelo usuário)
- **C2** API routes com Bearer token + perfil admin
- **C3** `create-user` / `update-user` usam `app_metadata`
- **A1** `esc()` anti-XSS em todos os innerHTML com dados do banco; `window.esc = esc` para acessar fora do module
- **A3** Fotos salvas por PATH (não URL pública), signed URLs de 1h no admin
- **M1** Headers HTTP via `vercel.json`
- **M2** `esm.sh` pinado `@2.49.1`
- **M3** SW não cacheia supabase/esm/qrserver

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
- Bucket `atendimento`: privado, fotos por PATH, signed URLs de 1h no admin

## Próximos passos
- Web Push real (admin fechado): VAPID keys + endpoint Vercel + subscription salva no banco
- Ativar Gestão de Ponto / RH / Financeiro (mockups prontos)
- Filtro por data no relatório admin
