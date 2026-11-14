# Briefing visual: painel Foqui

Leia este arquivo inteiro antes de criar ou alterar qualquer tela. Todos os caminhos abaixo são relativos à pasta `Foqui v2`.

## Regra principal
O app é a tela em tela cheia, sem moldura de dispositivo. As imagens em `Telas DS/` mostram a tela dentro de um tablet apenas como apresentação: **não reproduzir o frame do tablet nem o fundo do mockup**. Aplicar a identidade da marca Foqui (`Id Visual/`) sobre a estrutura dessas telas.

## Telas de referência (`Telas DS/`)
| Arquivo | Tela | Conteúdo |
|---|---|---|
| `Tela Hello 01.png` | Início | Logo, pílula de data, dois cards: Produção e Finalização |
| `Produção 02.png` | Produção | Voltar + título; quatro cards: Receitas, Calendário, Estoque, Compras, com métricas |
| `Tela Receitas 03.png` | Lista de receitas | Cards com nome, dia, porções, validade e contador de unidades |
| `Tela Receita 04.png` | Detalhe da receita | Metadados, tabela de ingredientes, formulário "Ingrediente base" com Salvar |

Os textos e números nas telas são exemplos. Preservar a estrutura e a hierarquia, não os dados.

## Paleta oficial (`Id Visual/CORES/FOQUI-CORES.pdf`)
Usar exatamente estes valores. Não estimar nem amostrar pixel das imagens.

| Token | Hex | RGB | Uso |
|---|---|---|---|
| `--foqui-verde` | #05594c | 5, 89, 76 | Fundo principal, cards |
| `--foqui-rosa` | #f3a0b2 | 235, 152, 171 | Logo, botões de ação, destaques, quantidades |
| `--foqui-creme` | #ffe8c7 | 255, 232, 199 | Títulos, ícones, texto principal |
| `--foqui-areia` | #ebd1a4 | 235, 209, 164 | Texto secundário, rótulos, detalhes |
| `--foqui-grafite` | #272526 | 39, 37, 38 | Texto sobre rosa/creme, elementos escuros |

Derivados (sempre a partir da paleta, por opacidade ou mistura; não criar cores novas):
- Fundo de card: verde um pouco mais escuro ou mais claro que o fundo, com borda fina translúcida em creme ou verde claro.
- Card Finalização: rosa em baixa opacidade sobre o verde, borda rosa.
- Pílula de data: sem preenchimento sólido, borda fina, texto creme.
- Botão de seta e "Salvar": rosa com ícone/texto grafite.

Cores de status (não existem no manual, confirmar com o cliente antes de fixar):
- Em falta: rosa
- Quase acabando: amarelo quente (a definir)
- OK: verde claro (a definir)

## Tipografia (`Id Visual/FONTES/`)
Fontes oficiais disponíveis. Carregar via `@font-face` a partir desta pasta.

| Arquivo | Família | Uso no app |
|---|---|---|
| `OhnoBlazeface-12Point.ttf` | Ohno Blazeface | Títulos de tela e de card (Produção, Receitas, Maionese de Bacon) |
| `heading-pro-treble-bold.ttf` | Heading Pro Treble Bold | Rótulos, botões, números de destaque, pílula de data |
| `Gardez-ExtraBoldItalic.otf` | Gardez ExtraBold Italic | Só como acento de marca (frases tipo "Feito com focaccia artesanal"); não usar em UI |

Pendência: só existe o peso **Bold** da Heading Pro Treble. Para texto corrido e descrições em peso regular, usar uma sans geométrica de fallback próxima (ex.: Manrope ou Inter, peso 400) até o cliente fornecer o peso regular.

Abra os arquivos de fonte e confira o visual antes de aplicar. Se a correspondência acima não fizer sentido com o desenho das fontes, avise em vez de inventar.

## Logo (`Id Visual/LOGO/`)
- Logo do app: starburst rosa com "F" recortado. Usar os PNGs prontos, nunca redesenhar nem digitar o logotipo com fonte.
  - Avatar: `LOGO/AVATAR/PNG/AVATAR-LOGO-1.png` a `-4.png` (variações de cor; escolher a que é rosa sobre transparente ou rosa sobre verde)
  - Selo: `LOGO/AVATAR-SELO/PNG/`
  - Logotipo "FOQUI Yourself" sem fundo: `LOGO/LOGOTIPO TRANSPARENTE/PNG/`
- Se possível, converter o logo para SVG a partir do `.ai`/`.pdf` para nitidez em telas retina.

## Elementos de marca (`Id Visual/ELEMENTOS/`)
- `ELEMENTOS VISUAIS/{ROSA,VERDE,OFFWHITE}/PNG/`: ilustrações de linha (mão com sanduíche, gesto "snap" Foqui yourself, copo, sanduíche), selo "OMF! Oh My Foqui", tag "Feito com focaccia artesanal", estrelas de 4 pontas. Usar a versão ROSA ou OFFWHITE sobre fundo verde.
- `PATTERN/PNG/`: padrão repetido da marca. Usar só em splash, tela de login ou estados vazios, nunca atrás de conteúdo com dados.
- `BACKGROUND/`: fundos prontos da marca, mesma regra do pattern.
- `SELOS DIGITAL/PNG/`: selos para destaques pontuais.
- Ícones de interface (chef-hat, calendário, caixa, carrinho, relógio, talheres, floco de neve, setas): usar ícones de linha consistentes (ex.: Lucide), traço arredondado, cor creme, para combinar com o estilo de contorno das ilustrações.

## Componentes
- **Cabeçalho:** logo à esquerda, pílula de data à direita. Telas internas: botão circular "Voltar" à esquerda do título.
- **Card de módulo:** quadrado arredondado de ícone à esquerda, título em Ohno Blazeface, descrição sans, botão circular rosa com chevron à direita, métricas na parte de baixo separadas por divisórias finas.
- **Card de receita:** nome, metadados com ícones (dia, porções, validade), contador grande em rosa à direita, botão de seta.
- **Tabela de ingredientes:** linhas com divisória fina; nome em creme à esquerda, quantidade em rosa à direita; linha selecionada com fundo levemente destacado.
- **Formulário:** select e input com borda fina e cantos arredondados; botão "Salvar" rosa, texto grafite.
- **Forma:** cantos generosos nos cards (~24px), pílulas totalmente arredondadas, sombras discretas.

## Arquivos existentes
A pasta já contém `index.html`, `producao.html`, `finalizacao.html`, versões `-tablet.html`, `painel.html`, `design-system-mockups.html` e SVGs de mockup. Antes de criar arquivos novos, verifique qual deles é a versão atual e altere esse arquivo em vez de duplicar.

## Verificação
1. Renderizar com Playwright em proporção de tablet (ex.: 820×1180 e 1024×1366).
2. Comparar lado a lado com a tela correspondente em `Telas DS/`.
3. Listar as diferenças antes de corrigir, uma tela por vez.
4. Conferir que todas as cores usadas estão na tabela de hex e que as fontes carregaram (sem fallback acidental nos títulos).
