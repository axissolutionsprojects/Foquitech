# Supabase — Setup

## Pré-requisitos
1. Conta em supabase.com
2. Criar **dois projetos**: `foqui-staging` e `foqui-producao`
3. Anotar URL e anon key de cada projeto separadamente

## Ambientes
| Ambiente | Branch Git | Vercel | Supabase |
|----------|-----------|--------|----------|
| Staging  | `staging` | Preview URL automática | foqui-staging |
| Produção | `main`    | URL de produção | foqui-producao |

## Configuração inicial
1. Copie `.env.example` → `.env.local`
2. Preencha com as credenciais do projeto de **staging**
3. No Supabase SQL Editor (staging), execute `supabase/schema.sql`
4. No Vercel → Settings → Environment Variables:
   - `SUPABASE_URL` + `SUPABASE_ANON_KEY` com flag **Preview** (staging)
   - Repita com credenciais de produção com flag **Production**

## Fluxo de trabalho obrigatório
```
feature branch → staging → teste → aprovação → main → produção
```
1. **Nunca** faça merge direto em `main` sem testar em staging
2. Toda mudança vai para `staging` primeiro
3. Teste na URL de preview do Vercel
4. Só após aprovação explícita, abre PR para `main`
5. Merge em `main` → deploy automático em produção
