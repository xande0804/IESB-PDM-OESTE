# Atividade 4 — Navegação com React Navigation

Atividade da disciplina **Programação para Dispositivos Móveis (PDM)**, desenvolvida com **React Native** e **Expo**.

## Objetivo

Construir a estrutura de navegação de um aplicativo de controle de despesas usando **Bottom Tabs** e **Native Stack** do React Navigation, além de criar um componente reutilizável de botão com ícone.

> O foco desta atividade é a navegação entre telas. O cadastro e o armazenamento de despesas não fazem parte do escopo.

## Tecnologias utilizadas

- React Native e Expo (SDK 57)
- React Navigation: `@react-navigation/native`, `@react-navigation/bottom-tabs` e `@react-navigation/native-stack`
- `@expo/vector-icons` (Ionicons)
- `react-native-screens` e `react-native-safe-area-context`

## Estrutura do projeto

```text
Atividade-screen/
├── components/
│   └── IconButton.js
├── screens/
│   ├── DespesasRecentes.js
│   ├── TodasDespesas.js
│   └── GerenciarDespesa.js
├── App.js
├── app.json
├── index.js
├── package.json
└── package-lock.json
```

## Telas e navegação

O aplicativo é envolvido por um `NavigationContainer`. A navegação principal utiliza uma **Native Stack**, com as telas:

- **Despesas:** contém o navegador de abas e não exibe o cabeçalho da Stack.
- **GerenciarDespesa:** exibe o texto “Gerenciar Despesa” e permite retornar à tela anterior.

Dentro de **Despesas**, as **Bottom Tabs** apresentam:

| Tela | Título | Rótulo da aba | Ícone |
| --- | --- | --- | --- |
| `DespesasRecentes` | Despesas Recentes | Recentes | `hourglass` |
| `TodasDespesas` | Todas as Despesas | Todas | `wallet-outline` |

Os rótulos das abas utilizam tamanho de fonte **12**. Cada tela contém uma `View` com o texto de identificação centralizado.

O cabeçalho das duas abas apresenta um botão `+` que abre `GerenciarDespesa`. O componente reutilizável `IconButton`, criado em `components/IconButton.js`, recebe as propriedades `icon`, `size`, `color` e `onPress`, utiliza `Pressable` com `Ionicons` e aplica **opacidade 0,5** durante o pressionamento.

## Como executar

**Pré-requisitos:** Node.js e npm instalados.

No terminal, acesse a pasta do projeto e instale as dependências:

```bash
cd praticas/Atividade-screen
npm install
```

Inicie o Expo:

```bash
npx expo start
```

Para abrir no navegador, pressione `w` no terminal, ou execute:

```bash
npm run web
```

Para tentar abrir no Android, utilize o Expo Go compatível com a versão do projeto e escaneie o QR Code exibido pelo Expo. O computador e o celular devem conseguir se comunicar pela rede.

## Verificação funcional

A navegação foi **testada manualmente no Expo Web**, com os seguintes fluxos concluídos:

- [x] Alternar entre as abas **Recentes** e **Todas**.
- [x] Voltar à aba **Recentes**.
- [x] Abrir **Gerenciar Despesa** pelo botão `+` do cabeçalho.
- [x] Retornar de **Gerenciar Despesa** para as abas.

**Teste no Android:** pendente de validação; houve dificuldade de conexão com o Expo Go. Não foram executados testes automatizados.

## Evidências

As capturas de tela das abas **Despesas Recentes**, **Todas as Despesas** e da tela **Gerenciar Despesa** serão adicionadas antes da entrega.

## Organização da entrega

Desenvolvimento realizado na branch `feature/atividade-screen`, relacionado à [Issue #11](https://github.com/xande0804/IESB-PDM-OESTE/issues/11). A entrega será feita por Pull Request para a branch `main`.
