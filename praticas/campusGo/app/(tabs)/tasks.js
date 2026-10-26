import { useState } from 'react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from '../../components/ActionButton';
import { DoneIcon } from '../../components/DoneIcon';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';
import { showMessage } from '../../utils/feedback';
import { colors } from '../../constants/theme';

export default function TasksScreen() {
  const [label, setLabel] = useState('Sem check-in');
  const [finding, setFinding] = useState(false);
  const [reminding, setReminding] = useState(false);

  async function handleCheckIn() {
    try {
      setFinding(true);
      const place = await getCurrentPlace();
      if (!place) {
        showMessage('Sem localização', 'Permissão negada. O check-in não foi feito.');
        return;
      }
      setLabel(place.label);
    } catch (err) {
      showMessage('Erro no check-in', err.message);
    } finally {
      setFinding(false);
    }
  }

  async function handleReminder() {
    try {
      setReminding(true);
      const success = await scheduleReminder('Estudar', 10);
      showMessage(success ? 'Lembrete criado' : 'Lembrete indisponível',
        success ? 'Uma notificação local chegará em cerca de 10 segundos.' :
          'Use o Expo Go no celular e autorize as notificações. O navegador não simula o lembrete.');
    } catch (err) {
      showMessage('Erro no lembrete', err.message);
    } finally {
      setReminding(false);
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (_) {
      // Dispositivos sem haptics devem continuar funcionando.
    } finally {
      showMessage('Tarefa concluída');
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.tag}>ORGANIZAÇÃO</Text>
      <Text style={styles.title}>Minhas tarefas</Text>
      <Text style={styles.subtle}>Rotas, check-in e lembretes em um só lugar.</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lista de PDM — Tarefa 42</Text>
        <Text style={styles.subtle}>Exemplo para testar a rota dinâmica.</Text>
        <Link href="/task/42" asChild>
          <Pressable accessibilityRole="button" style={styles.link}>
            <Text style={styles.linkText}>Abrir tarefa 42</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.primary} />
          </Pressable>
        </Link>
        <DoneIcon onPress={handleComplete} />
      </View>
      <Link href="/new-task" asChild>
        <Pressable accessibilityRole="button" style={styles.newTask}>
          <Ionicons name="add-circle" size={21} color="#fff" />
          <Text style={styles.newTaskText}>Nova tarefa</Text>
        </Pressable>
      </Link>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Check-in de estudos</Text>
        <Text style={styles.subtle}>A localização só é solicitada quando você tocar aqui.</Text>
        <ActionButton label={finding ? 'Localizando...' : 'Estudei aqui'} icon="location-outline" onPress={handleCheckIn} disabled={finding} />
        <Text style={styles.place}>{label}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lembrete</Text>
        <Text style={styles.subtle}>Agende uma notificação local.</Text>
        <ActionButton label={reminding ? 'Agendando...' : 'Lembrar em 10 s'} icon="notifications-outline" onPress={handleReminder} disabled={reminding} variant="secondary" />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { alignSelf: 'center', width: '100%', maxWidth: 760, padding: 20, paddingBottom: 44 },
  tag: { fontSize: 12, letterSpacing: 1.6, fontWeight: '800', color: colors.primary },
  title: { fontWeight: '800', fontSize: 26, color: colors.text, marginTop: 8 },
  subtle: { color: colors.subtle, lineHeight: 20, marginTop: 8 },
  card: { backgroundColor: '#fff', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: colors.border, marginTop: 20 },
  cardTitle: { fontSize: 19, color: colors.text, fontWeight: '800' },
  link: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, backgroundColor: colors.lavender, borderRadius: 12, marginTop: 14 },
  linkText: { color: colors.primary, fontWeight: '700' },
  newTask: { backgroundColor: colors.primary, borderRadius: 15, padding: 17, flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', marginTop: 18 },
  newTaskText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  place: { backgroundColor: colors.background, color: colors.subtle, padding: 12, borderRadius: 12, marginTop: 15 },
});
