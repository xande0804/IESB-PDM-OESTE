# CampusGo — Aula 10 (PDM)

Aplicativo React Native / Expo Router para a Atividade Prática CampusGo, disciplina Programação para Dispositivos Móveis.

**Pasta:** `praticas/campusGo` | **Branch:** `feature/campus-go`

## Rodar
Requer Node.js 22.13+ e Expo SDK 57. Use uma versão do Expo Go compatível com o SDK 57; o aplicativo móvel não foi validado apenas pelos testes no navegador.

```bash
git fetch origin
git switch feature/campus-go
cd praticas/campusGo
cp .env.example .env
npm install
npx expo install --check
npx expo start --clear
```

No Windows PowerShell, troque `cp .env.example .env` por `Copy-Item .env.example .env`. Para testar no navegador, pressione `w` ou execute `npm run web`. Para abrir no Expo Go, use a versão compatível com o SDK 57 e o QR code. Se o Expo avisar sobre versões incompatíveis, execute `npx expo install --fix`, reinicie o servidor e atualize os arquivos de dependências no Git antes de entregar.

## Funcionalidades
- Expo Router com abas Início, Tarefas, Bolso e Perfil, detalhe dinâmico da tarefa 42 e modal Nova tarefa.
- Bolso reaproveita o contexto de despesas da Aula 09 e permite compartilhar resumo.
- Perfil permite selecionar foto da galeria ou câmera, com persistência em AsyncStorage.
- Check-in com `expo-location`, lembrete local em 10 s, feedback háptico ao concluir.
- Mural com 10 avisos via JSONPlaceholder, carregamento, erro/retentativa, atualização e FadeIn.
- **Bônus:** criar aviso (POST, simulado pelo JSONPlaceholder) e DoneIcon com Reanimated.

## Verificações manuais do professor
1. Abrir quatro abas e conferir os ícones.
2. Tarefas > Nova tarefa > Fechar.
3. Abrir tarefa 42 e verificar a identificação.
4. Bolso > Compartilhar resumo (valor correto).
5. Perfil > foto da galeria.
6. Fechar completamente e reabrir (foto preservada).
7. Negar câmera (Alert com Abrir ajustes).
8. Tarefas > Estudei aqui (rótulo ou aviso).
9. Tarefas > Lembrar em 10 s (notificação local).
10. Tarefas > Concluir (Alert; vibração quando disponível).
11. Início carrega 10 avisos com FadeIn.
12. Arrastar lista para atualizar.
13. Modificar .env para URL inválida e reiniciar (erro com Tentar novamente).
14. Restaurar URL e acionar Tentar novamente (sucesso sem erro vermelho).

**Nota sobre o Expo Web:** o navegador não garante a notificação nativa nem os mesmos prompts de permissões. Esses itens exigem verificação física no Expo Go. Não confunda mensagens de indisponibilidade na Web com testes nativos concluídos.

**Para a entrega:** anexar prints das quatro abas, detalhe 42, modal, Bolso/compartilhar, Perfil/foto, check-in, mural e erro. Não comitar .env nem node_modules.

## Identificação e entrega
- **Aluno:** Alexandre Gomes da Silva
- **Matrícula:** 25114290062
- **Disciplina:** Programação para Dispositivos Móveis — Aula 10
- **Professor:** Marcelo Alves Farias
- **Pull request:** [#17 — CampusGo](https://github.com/xande0804/IESB-PDM-OESTE/pull/17)
- **Tarefas implementadas:** roteamento, Bolso, Perfil e localização, lembretes/háptica/animações e mural.
- **Bônus implementados:** criação de aviso (POST) e ícone animado (Reanimated).
- **Evidências:** arquivos `prints/` anexados à branch, referenciados no PR após o envio; documentação de validação Web e limitações nativas abaixo.

Documentação detalhada: [SPEC.md](SPEC.md).

## Validação realizada — Expo Web

O aplicativo foi executado no navegador com as dependências instaladas. Foram observados os seguintes resultados, documentados nas capturas da entrega:

- Navegação entre as quatro abas, acesso ao detalhe de tarefa com ID 42 e abertura/fechamento da rota `/new-task`. No Expo Web, a rota modal pode ocupar a página inteira.
- Exibição do total de despesas mesmo com lista vazia (`R$ 0,00`) e abertura do compartilhamento no navegador.
- Seleção de foto pela galeria e manutenção da foto após atualizar a página (`F5`).
- Mural recebendo avisos do JSONPlaceholder e apresentação da tela de erro com botão **Tentar novamente** quando a URL da API foi temporariamente invalidada.
- Bônus de criar aviso: resposta do JSONPlaceholder com ID `101` exibida em alerta. A API simula a criação, mas não persiste o post.
- **Check-in:** no navegador, a permissão de localização foi **negada intencionalmente nas configurações do site** para verificar o cenário de erro. O aplicativo exibiu o alerta **“Sem localização — Permissão negada. O check-in não foi feito.”** sem interromper a navegação. Isso comprova o tratamento da permissão negada no Web, **não** a obtenção de um endereço.

O teste em dispositivo físico com Expo Go **não foi concluído**. Câmera e permissões nativas, notificação local em 10 segundos e resposta háptica permanecem **sem validação prática em celular**. Os serviços correspondentes estão implementados para execução nativa, mas não se declara aprovação desses cenários sem testá-los.

As imagens anexadas ao PR são capturas reais feitas no navegador; não há simulação de capturas nativas.
