# CampusGo — Aula 10 (PDM)

Aplicativo React Native / Expo Router para a Atividade Prática CampusGo, disciplina Programação para Dispositivos Móveis.

**Pasta:** `praticas/campusGo` | **Branch:** `feature/campus-go`

## Rodar
Requer Node.js 22+ e Expo Go atualizado (para o SDK 57).

```bash
cd praticas/campusGo
cp .env.example .env
npm install
npx expo start --clear
```

No Windows PowerShell, use `Copy-Item .env.example .env`. Para testar no navegador, pressione `w` ou execute `npm run web`. O professor também poderá abrir no Expo Go pelo QR code.

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

## Descrição sugerida do PR
- Aluno: **[NOME COMPLETO]**
- Matrícula: **[MATRÍCULA]**
- Tarefas 1–5: concluídas após verificação prática.
- Bônus: criação de aviso e ícone animado.
- Evidências: anexar as imagens na descrição do PR.

Documentação detalhada: [SPEC.md](SPEC.md).
