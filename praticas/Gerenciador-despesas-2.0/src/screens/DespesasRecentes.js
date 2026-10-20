import { useMemo } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { filterRecent } from '../utils/expenses';
import { themes } from '../constants/theme';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();
  const colors = themes[useColorScheme() === 'dark' ? 'dark' : 'light'];
  const recent = useMemo(() => filterRecent(expenses), [expenses]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaSaida despesas={recent} periodo="Últimos 7 dias" />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
