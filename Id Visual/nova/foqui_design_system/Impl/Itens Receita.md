# FOQUI — Itens Receita

Especificação de implementação da tela de seleção de receitas para tablet.

## Arquivo de referência
- `Itens Receita.svg` — composição vetorial de referência.
- ViewBox: `1024 × 1536 px`
- Proporção: `2:3` (tablet em orientação retrato).

## Objetivo da tela
Apresentar as receitas disponíveis de forma rápida e visualmente limpa. O atendente escolhe uma receita tocando em seu cartão; somente na tela seguinte são exibidos ingredientes, quantidades, conservação e controles de disponibilidade.

## Estrutura
1. **Cabeçalho**
   - Marca FOQUI no canto superior esquerdo.
   - Data e horário local no canto superior direito.
2. **Navegação e título**
   - Botão de voltar.
   - Título `Receitas`.
   - Texto auxiliar: `Selecione uma receita para consultar os detalhes.`
3. **Grade de receitas**
   - Três colunas.
   - Cartões grandes, com espaçamento generoso.
   - Ordenação alfabética pelo nome da receita.
   - O cartão contém exclusivamente o nome da receita.

## Conteúdo demonstrativo
- Cogumelo Refogado
- Frango Grelhado
- Maionese de Alho
- Maionese de Bacon
- Maionese de Limão Siciliano
- Maionese de Pesto
- Maionese de Tomate Seco
- Mignon
- Pão de Queijo

A lista deve ser alimentada pelos dados reais do sistema e permanecer em ordem alfabética. Os nomes acima são conteúdo de demonstração da composição.

## Regras visuais obrigatórias
- Manter o fundo verde escuro em toda a tela.
- Não usar fotografias ou ilustrações de produtos.
- Não incluir ícones dentro dos cartões.
- Não incluir subtítulos, datas, quantidades, indicadores, badges ou botões de ação dentro dos cartões.
- Não adicionar um botão circular rosa separado.
- O cartão inteiro é a área clicável.
- Usar respiro amplo entre cartões e margens consistentes.

## Tokens de cor

| Token | Hex | Uso |
|---|---|---|
| `foqui.screen` | `#003C2F` | Fundo principal |
| `foqui.surface` | `#064F3D` | Cartões não selecionados |
| `foqui.surface-border` | `#08745C` | Contorno dos cartões |
| `foqui.pink` | `#F58BAA` | Cartão selecionado |
| `foqui.cream` | `#F7EAD2` | Texto em superfícies verdes |
| `foqui.green-ink` | `#004735` | Texto no cartão rosa |
| `foqui.muted` | `#A8C9BB` | Texto auxiliar |

## Estado de seleção
- **Padrão:** cartão verde escuro, borda verde e nome em bege claro.
- **Selecionado:** todo o cartão fica rosa (`#F58BAA`) e o nome passa a verde escuro (`#004735`).
- A seleção não altera o tamanho, a posição ou a tipografia do cartão.
- O cartão selecionado deve ter contraste suficiente e não depender apenas de um pequeno ícone ou marcador.

O SVG demonstra o estado selecionado usando `Maionese de Bacon`. Em produção, o estado deve refletir a interação real do atendente, sem pré-selecionar uma receita por padrão.

## Dimensões e espaçamento de referência
- Canvas lógico: `1024 × 1536`.
- Grade: 3 colunas.
- Largura de cartão no SVG: `236 px`.
- Altura de cartão no SVG: `226 px`.
- Espaçamento horizontal: `32 px`.
- Espaçamento vertical: `24 px`.
- Raio dos cartões: `24 px`.
- Margem lateral da grade: `126 px`.

Os valores devem escalar proporcionalmente com o viewport, preservando a composição em tablets 2:3. Em telas menores, permitir rolagem vertical; não reduzir a grade para duas colunas sem uma decisão explícita de responsividade.

## Tipografia
- Título da página: serifada de alto contraste, peso 700.
- Nome das receitas: serifada, peso 700.
- Texto auxiliar e data: sans-serif.
- Manter os nomes centralizados vertical e horizontalmente nos cartões.
- Para nomes longos, permitir quebra em até duas linhas; não truncar nem reduzir excessivamente o tamanho.

## Interação
- Tocar em qualquer ponto do cartão abre a tela de detalhes da receita correspondente.
- O botão de voltar retorna à tela anterior.
- A grade deve aceitar rolagem vertical quando houver mais receitas que o espaço disponível.
- Usar área de toque integral no cartão e feedback de seleção consistente com o estado rosa.

## Acessibilidade e implementação
- Cada cartão deve ser um elemento interativo semântico (`button` ou equivalente).
- Disponibilizar o nome completo da receita para leitores de tela.
- Garantir contraste entre texto bege/verde e os respectivos fundos.
- A ordem de foco deve seguir a ordem alfabética da grade.
- Não usar o SVG como imagem de fundo da aplicação: reconstruir os elementos com componentes nativos e usar o SVG como referência visual.

## Critérios de aceite
- [ ] Tablet em retrato, proporção 2:3.
- [ ] Fundo verde escuro contínuo.
- [ ] Receitas em ordem alfabética.
- [ ] Exatamente três colunas no layout de referência.
- [ ] Cartões grandes e com respiro.
- [ ] Cartões exibem somente o nome da receita.
- [ ] Nenhuma foto, ícone, subtítulo, quantidade ou botão rosa nos cartões.
- [ ] Seleção colore o cartão inteiro de rosa e inverte o texto para verde.
- [ ] Toque no cartão abre a receita completa.
