# SPEC — CampusGo (Aula 10)

## Objetivo
Criar um aplicativo novo em `praticas/campusGo` usando Expo Router, APIs nativas do dispositivo e JSONPlaceholder, conforme o enunciado da Atividade Prática CampusGo. O Gerenciador de Despesas 2.0 permanece separado.

## Regras de negócio
1. Quatro abas por arquivos: Início, Tarefas, Bolso e Perfil, com Ionicons e títulos em português.
2. Stack raiz: grupo de abas sem cabeçalho da pilha, detalhe `/task/[id]` exibindo `Tarefa número {id}`, modal `/new-task` com Fechar; ambos voltam com `router.back()`.
3. Bolso lê `expenses` pelo `useExpenses()` de `store/expenses-context.js`; soma `amount` por `reduce` e exibe duas casas decimais. Lista vazia equivale a zero. Compartilhar resumo usa `Share.share` com o total calculado.
4. Perfil permite foto por galeria ao tocar no avatar e foto por câmera; esta pede permissão antes de abrir. Permissão negada no dispositivo gera Alert com “Abrir ajustes” chamando `Linking.openSettings()`. Foto é guardada em AsyncStorage na chave `@profile-photo` e restaurada ao abrir.
5. “Estudei aqui” solicita localização em primeiro plano, converte as coordenadas em um rótulo aproximado e o exibe. Negação devolve `null` e informa o usuário sem crash.
6. “Lembrar em 10 s” agenda notificação local por `expo-notifications` com canal Android; push remoto é proibido. Navegador exibe indisponibilidade, sem simular sucesso.
7. “Concluir” dispara `Haptics.notificationAsync(Success)` e depois o Alert “Tarefa concluída”, mesmo se o dispositivo não vibrar.
8. Mural busca `posts?_limit=10` no JSONPlaceholder por `EXPO_PUBLIC_API_URL`, acessada apenas em `services/api.js`. HTTP não-OK lança erro. Estados: ActivityIndicator, erro com Tentar novamente, sucesso FlatList e estado vazio; `onRefresh` recarrega. Cards recebem FadeIn com Animated.
9. Bônus: criar POST de aviso com `{ title, body, userId: 1 }` e exibir id retornado; botão Concluir usa DoneIcon animado por `withSequence`/`withSpring`.
10. Browser não deve quebrar com recursos exclusivos de dispositivo. O comportamento móvel segue exigências do Expo Go.

## Entradas / saídas
- Entradas: URL no .env, JSON da API, lista local de despesas, imagem da galeria/câmera, permissões, identificador da rota, ações do usuário.
- Saídas: quatro telas navegáveis; detalhe 42; modal; soma e compartilhamento; foto persistente; rótulo de check-in; notificação local; alerta de conclusão; avisos ou erro recuperável; ID retornado ao criar aviso.

## Erros e bordas
- API offline, URL incorreta, HTTP não-OK: mostrar erro e permitir retry.
- API vazia: texto “Nenhum aviso”.
- Sem despesas: R$ 0,00 e compartilhamento consistente.
- Galeria cancelada: manter foto anterior.
- Permissões negadas: explicar, não abrir recurso proibido, manter tela funcional.
- Erro de storage, localização ou notificação: mostrar feedback sem tela vermelha.
- Recurso indisponível no navegador: informar claramente, sem fingir execução.
- Falha em feedback háptico: ainda mostrar o Alert de conclusão.

## Restrições
- Sem NavigationContainer, push remoto, URL hardcoded no código, .env no Git, node_modules no Git.
- Projeto separado do exercício anterior; incluir store copiado e seu utilitário necessário.
- Prioridade à rubrica; não implementar CRUD real de tarefas, autenticação ou backend próprio não pedidos.
- Sem testes automatizados, pois o professor não os solicitou. Validar manualmente seu roteiro de 14 passos.

## Critérios de aceite
Os 14 passos do “Roteiro de Verificação após a Entrega” no PDF devem passar, além dos bônus demonstrados. O professor deve poder copiar .env.example para .env, executar npm install e npx expo start. PR deve ter nome, matrícula, descrição de tarefas e capturas exigidas.
