import { useMemo, useState } from 'react';
import { Alert, Platform, Pressable, Text, TextInput, View, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import { useDebounce } from '../hooks/useDebounce';
import { filterExpenses } from '../utils/expenses';
import { themes } from '../constants/theme';
import FiltroCategoria from '../components/despesa/FiltroCategoria';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function TodasDespesas() {
  const { expenses, clearExpenses } = useExpenses();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const debouncedQuery = useDebounce(query, 400);
  const colors = themes[useColorScheme() === 'dark' ? 'dark' : 'light'];
  const filtered = useMemo(
    () => filterExpenses(expenses, debouncedQuery, category),
    [expenses, debouncedQuery, category]
  );

  function handleClear() {
    if (Platform.OS === 'web') {
      if (window.confirm('Excluir todas as despesas? Esta ação não pode ser desfeita.')) clearExpenses();
      return;
    }
    Alert.alert('Limpar tudo', 'Esta ação não pode ser desfeita. Deseja excluir todas as despesas?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir tudo', style: 'destructive', onPress: clearExpenses },
    ]);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchBox, { backgroundColor: colors.input, borderColor: colors.border }]}>
        <Ionicons name="search-outline" size={20} color={colors.muted} />
        <TextInput style={[styles.input, { color: colors.text }]} value={query}
          onChangeText={setQuery} placeholder="Buscar despesa..."
          placeholderTextColor={colors.muted} accessibilityLabel="Buscar despesa" />
      </View>
      <FiltroCategoria category={category} onChange={setCategory} />
      <View style={styles.actions}>
        <Pressable onPress={handleClear} accessibilityRole="button" accessibilityLabel="Limpar tudo"
          style={({ pressed }) => [styles.clear, pressed && { opacity: 0.5 }]}>
          <Ionicons name="trash-outline" size={16} color={colors.danger} />
          <Text style={{ color: colors.danger, fontWeight: '600' }}>Limpar tudo</Text>
        </Pressable>
      </View>
      <DespesaSaida despesas={filtered} periodo="Total do período" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchBox: { flexDirection: 'row', alignItems: 'center', borderRadius: 10,
    borderWidth: 1, paddingHorizontal: 12, marginBottom: 10 },
  input: { flex: 1, paddingVertical: 11, marginLeft: 8, fontSize: 15 },
  actions: { alignItems: 'flex-end', marginBottom: 8 },
  clear: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6 },
});
