import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { ActionButton } from '../components/ActionButton';
import { colors } from '../constants/theme';

export default function NewTaskScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Nova tarefa</Text>
        <Text style={styles.help}>Modal aberto a partir da aba Tarefas.</Text>
        <ActionButton label="Fechar" icon="close" onPress={() => router.back()} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, padding: 20 },
  card: { width: '100%', maxWidth: 540, padding: 28, backgroundColor: '#fff', borderRadius: 18, borderWidth: 1, borderColor: colors.border },
  title: { fontSize: 25, fontWeight: '800', color: colors.text },
  help: { marginVertical: 14, color: colors.subtle },
});
