# Gerenciador de Despesas 2.0

Atividade prática da **Aula 09 — Estado Global, Formulários e UX**, de Programação para Dispositivos Móveis, com base nas Aulas 07 e 08.

## O que o aplicativo faz

- Cadastrar, editar e excluir despesas com descrição, valor, data e categoria.
- Exibir **Todas** e **Recentes** (últimos sete dias), com quantidade de despesas e total calculado.
- Guardar dados em um estado global com **Context API e useReducer**, usando as ações ADD, UPDATE, DELETE e SET.
- Salvar as despesas no **AsyncStorage** (`@expenses`) e recuperá-las quando o aplicativo abrir novamente.
- Validar o formulário: descrição com três ou mais caracteres, valor positivo, data que não seja futura e categoria obrigatória.
- Mostrar as mensagens específicas ao lado dos campos inválidos, selecionar categoria em um Modal e manter o botão Salvar acessível com teclado aberto.
- Pesquisar despesas por descrição sem diferenciar maiúsculas/minúsculas, usando `useDebounce` (400 ms) e `useMemo`.
- Mostrar estado vazio com orientação e acompanhar o tema claro/escuro do sistema.

### Três bônus da atividade

1. **Filtro de categoria:** chips acima da lista, combinados com a busca; total e quantidade são recalculados.
2. **Limpar tudo:** botão com confirmação antes de excluir todas as despesas.
3. **Layout responsivo:** acima de 600 px são duas colunas; em 600 px ou menos, uma coluna.

## Organização

```text
App.js
src/
  components/
    IconButton.js
    DateInput.js
    DateInput.web.js
    despesa/
      DespesaItem.js
      DespesaLista.js
      DespesaSaida.js
      DespesaSumario.js
      FiltroCategoria.js
  constants/theme.js
  hooks/useDebounce.js
  screens/
    DespesasRecentes.js
    TodasDespesas.js
    GerenciarDespesa.js
  store/expenses-context.js
  utils/expenses.js
```

## Como executar

Na pasta `praticas/Gerenciador-despesas-2.0`:

```bash
npm install
npx expo install expo-system-ui
npx expo start -c
```

Para abrir no celular, utilizar o **Expo Go** e ler o QR Code que aparece no terminal. Para abrir no navegador, pressionar `w` no terminal.

O `expo-system-ui` garante o suporte à configuração de tema automático no Android. Depois de instalá-lo, é necessário versionar as mudanças em `package.json` e `package-lock.json`.

## Regras e tecnologias

Modelo de despesa: `{ id, description, amount, date, category }`.

Categorias: **Alimentação, Transporte, Material e Outros**. Valor admite ponto ou vírgula e no máximo duas casas decimais. A edição mantém o identificador original; a exclusão pede confirmação. Dados salvos em JSON têm as datas convertidas novamente para objetos `Date` na leitura.

O projeto usa React Native, Expo SDK 57, React Navigation (Bottom Tabs + Native Stack), Ionicons, DateTimePicker, Context API, useReducer e AsyncStorage. No **Expo Web**, a data pode ser escolhida por um campo de calendário do navegador (`DateInput.web.js`); no **Expo Go/Android/iOS**, continua usando o DateTimePicker nativo (`DateInput.js`). Não utiliza bibliotecas prontas de gerenciamento de estado ou formulário.

## Evidências para a entrega

Salvar as capturas na pasta `prints/` dentro deste projeto:

| Arquivo | O que demonstra |
| --- | --- |
| `tema-claro.png` | Lista de despesas no modo claro |
| `tema-escuro.png` | Lista de despesas no modo escuro |
| `formulario-erros.png` | Formulário com mensagens por campo, sem salvar dados inválidos |
| `editar-despesa.png` | Formulário preenchido em modo de edição |
| `busca-filtros.png` | Filtro por categoria combinado com busca e sumário |
| `limpar-tudo.png` | Confirmação antes de limpar todas as despesas |
| `apos-limpar-tudo.png` | Estado vazio após confirmar a limpeza |
| `layout-responsivo.png` | Lista com duas colunas em largura superior a 600 px |

As capturas devem constar também na descrição do Pull Request, com nome e matrícula do aluno.

## Validação da entrega

O roteiro da atividade contém 14 verificações manuais, além dos três bônus. Antes de concluir a entrega, conferir: primeiro acesso vazio, validações por campo, cadastro, edição, exclusão, busca, persistência após reabrir, tema claro/escuro, cards com sombra, filtro combinado, limpeza com confirmação e responsividade.
