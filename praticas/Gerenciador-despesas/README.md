# Gerenciador de despesas

Atividade prática de Desenvolvimento Mobile baseada na Aula 08 do professor José Alberto S. Torres. O aplicativo amplia o controle de despesas com categorização e filtro dinâmico, mantendo a organização em telas e componentes reutilizáveis.

## Funcionalidades

- Cadastro, edição e exclusão de despesas.
- Campos: descrição, valor, data e categoria.
- Categorias: Alimentação, Transporte, Lazer e Contas.
- Abas Todas e Recentes, com navegação Bottom Tabs e Native Stack.
- Recentes: intervalo inclusivo entre o momento atual menos sete dias e o momento atual, sem despesas futuras.
- Filtro por categoria com `.filter()`, aplicado à lista e ao total.
- Listagem com `FlatList` e `keyExtractor` pelo identificador.
- Somatório com `.reduce()`, exibido com R$ e `.toFixed(2)`.
- Categoria destacada visualmente em cada item.
- Bônus: total vermelho somente quando ultrapassa R$ 200,00.

## Formulário e regras

O formulário utiliza `useState`, `TextInput` com `keyboardType="decimal-pad"` e `@react-native-community/datetimepicker`.

A expressão regular `/^\d*\.?\d{0,2}$/` limita a entrada a duas casas decimais. Vírgula é convertida para ponto; entradas inválidas preservam o valor anterior. O campo possui limite de dez caracteres.

Descrição e categoria são obrigatórias; o valor deve ser numérico e maior que zero. Cancelar não altera os registros. O aplicativo começa vazio e mantém os dados em memória: reiniciar ou recarregar o aplicativo limpa os registros.

## Organização

| Local | Responsabilidade |
| --- | --- |
| App.js | Estado das despesas e navegação |
| screens/TodasDespesas.js | Listagem e filtro de todas as despesas |
| screens/DespesasRecentes.js | Filtros de período e categoria |
| screens/GerenciarDespesa.js | Cadastro, edição e exclusão |
| components/IconButton.js | Botão reutilizável com ícone |
| components/despesa/DespesaItem.js | Apresentação de uma despesa |
| components/despesa/DespesaLista.js | FlatList |
| components/despesa/DespesaSaida.js | Composição da lista e do sumário |
| components/despesa/DespesaSumario.js | Total e indicador do bônus |
| components/despesa/FiltroCategoria.js | Seleção do filtro |
| utils/despesas.js | Regras de validação, filtragem e soma |
| tests/despesas.test.js | Testes automatizados das regras |

## Executar

Na raiz do repositório:

```bash
cd praticas/Gerenciador-despesas
npm ci
npx expo start
```

Para abrir a versão web:

```bash
npx expo start --web
```

O seletor de data utilizado na aula é nativo e não oferece seleção de data na versão web. Sua interação precisa ser verificada em Android/iOS.

## Testes

```bash
node --test tests/despesas.test.js
npx expo-doctor
```

Os nove testes automatizados cobrem conversão de vírgula, limpeza do campo, Regex, campos obrigatórios, valor zero, categorias, limites do intervalo recente, soma e limite do bônus.

### Validação realizada

- Testes automatizados aprovados no computador da faculdade.
- Expo Doctor: 21/21 verificações aprovadas após instalar expo-font.
- Validação manual na web realizada pelo aluno: cadastro, edição, exclusão, filtro por categoria, total, campos vazios, valor zero e bônus nos limites R$ 200,00 e R$ 200,01.

### Verificações pendentes

- Interação do DateTimePicker em Android/iOS.
- Lint e verificação de tipos não executados; o projeto atual usa JavaScript e não inclui configuração dessas ferramentas.

## Tecnologias

React Native, Expo SDK 57, React, React Navigation, Ionicons e DateTimePicker.
