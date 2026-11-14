# Lista Receita — Especificação de implementação

## Objetivo
Tela de seleção de receitas do módulo **Produção**, otimizada para tablet em orientação vertical. O atendente escolhe uma receita tocando em um container; os detalhes completos aparecem somente na tela seguinte.

## Estrutura da tela
1. **Cabeçalho**
   - Botão circular de retorno com seta e rótulo “Voltar”.
   - Data e dia da semana alinhados à direita.
2. **Título**
   - Título: `Receitas`.
   - Subtítulo: `Escolha uma receita para visualizar.`
3. **Grade**
   - 3 colunas.
   - Containers de mesmo tamanho, com espaçamento uniforme.
   - Apenas o nome da receita; sem ícones, imagens, quantidades, subtítulos ou botões adicionais.
   - Nomes centralizados horizontal e verticalmente.
   - A grade deve permitir rolagem vertical em telas com altura útil menor.

## Ordem alfabética dos itens
A ordenação deve ser aplicada aos nomes completos, ignorando diferenças entre maiúsculas e minúsculas:

1. Cogumelo Refogado
2. Frango Grelhado
3. Maionese de Alho
4. Maionese de Bacon
5. Maionese de Limão Siciliano
6. Maionese de Pesto
7. Maionese de Tomate Seco
8. Mignon
9. Molho de Alho
10. Molho Shoyu
11. Pão de Queijo
12. Pernil Desfiado

## Comportamento de seleção
- Cada container é uma área clicável completa.
- Ao selecionar uma receita, o container inteiro recebe o preenchimento rosa.
- No estado selecionado, o texto muda para verde escuro para manter contraste.
- Os demais containers permanecem verdes, com texto em creme.
- Não adicionar círculo, marcador, botão rosa ou ícone para indicar seleção.
- Ao tocar em uma receita, navegar para a tela de detalhes correspondente.
- A seleção rosa deve representar o item atualmente selecionado/ativo.

## Design tokens

| Token | Valor | Aplicação |
|---|---|---|
| `color.screen` | `#004D3A` → `#003C2E` | Fundo interno em gradiente |
| `color.card` | `#004A38` → `#003D30` | Containers não selecionados |
| `color.card.border` | `#08765A` | Borda dos containers |
| `color.selected` | `#FF9BAD` → `#F78BA2` | Container selecionado |
| `color.text.primary` | `#FFF8ED` | Texto dos containers normais |
| `color.text.selected` | `#004632` | Texto do container selecionado |
| `color.text.secondary` | `#C2D9CA` | Subtítulo e informações auxiliares |
| `color.accent.border` | `#00765A` | Contorno do campo de data |
| `radius.card` | `23px` no SVG de referência | Cantos dos containers |
| `radius.date` | `34px` no SVG de referência | Campo de data |

## Tipografia
- **Título da página:** serifada, peso 700, grande (referência: Georgia/Times New Roman).
- **Nome das receitas:** serifada, peso 700, centralizada (referência: Georgia/Times New Roman).
- **Subtítulo, data e retorno:** sans-serif (referência: Arial), peso regular.
- Permitir quebra de linha natural para nomes longos, sem reduzir excessivamente o tamanho da fonte.

## Layout e responsividade
- A referência SVG usa `1024 × 1536` (proporção 2:3) para representar o tablet vertical.
- O SVG inclui a moldura do dispositivo para documentação visual. Na implementação real, construir a interface dentro da área útil do app, sem depender da moldura ilustrativa.
- Manter três colunas em tablet vertical. Ajustar margens e espaçamentos proporcionalmente à largura disponível.
- Em alturas menores, preservar o cabeçalho e permitir rolagem apenas na área da grade.
- Evitar que o conteúdo fique encostado nas bordas internas do tablet.

## Acessibilidade e interação
- Cada container deve ser um botão acessível com o nome completo da receita como rótulo.
- Indicar o estado selecionado com `aria-pressed` ou semântica equivalente.
- Garantir contraste adequado entre texto e fundo nos estados normal e selecionado.
- Disponibilizar foco visível para navegação por teclado, sem alterar a estética padrão em repouso.

## Critérios de aceite
- [ ] Exibir exatamente 12 receitas na ordem alfabética acima.
- [ ] Exibir três containers por linha.
- [ ] Mostrar somente o nome em cada container.
- [ ] Não exibir ícones, fotos, números, subtítulos ou botões internos.
- [ ] Seleção aplica rosa ao container inteiro e verde escuro ao texto.
- [ ] Containers não selecionados permanecem verdes com texto creme.
- [ ] Tocar em um container abre a respectiva tela de detalhes.
- [ ] Layout funciona em tablet vertical e permite rolagem quando necessário.

## Arquivo visual
O arquivo `Lista Receita.svg` acompanha este documento e deve ser usado como referência visual estática para cores, proporções, espaçamentos, tipografia e estados de seleção.
