import { Share, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from '../../components/ActionButton';
import { useExpenses } from '../../store/expenses-context';
import { showMessage } from '../../utils/feedback';
import { colors } from '../../constants/theme';

export default function WalletScreen() {
  const { expenses } = useExpenses();
  const total = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const formatted = total.toFixed(2).replace('.', ',');

  async function shareSummary() {
    const message = 'Gastei R$ ' + formatted + ' neste semestre.';
    try {
      await Share.share({ message });
    } catch (err) {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(message);
          showMessage('Resumo copiado', 'O navegador não abriu o menu de compartilhamento.');
          return;
        } catch (_) {}
      }
      showMessage('Não foi possível compartilhar', err.message);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.tag}>CONTROLE FINANCEIRO</Text>
      <Text style={styles.title}>Meu bolso</Text>
      <Text style={styles.subtle}>Resumo calculado com o contexto de despesas da Aula 09.</Text>
      <View style={styles.hero}>
        <Text style={styles.label}>Total de despesas</Text>
        <Text style={styles.amount}>R$ {formatted}</Text>
        <Text style={styles.label}>{expenses.length} despesa(s) registrada(s)</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Compartilhar resumo</Text>
        <Text style={styles.subtle}>O valor compartilhado sempre vem da soma atual.</Text>
        <ActionButton label="Compartilhar resumo" icon="share-social-outline" onPress={shareSummary} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { width: '100%', maxWidth: 760, alignSelf: 'center', padding: 20 },
  tag: { color: colors.primary, letterSpacing: 1.4, fontWeight: '800', fontSize: 12 },
  title: { color: colors.text, fontWeight: '800', fontSize: 26, marginTop: 8 },
  subtle: { color: colors.subtle, marginTop: 7, lineHeight: 21 },
  hero: { backgroundColor: colors.primary, padding: 26, borderRadius: 20, marginTop: 24 },
  label: { color: '#E1E6FF', fontSize: 15, marginTop: 5 },
  amount: { color: '#fff', fontSize: 40, fontWeight: '800', marginVertical: 16 },
  card: { backgroundColor: '#fff', borderColor: colors.border, borderWidth: 1, borderRadius: 18, padding: 20, marginTop: 20 },
  cardTitle: { color: colors.text, fontWeight: '800', fontSize: 19 },
});
