# WORKFLOW v1 Oficial — Foqui Sanduíches · Painel Operacional

**Versão:** 1.0  
**Data:** 31/10/2026  
**Status:** Produção local · Staging/Deploy pendente

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

### Painéis tablet (operacional — uso diário)
| Arquivo | Rota Vercel | Função |
|---------|-------------|--------|
| `index.html` | `/` | Tela de entrada — seleciona Produção ou Finalização |
| `producao-tablet.html` | `/producao` | Painel de Produção — receitas, calendário, estoque, compras |
| `finalizacao-tablet.html` | `/finalizacao` | Painel de Finalização — checklist, contagem, estoque |

### Infra e configuração
| Arquivo | Função |
|---------|--------|
| `vercel.json` | Configuração de deploy e rotas |
| `.env.example` | Template de variáveis de ambiente |
| `.gitignore` | Exclusões do repositório |
| `supabase/schema.sql` | Schema do banco de dados |
| `supabase/config.js` | Cliente Supabase (pronto para ativar) |
| `supabase/README.md` | Instruções de setup do banco |

### Assets e documentação
| Pasta | Conteúdo |
|-------|---------|
| `Id Visual/` | Design System oficial, fontes, logo, paleta |
| `assets/icons/` | Ícones SVG inline |
| `TELAS/` | Mockups PNG 1024×1536px de todas as 25 telas |
| `Docs base/` | Relatório de vendas, rendimentos, livro de receitas |

---

## Funcionalidades entregues

### Produção (25 views navegáveis)
- **Home 2×2** — 4 módulos em grade, navegação por toque, card selecionado em rosa
- **Receitas** — grade responsiva, 15 receitas com card navegável
- **Detalhe de receita** — tabela de ingredientes + calculadora proporcional em tempo real
  - Selecionar qualquer ingrediente como base → todos os outros recalculados
  - Botão Salvar com feedback visual
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
| Sessões de desenvolvimento | ~8 sessões longas |
| Horas estimadas | ~22–28 horas |
| Arquivos HTML (SPAs) | 3 arquivos principais |
| Views navegáveis | 25 telas |
| Receitas com calculadora | 15 receitas |
| Linhas de código (total) | ~1.700 linhas |
| Assets embutidos | 2 fontes base64 + logo SVG + ícones |
| Mockups gerados | 25 PNGs @ 1024×1536px |

---

## Próximos passos

- [ ] `git init` + push para GitHub
- [ ] Deploy no Vercel (staging primeiro)
- [ ] Criar projetos Supabase (staging e produção)
- [ ] Executar schema.sql nos dois projetos
- [ ] Migrar localStorage → Supabase (estoque, checklist, contagem)
- [ ] Autenticação por colaborador (Supabase Auth)
- [ ] Upload de relatório de vendas → calendário gerado automaticamente
- [ ] Checklist de limpeza com rodízio entre áreas
- [ ] Histórico diário de produção (log)
- [ ] Deploy em produção após validação em staging

---

## Estimativa de valor

| Referência | Valor |
|------------|-------|
| Agência digital (escopo equivalente) | R$ 18.000 – R$ 35.000 |
| Freelancer sênior (80–100h) | R$ 12.000 – R$ 20.000 |
| SaaS equivalente (mensalidade) | R$ 400 – R$ 900/mês |
| **Valor estimado entregue** | **R$ 15.000 – R$ 22.000** |
