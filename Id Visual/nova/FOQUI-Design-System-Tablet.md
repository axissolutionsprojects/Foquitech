# FOQUI — Design System para Tablet
**Versão 1.0 · 30/10/2026 · Referência visual: quatro telas aprovadas**

Este documento transforma as referências visuais em regras implementáveis. O objetivo é reproduzir a linguagem visual das telas no produto real, sem usar as imagens de mockup como interface.

## 1. Princípios visuais

- **Formato prioritário:** tablet em orientação vertical (portrait).
- **Composição:** grandes containers com bastante respiro; cada container apresenta somente um resumo. O conteúdo completo aparece após o toque.
- **Identidade:** verde profundo como base contínua, rosa como cor de ação/destaque e creme para textos.
- **Hierarquia:** títulos serifados de presença; textos operacionais em sans-serif, fortes e legíveis.
- **Interação:** áreas clicáveis grandes, estados claros e feedback discreto.
- **Sem imagens decorativas de produtos** nas telas operacionais. Usar ícones lineares simples.

## 2. Formato e grid

As quatro imagens de referência foram entregues em **1024 × 1536 px**, proporção **2:3**. Essa é a proporção do canvas/mockup vertical aprovado.

| Alvo | Especificação |
|---|---|
| Canvas de referência | 1024 × 1536 px |
| Proporção | 2:3 (0,6667) |
| Orientação | Portrait / vertical |
| Área útil do app | ocupar a tela interna do tablet, respeitando safe areas |
| Largura de leitura | 100% da área útil, com margem lateral de 24–32 px em uma viewport de 1024 px |
| Scroll | vertical dentro do conteúdo; cabeçalho pode permanecer fixo |
| Touch target | mínimo 48 × 48 px; preferencial 56–64 px |

**Importante:** 1024 × 1536 é a dimensão das imagens de referência, não uma exigência de resolução física do aparelho. Implementar layout fluido com proporção do dispositivo preservada. Não travar a aplicação em pixels.

### Escala de espaçamento

Usar múltiplos de 4 px:

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}
```

- Margem lateral principal: `24px` (mínimo), `32px` em telas largas.
- Distância entre cards principais: `16–20px`.
- Padding interno dos cards: `24–32px`.
- Distância entre título e descrição: `8–12px`.
- Não comprimir cards para fazer caber todo o conteúdo; permitir rolagem.

## 3. Cores

A paleta abaixo é uma base operacional aproximada, derivada visualmente das referências. Centralizar todos os valores em tokens para permitir calibração fina após validação no dispositivo.

```css
:root {
  /* Fundos */
  --color-bg:             #003B2D; /* verde profundo, fundo contínuo */
  --color-bg-elevated:    #064B3A; /* superfície elevada */
  --color-card:           #07513F; /* container principal */
  --color-card-soft:      #0B5A45; /* superfície secundária */
  --color-card-inset:     #064334; /* linhas/listas internas */

  /* Marca e ação */
  --color-pink:           #F58AA8; /* rosa FOQUI */
  --color-pink-strong:    #FF8EAC; /* ação/seleção */
  --color-pink-soft:      rgba(245, 138, 168, .40); /* seleção translúcida */
  --color-cream:          #F7F0D9; /* texto principal */
  --color-cream-muted:    #D8DCC8; /* texto secundário */

  /* Estados */
  --color-success:        #8BE6B2;
  --color-warning:        #F3C65E;
  --color-danger:         #F58AA8;
  --color-info:           #77CBB5;

  /* Bordas */
  --color-border:         rgba(28, 180, 139, .34);
  --color-divider:        rgba(126, 207, 178, .22);
  --color-focus:          #FF9BB5;
}
```

### Regras de uso

- O fundo verde profundo deve permanecer em toda a experiência, inclusive nas telas de detalhe.
- Cards devem se destacar por uma pequena diferença de luminosidade, não por cores desconectadas.
- Rosa é usado para ações, quantidades relevantes, item selecionado e pequenos destaques.
- O creme é a cor principal de leitura.
- Verde-claro é reservado para sucesso/indicadores positivos, não para substituir o rosa na seleção.
- A seleção deve usar rosa translúcido com **40% de opacidade** como referência visual (`rgba(245,138,168,.40)`). Ajustar somente se a tela física alterar a percepção.
- Evitar bege/marrom opaco e grandes áreas claras.

## 4. Tipografia

A referência combina serifada editorial nos títulos de página e nomes de seção com sans-serif robusta na operação.

```css
:root {
  --font-display: Georgia, "Times New Roman", serif;
  --font-ui: Inter, "Segoe UI", Arial, sans-serif;

  --text-page-title: clamp(2.5rem, 5vw, 3.5rem);
  --text-card-title: clamp(1.65rem, 3vw, 2.15rem);
  --text-section: 1.25rem;
  --text-body: 1rem;
  --text-secondary: .9rem;
  --text-label: .75rem;
}
```

- Títulos de página: serifada, peso 700, creme.
- Títulos dos cards: serifada, peso 700.
- Nomes de receitas e ingredientes: sans-serif, peso 650–750.
- Descrições: sans-serif, peso 450–550.
- Labels auxiliares: caixa alta, tracking `0.12em`, peso 700.
- Quantidades em rosa, peso 800; usar números tabulares (`font-variant-numeric: tabular-nums`).

## 5. Formas, bordas e elevação

```css
:root {
  --radius-card: 24px;
  --radius-control: 16px;
  --radius-pill: 999px;
  --border-card: 1px solid var(--color-border);
  --shadow-card: 0 10px 28px rgba(0, 0, 0, .10);
}
```

- Cards principais: raio de 22–26 px, borda verde translúcida de 1 px.
- Botões circulares de navegação: 60–64 px.
- Controles de formulário: altura mínima de 56 px.
- Não usar sombras pesadas; a separação deve vir principalmente do contraste entre superfícies.
- Não usar gradientes chamativos nos cards. Fundo pode ter textura/gradiente muito sutil apenas no mockup, nunca necessário para a legibilidade do produto.

## 6. Componentes base

### 6.1 App shell

Estrutura comum a todas as telas:

1. Fundo verde profundo ocupando toda a área.
2. Cabeçalho com marca/avatar à esquerda quando aplicável.
3. Data e horário local em pill no topo à direita.
4. Área de conteúdo com scroll vertical.
5. Safe area superior/inferior respeitada.

A data deve ser dinâmica e localizada em `pt-BR`; não escrever a data como texto fixo.

### 6.2 Page header

- Botão voltar circular à esquerda nas telas internas.
- Título serifado.
- Subtítulo curto abaixo do título.
- Data/hora no topo à direita.
- O botão voltar deve ter área clicável mínima de 48 px.

### 6.3 Large navigation card

Usado na tela Hello e na entrada das áreas.

- Card amplo, sem fotografia.
- Ícone linear dentro de um quadrado de superfície ligeiramente mais clara.
- Título serifado grande.
- Descrição de uma linha ou duas.
- Indicador de navegação em círculo rosa.
- Estado selecionado: borda rosa e preenchimento rosa translúcido 40%.
- Card inteiro clicável, não apenas a seta.

### 6.4 Summary card

Usado na tela Produção (Receitas, Calendário, Estoque e Compras).

- Container grande, com título e ícone.
- Resumo de no máximo 3–5 informações essenciais.
- Quantidade ou status em destaque.
- Link/indicador para entrar.
- Não incluir imagens de produtos.
- Manter distância visual clara entre containers.

### 6.5 Recipe list card

Tela Receitas:

- Um card por receita.
- Nome da receita em serifada.
- Metadados em linhas curtas: programação, porções e conservação.
- Quantidade/meta em coluna própria à direita.
- Botão/seta rosa circular à direita.
- Card inteiro abre o detalhe.
- Não mostrar ingredientes na listagem.

### 6.6 Recipe detail card

Tela de detalhe:

- Nome da receita e badge do dia.
- Linha de metadados: frequência, rendimento e conservação.
- Bloco “Ingredientes” com ingrediente e quantidade alinhados.
- Ingrediente-base destacado com fundo verde translúcido.
- Abaixo, card separado “Ingrediente base”.
- Select para escolher ingrediente-base.
- Campo numérico para disponibilidade + unidade.
- Botão “Salvar” rosa.
- Em tablet, controles devem ter altura mínima de 56 px e espaçamento suficiente para toque.

### 6.7 Status indicators

- Em falta: rosa (`--color-danger`).
- Quase acabando: amarelo (`--color-warning`).
- OK: verde-claro (`--color-success`).
- Sempre combinar cor com texto/ícone; não depender somente da cor.

## 7. Navegação e conteúdo por tela

### Tela 01 — Hello

Duas opções centralizadas verticalmente no tablet:

- **Produção:** receitas, calendário, estoque e compras.
- **Finalização:** gestão de lanches, checklist/contagem/estoque e operação de finalização.

O cabeçalho deve exibir somente a data e hora local no canto superior direito. Não exibir “Bem-vindo”. Usar o avatar FOQUI no canto superior esquerdo conforme a referência. O card selecionado usa rosa translúcido a 40%.

### Tela 02 — Produção

Quatro containers grandes:

1. **Receitas** — principais receitas do dia vigente e quantidades planejadas.
2. **Calendário** — o que está programado para ser produzido naquele dia; não repetir a data no resumo.
3. **Estoque** — contagem resumida de itens em falta, quase acabando e OK.
4. **Compras** — breve lista de itens prioritários e quantidade; detalhes somente após entrar.

A tela deve priorizar leitura rápida. Não exibir fotos ou miniaturas de alimentos/produtos.

### Tela 03 — Receitas

Listagem de receitas programadas/necessárias:

- Nome.
- Dia ou regra de programação.
- Rendimento/porções.
- Tipo e prazo de conservação.
- Quantidade planejada, quando aplicável.

Não exibir ingredientes nesta tela. O usuário toca no card para abrir a receita completa.

### Tela 04 — Detalhe da receita

Exemplo de conteúdo: **Maionese de Bacon**.

- Metadados: “Toda quarta”, “42 porções”, “Refrigerado · 5 dias”.
- Ingredientes e quantidades.
- Ingrediente-base em destaque.
- Área de seleção do ingrediente-base, disponibilidade numérica e unidade.
- Botão Salvar.

O sistema deve preservar a seleção e a disponibilidade ao salvar e apresentar feedback de sucesso/erro.

## 8. Interação, estados e acessibilidade

- Estados de card: `default`, `pressed`, `selected`, `disabled`, `focus-visible`.
- Transição entre estados: 140–200 ms, `ease-out`.
- Pressed: reduzir levemente brilho/escala (`transform: scale(.99)`), sem deslocar o layout.
- Focus: outline de 2 px rosa com offset de 3 px.
- Contraste: texto principal deve manter contraste alto sobre verde escuro.
- Botões e cards precisam de rótulos acessíveis; ícones decorativos recebem `aria-hidden="true"`.
- Não comunicar estado apenas por cor.
- Inputs numéricos devem abrir teclado numérico no tablet.

## 9. Estrutura de componentes sugerida

```text
App
├── TabletAppShell
│   ├── AppHeader
│   │   ├── FoquiMark
│   │   └── LocalDateTime
│   └── PageContent
│       ├── HelloScreen
│       │   └── LargeNavigationCard × 2
│       ├── ProductionScreen
│       │   └── SummaryCard × 4
│       ├── RecipesScreen
│       │   └── RecipeListCard × N
│       └── RecipeDetailScreen
│           ├── RecipeMetadata
│           ├── IngredientList
│           └── BaseIngredientForm
```

## 10. CSS inicial para implementação

```css
* { box-sizing: border-box; }

html, body, #root {
  min-height: 100%;
  margin: 0;
  background: var(--color-bg);
}

body {
  color: var(--color-cream);
  font-family: var(--font-ui);
  -webkit-font-smoothing: antialiased;
}

.tablet-app {
  min-height: 100dvh;
  width: 100%;
  overflow: hidden;
  background: var(--color-bg);
  padding:
    max(env(safe-area-inset-top), 20px)
    max(env(safe-area-inset-right), 24px)
    max(env(safe-area-inset-bottom), 24px)
    max(env(safe-area-inset-left), 24px);
}

.page-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  gap: 20px;
  margin-bottom: 28px;
}

.page-title {
  margin: 0;
  color: var(--color-cream);
  font: 700 var(--text-page-title)/1.05 var(--font-display);
}

.page-subtitle {
  margin: 8px 0 0;
  color: var(--color-cream-muted);
  font: 500 1rem/1.4 var(--font-ui);
}

.card-stack {
  display: grid;
  gap: 18px;
}

.large-card {
  border: var(--border-card);
  border-radius: var(--radius-card);
  background: var(--color-card);
  padding: 28px;
  box-shadow: var(--shadow-card);
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    background-color 160ms ease-out,
    border-color 160ms ease-out,
    transform 160ms ease-out;
}

.large-card:active { transform: scale(.99); }

.large-card[aria-pressed="true"],
.large-card.is-selected {
  background: var(--color-pink-soft);
  border-color: var(--color-pink-strong);
}

.large-card:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

@media (max-width: 700px) {
  .tablet-app { padding: 16px; }
  .large-card { padding: 22px; }
  .card-stack { gap: 14px; }
}
```

## 11. Regras de responsividade

- O design de referência é portrait 2:3. Em outros tamanhos, preservar hierarquia e espaçamentos proporcionais, não a dimensão fixa.
- Não converter automaticamente para layout desktop horizontal.
- Se a altura disponível diminuir, manter cards em coluna e habilitar scroll.
- Se a largura for menor, reduzir padding gradualmente; nunca reduzir o alvo de toque abaixo de 48 px.
- A tela de detalhe pode rolar; o botão Salvar deve permanecer visível ao final do formulário.

## 12. Critérios de aceite visual

- [ ] Fundo verde profundo contínuo em todas as telas.
- [ ] Rosa FOQUI usado para ações e destaque; seleção em rosa translúcido (~40%).
- [ ] Títulos serifados e textos operacionais sans-serif.
- [ ] Containers grandes, limpos e com respiro.
- [ ] Nenhuma foto/miniatura de alimento nos painéis operacionais.
- [ ] Listagem de receitas sem ingredientes; ingredientes somente no detalhe.
- [ ] Quantidades alinhadas e fáceis de comparar.
- [ ] Controles confortáveis para toque em tablet.
- [ ] Data/hora dinâmica em `pt-BR`.
- [ ] Navegação de retorno consistente.

## 13. Assets SVG

Os SVGs que acompanham este documento são ícones vetoriais de interface, independentes de bibliotecas externas. Podem ser usados como `<img>`, `background-image` ou componentes inline. A marca FOQUI foi representada como um símbolo vetorial simplificado para uso provisório; substituir pelo arquivo oficial de marca caso exista um master vetorial aprovado.
