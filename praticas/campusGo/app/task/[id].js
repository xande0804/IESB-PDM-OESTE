import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { ActionButton } from '../../components/ActionButton';
import { colors } from '../../constants/theme';

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Tarefa número {id}</Text>
        <Text style={styles.help}>O número foi lido diretamente da rota dinâmica.</Text>
        <ActionButton label="Voltar" icon="arrow-back" onPress={() => router.back()} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: 20 },
  card: { maxWidth: 540, width: '100%', backgroundColor: '#fff', padding: 28, borderRadius: 18, borderWidth: 1, borderColor: colors.border },
  title: { color: colors.text, fontSize: 26, fontWeight: '800' },
  help: { color: colors.subtle, marginVertical: 14 },
});
