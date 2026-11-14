# Produção02 — Especificação de Design System

## Objetivo
Tela inicial da área **Produção** do FOQUI. Apresenta quatro módulos grandes e clicáveis. Os detalhes operacionais só aparecem depois que o atendente entra em cada módulo.

## Estrutura
- Orientação: tablet vertical (portrait).
- Referência vetorial: `Producao02.svg`, viewBox `1024 × 1536` (2:3).
- Cabeçalho: avatar FOQUI à esquerda; data e horário local à direita.
- Título: **Produção**; apoio: “Selecione uma área para continuar.”
- Grade 2 × 2, com quatro cartões grandes e respiro generoso.
- Ordem: Receitas, Calendário, Estoque, Compras.
- No SVG, **Receitas** está no estado selecionado.

## Conteúdo dos cartões

| Módulo | Ícone | Subtítulo |
|---|---|---|
| Receitas | Chapéu de chef | Consulte as receitas do dia. |
| Calendário | Calendário | Acompanhe a programação de produção. |
| Estoque | Caixa | Verifique os níveis de produtos e insumos. |
| Compras | Carrinho | Consulte os itens que precisam ser comprados. |

Nesta tela não exibir fotografias, thumbnails, listas de produtos, tabelas ou quantidades detalhadas.

## Tokens de cor

| Token | Hex | Aplicação |
|---|---|---|
| `bg` | `#004B3B` | Fundo geral |
| `bg-deep` | `#003F32` | Variação escura do fundo |
| `surface` | `#064D3E` | Cartões não selecionados |
| `surface-icon` | `#0B604D` | Fundo do bloco de ícone |
| `border` | `#08715A` | Bordas dos cartões |
| `pink` | `#F58DA8` | Cartão selecionado |
| `pink-soft` | `#E77F9B` | Fundo do ícone selecionado |
| `cream` | `#FFF4DC` | Títulos e ícones padrão |
| `muted` | `#B6D6C9` | Subtítulos |
| `selected-ink` | `#004536` | Texto e ícone no cartão selecionado |

## Tipografia e forma
- Títulos de página e cartões: serifada editorial, peso 700 (Georgia ou equivalente).
- Textos de apoio: sans-serif (Inter, Arial ou equivalente).
- Cartões com raio amplo (24–30 px), borda fina e sem sombras pesadas.
- Ícones lineares, simples, com terminais arredondados; sem imagens de produtos.
- Seta circular à direita como reforço visual. O cartão inteiro é clicável.
- Espaçamento generoso entre cartões; não comprimir conteúdo.

## Estados

### Normal
- Fundo `surface`, borda `border`.
- Título/ícone `cream`; subtítulo `muted`.
- Bloco do ícone `surface-icon`.

### Selecionado
- Cartão inteiro preenchido com `pink`.
- Título, subtítulo, ícone e seta em `selected-ink`.
- Bloco do ícone pode usar `pink-soft` com transparência moderada.
- Não adicionar um círculo rosa independente como indicador de seleção.

## Interação
- Toque em qualquer ponto do cartão abre o módulo.
- O estado ativo deve ser refletido no cartão inteiro.
- A seta é decorativa/indicativa, não o único alvo de toque.
- Implementar como botão ou link semântico, com foco visível e área de toque confortável.

## Responsividade
- Priorizar tablets em orientação vertical.
- Preservar a grade 2 × 2 quando houver largura suficiente.
- Em viewports menores, reduzir paddings e tipografia proporcionalmente.
- Se faltar altura, permitir rolagem vertical; não reduzir os cartões a ponto de perder legibilidade.
- Respeitar safe areas do dispositivo.

## Acessibilidade
- Nome acessível de cada controle: “Abrir Receitas”, “Abrir Calendário”, “Abrir Estoque”, “Abrir Compras”.
- Usar `aria-current`, `aria-pressed` ou equivalente para indicar o cartão ativo.
- Não comunicar seleção apenas pela cor.
- Ícones decorativos devem ser ignorados por leitores de tela.

## Critérios de aceite
- [ ] Fundo verde escuro em toda a tela.
- [ ] Avatar no topo à esquerda e data/hora local no topo à direita.
- [ ] Exatamente quatro cartões grandes em grade 2 × 2.
- [ ] Cada cartão contém somente ícone, título, subtítulo e seta.
- [ ] Sem fotografias ou listagens nesta etapa.
- [ ] Seleção pinta o cartão inteiro de rosa e inverte textos/ícones para verde.
- [ ] Toque em qualquer área do cartão abre o respectivo módulo.

## Referência
`Producao02.svg` é o mockup vetorial de referência. Use-o para reproduzir cores, proporções, hierarquia e alinhamentos; implemente os elementos como componentes nativos para manter responsividade e interação.
