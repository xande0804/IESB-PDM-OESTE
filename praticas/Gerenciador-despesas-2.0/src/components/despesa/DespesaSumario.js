import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { themes } from '../../constants/theme';
import { summarizeExpenses } from '../../utils/expenses';

export default function DespesaSumario({ despesas, periodo }) {
  const colors = themes[useColorScheme() === 'dark' ? 'dark' : 'light'];
  const { count, total } = summarizeExpenses(despesas);
  return (
    <View style={[styles.container, { backgroundColor: colors.soft }]}>
      <View style={styles.info}>
        <Text style={[styles.label, { color: colors.text }]}>{periodo}</Text>
        <Text style={[styles.count, { color: colors.muted }]}>
          {count} {count === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={[styles.total, { color: colors.primary }]}>R$ {total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 10, padding: 16, marginBottom: 14, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between' },
  info: { flex: 1, marginRight: 8 },
  label: { fontSize: 14, fontWeight: '600' },
  count: { fontSize: 12, marginTop: 4 },
  total: { fontSize: 18, fontWeight: '700' },
});
