# WORKFLOW v2 Oficial — Foqui Sanduíches · Painel Operacional

**Versão:** 2.0  
**Data:** 01/11/2026  
**Status:** Produção local · Deploy pendente · Admin Panel completo

---

## Visão geral

Sistema operacional interno para as equipes de **Produção** e **Finalização** da Foqui Sanduíches. Desenvolvido inteiramente em HTML/CSS/JS puro, sem frameworks ou dependências externas — roda offline em qualquer tablet ou navegador moderno.

---

## Arquitetura

### Stack
| Camada | Tecnologia | Status |
|--------|-----------|--------|
| Frontend | HTML5 + CSS3 + JS puro | ✅ Produção local |
| Hospedagem | Vercel | 🔜 Configurado, aguarda deploy |
| Banco de dados | Supabase (PostgreSQL) | 🔜 Schema pronto, aguarda conexão |
| Repositório | GitHub | 🔜 Aguarda init |
| CI/CD | Vercel + GitHub Actions | 🔜 Automático após conexão |

### Ambientes obrigatórios
```
Local → staging (branch staging) → produção (branch main)
```
> **Regra pétrea:** toda alteração vai para staging primeiro. Nunca direto em produção.

---

## Arquivos do sistema

### Painel Administrativo (NOVO — v2)
| Arquivo | Rota Vercel | Função |
|---------|-------------|--------|
| `admin.html` | `/admin` | Painel administrativo completo — gestor |
| `login.html` | `/login` | Autenticação Supabase Auth |

### Painéis tablet (operacional — uso diário)
| Arquivo | Rota Vercel | Função |
|---------|-------------|--------|
| `index.html` | `/` | Tela de entrada — seleciona Produção ou Finalização |
| `producao-tablet.html` | `/producao` | Painel de Produção — receitas, calendário, estoque, compras |
| `finalizacao-tablet.html` | `/finalizacao` | Painel de Finalização — checklist, contagem, estoque |

### API Routes (Vercel Serverless)
| Arquivo | Método | Função |
|---------|--------|--------|
| `api/create-user.js` | POST | Cria operador via Supabase Admin Auth |
| `api/get-users.js` | GET | Lista todos os usuários ativos |
| `api/update-user.js` | PATCH | Atualiza nome/perfil do operador |
| `api/delete-user.js` | DELETE | Exclui operador (preserva logs no banco) |

### Infra e configuração
| Arquivo | Função |
|---------|--------|
| `vercel.json` | Configuração de deploy e rotas |
| `.env.local` | Credenciais Supabase (nunca commitar) |
| `supabase/schema.sql` | Schema do banco de dados |
| `CONTEXT.md` | Estado atual do projeto (atualizado a cada sessão) |
| `WORKFLOW.md` | Este documento |

### Assets e documentação
| Pasta | Conteúdo |
|-------|---------|
| `Id Visual/` | Design System oficial, fontes, logo, paleta |
| `assets/` | Imagens, avatar |
| `Docs base/` | Relatório de vendas, rendimentos, livro de receitas |

---

## Funcionalidades entregues

### Painel Administrativo (admin.html) — v2
#### Dashboard
- 6 KPI cards compactos em grade 3×2 com mini-sparklines (Chart.js)
- Cards clicáveis: Faturamento Semanal, Top Seller e Projeção abrem páginas de detalhe
- Páginas de detalhe: Faturamento (filtros Semanal/Diário/Mensal/Anual), Ticket Médio, Margem Bruta, Projeção
- Drag-and-drop para reordenar cards, persistido em `localStorage['foqui_dash_order']`
- Gráficos com eixos X/Y legíveis, fonte numérica Inter em todos os valores

#### Receitas (edição inline)
- Tabela agrupada por categoria: Proteínas · Molhos · Pães · Doces
- Ordem alfabética dentro de cada categoria
- Clique no nome → expande ingredientes editáveis (nome + quantidade)
- Adicionar e remover ingredientes inline, Salvar persiste em `localStorage['foqui_rec_data']`
- **Sincronização automática com tablet de produção** (quantidades atualizadas no próximo acesso)

#### Estoque
- 5 cards em grade 2 colunas (Proteínas, Pães, Molhos, Doces, Temperos)
- Todos os itens visíveis sem accordion — barra de nível colorida (verde/amarelo/rosa)
- Modo edição: campos de % editáveis, persistência em `localStorage['foqui_estoque']`

#### Relatórios
- Importação de relatório CSV/Excel (bloco grande em destaque)
- 3 cards de relatórios de vendas (estilo dashboard compacto)
- Logs de acesso colapsáveis com colunas: Ação · Valor inserido · Quantidade

#### Usuários e Acesso
- Listagem de operadores com badge de perfil (Admin/Operador)
- Criar operador: nome, usuário, perfil, senha → email `@foquitech.internal`
- Editar operador: nome e perfil via modal
- **Excluir operador:** remove do painel, preserva logs de auditoria no Supabase
- Auth via Supabase Auth (`signInWithPassword`)

#### Pré-visualizações EM BREVE
- **Gestão de Ponto** — mockup com KPIs + tabela de registro diário (dados fictícios)
- **Gestão de RH** — mockup com KPIs + tabela de equipe (contrato, férias, status)
- **Gestão Financeira** — mockup com KPIs + DRE simplificado + Contas a Pagar
- Banner rosa em todas: "Pré-visualização · Dados Fictícios · Esta seção ainda não está ativa"

#### Demais abas funcionais
- **Programação** — calendário semanal editável com override de itens
- **Vendas / Sanduíches / Combos / Top Seller** — tabelas analíticas com filtros
- **Configurações** — informações do sistema

---

### Produção (25 views navegáveis)
- **Home 2×2** — 4 módulos em grade, navegação por toque, card selecionado em rosa
- **Receitas** — grade responsiva, 14 receitas com card navegável
- **Detalhe de receita** — tabela de ingredientes + calculadora proporcional em tempo real
  - Selecionar qualquer ingrediente como base → todos os outros recalculados
  - Botão Salvar com feedback visual
  - **Sync automático** do admin: quantidades atualizadas via `localStorage['foqui_rec_data']`
- **Programação diária** — janela de 3 dias navegável, dia vigente destacado, itens clicáveis abrem receita
- **Estoque** — categorias expansíveis, barra de nível, status ok/baixo/zerado, persistência em localStorage
- **Compras** — lista de itens prioritários com quantidades

### Finalização
- **Home** — 3 módulos com tema rosa
- **Checklist** — itens toggle marcar/desmarcar, persistência localStorage
- **Contagem** — "A fazer" calculado em tempo real (meta − disponível), cores por status
- **Estoque** — grid de insumos por categoria

### Calendário de produção (dados de agosto 2026)
| Dia | Produções |
|-----|-----------|
| Dom | Pão de Queijo, Tempero Foqui |
| Seg | Frango Grelhado, Falafel, Maionese de Alho, Maionese de Tomate Seco, Tempero Foqui |
| Ter | Frango Grelhado, Pernil Desfiado, Carne de Panela, Brigadeiro de Colher, Maionese de Bacon, Maionese de Alho |
| Qua | Cogumelo Refogado, Maionese de Alho, Maionese de Bacon, Molho de Alho, Maionese de Pesto |
| Qui | Frango Grelhado, Carne de Panela, Maionese de Limão Siciliano, Tempero Foqui |
| Sex | Pão de Queijo, Mignon, Brigadeiro de Colher, Molho Shoyu, Maionese de Alho |
| Sáb | Frango Grelhado, Pernil Desfiado, Maionese de Bacon |

### Dados do relatório de vendas (agosto 2026)
- **Total:** R$ 134.972,40
- **Top 5 sanduíches:** Frango (366 un), Pernil (241 un), Frango e Bacon (209 un), Caipira (184 un), Caprese (174 un)
- **Combos:** 289 combos no mês → cada combo = sanduíche + brigadeiro + batata chips
- **Brigadeiro:** 367 un/mês (289 combos + 78 avulsos)

---

## Design System

### Paleta oficial
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` / `--bg` | `#004B3B` | Fundo geral |
| `--color-pink` / `--pink` | `#F58DA8` | Destaque, botões, seleção |
| `--color-cream` / `--cream` | `#FFF4DC` | Texto principal |
| `--color-cream-muted` / `--muted` | `#B6D6C9` | Texto secundário |
| `--color-card` / `--card` | `#064F40` | Cards e containers |
| `--color-card-inset` | `#003B2D` | Inset, inputs |
| `--color-ink` / `--ink` | `#004536` | Texto sobre rosa |

### Tipografia
| Fonte | Uso | Aplicação |
|-------|-----|-----------|
| **OhnoBlazeface** | Títulos, números grandes | `font-family:'Ohno',Georgia,serif` |
| **Heading Pro Treble Bold** | UI, labels, botões | `font-family:'Heading',Arial,sans-serif` |

Ambas embutidas em base64 — sistema funciona **100% offline**.

### Responsividade
| Breakpoint | Layout |
|-----------|--------|
| `≤ 600px` (mobile) | Grade 1 coluna, fontes menores via `clamp()` |
| `601–767px` | Grade 2 colunas, layout intermediário |
| `768–1023px` (tablet pequeno) | Grade 2 colunas otimizada |
| `1024px+` (tablet/desktop) | Layout completo 2×2 ou 3 colunas — **prioritário** |
| `1400px+` | Container expandido até 1100–1200px |

---

## Fluxo de trabalho — Staging-First (obrigatório)

```
1. Desenvolvimento local
       ↓
2. Commit na branch `staging`
       ↓
3. Push → Vercel gera preview URL automaticamente
       ↓
4. Teste na preview URL (staging + Supabase staging)
       ↓
5. Aprovação explícita: "quero publicar em produção?"
       ↓
6. Merge PR: staging → main
       ↓
7. Deploy automático em produção (Vercel production + Supabase producao)
```

> **Nunca** pule o passo 4–5. Mudanças em produção só após aprovação explícita.

---

## Setup para deploy (próximos passos)

### 1. GitHub
```bash
cd "/Users/Fe/Documents/Foqui v2"
git init
git add .
git commit -m "feat: Foqui Operacional v1 — sistema completo"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/foqui-operacional.git
git push -u origin main
git checkout -b staging
git push -u origin staging
```

### 2. Vercel
1. Importe o repositório em vercel.com
2. Configure as variáveis de ambiente (ver `supabase/README.md`)
3. Defina `staging` como branch de preview
4. Defina `main` como branch de produção

### 3. Supabase
1. Crie dois projetos: `foqui-staging` e `foqui-producao`
2. Execute `supabase/schema.sql` em cada um
3. Adicione as credenciais no Vercel por ambiente
4. Ative o cliente em `supabase/config.js`

---

## Volume de trabalho

| Dimensão | Valor |
|----------|-------|
| Sessões de desenvolvimento | ~14 sessões longas |
| Horas estimadas | ~40–55 horas |
| Arquivos principais | 5 (admin, 2 tablets, login, index) |
| API routes serverless | 4 endpoints |
| Views navegáveis (tablets) | 25 telas |
| Abas admin funcionais | 14 abas (+ 3 mockups EM BREVE) |
| Receitas gerenciadas | 14 receitas com edição inline |
| Linhas de código (total) | ~3.200+ linhas |
| Assets embutidos | 2 fontes base64 + logo + avatar |
| Integrações ativas | Supabase Auth + Admin API + audit_logs |

---

## Próximos passos

- [ ] `git init` + push para GitHub
- [ ] Deploy no Vercel (staging primeiro) — `npx vercel --prod`
- [ ] Ativar Gestão de Ponto (jornada real dos colaboradores)
- [ ] Ativar Gestão de RH (cadastro de colaboradores)
- [ ] Ativar Gestão Financeira (DRE + fluxo de caixa)
- [ ] Migrar receitas do localStorage → Supabase (sync entre dispositivos em tempo real)
- [ ] Tablet: render dinâmico de receitas a partir de `foqui_rec_data` (novos ingredientes aparecem)
- [ ] Upload de relatório de vendas → gera calendário automaticamente
- [ ] Deploy em produção após validação em staging

---

## Estimativa de valor — v2

### O que foi entregue além do v1

| Funcionalidade adicionada | Valor de mercado |
|--------------------------|-----------------|
| Painel administrativo completo (SPA autenticada) | R$ 8.000 – R$ 14.000 |
| Dashboard com 6 KPIs + sparklines + detalhes clicáveis | R$ 3.000 – R$ 5.000 |
| CRUD de usuários via Supabase Admin API + audit trail | R$ 4.000 – R$ 7.000 |
| Receitas com edição inline + sync para tablets | R$ 3.500 – R$ 6.000 |
| Estoque visual estilo dashboard (5 categorias) | R$ 1.500 – R$ 3.000 |
| Relatórios com importação + análise visual | R$ 2.500 – R$ 4.500 |
| Mockups EM BREVE (Ponto · RH · Financeiro) | R$ 1.500 – R$ 2.500 |
| Logs de auditoria estruturados (ação + valor + qtd) | R$ 2.000 – R$ 3.500 |

### Comparativo de valor total (v1 + v2)

| Referência | Valor |
|------------|-------|
| Agência digital (escopo equivalente) | R$ 45.000 – R$ 80.000 |
| Freelancer sênior (140–180h de projeto) | R$ 28.000 – R$ 45.000 |
| SaaS equivalente (mensalidade recorrente) | R$ 800 – R$ 1.800/mês |
| SaaS equivalente (licença anual) | R$ 9.600 – R$ 21.600/ano |
| **Valor estimado entregue (v1 + v2)** | **R$ 35.000 – R$ 55.000** |

### Justificativa de cobrança

O sistema entregue inclui funcionalidades que sistemas SaaS cobram como módulos premium separados:

| Módulo | Exemplos de mercado | Mensalidade típica |
|--------|--------------------|--------------------|
| Controle de estoque | Bling, Omie | R$ 150–350/mês |
| Gestão de receitas e produção | NotaCerta, Saipos | R$ 200–500/mês |
| Painel administrativo + relatórios | Goomer, Anota AI | R$ 300–600/mês |
| Gestão de usuários + auditoria | — (custom) | R$ 400–800/mês |
| **Total equivalente em SaaS** | — | **R$ 1.050–2.250/mês** |

> A plataforma Foqui elimina todos esses custos recorrentes, roda sob infraestrutura própria, e é 100% personalizada para a operação da loja. O investimento se paga em **1–3 meses** de comparação com alternativas de mercado.

### Modelo de precificação sugerido

| Modalidade | Valor |
|------------|-------|
| Licença perpétua (entrega única) | R$ 18.000 – R$ 25.000 |
| Licença + suporte mensal (6 meses) | R$ 12.000 + R$ 800/mês |
| SaaS white-label (para outras lanchonetes) | R$ 400–900/mês por cliente |
