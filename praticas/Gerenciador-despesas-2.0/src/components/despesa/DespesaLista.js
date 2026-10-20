import { FlatList, Text, View, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';
import DespesaSumario from './DespesaSumario';
import { themes } from '../../constants/theme';
import { columnsForWidth } from '../../utils/expenses';

export default function DespesaLista({ despesas, periodo }) {
  const colors = themes[useColorScheme() === 'dark' ? 'dark' : 'light'];
  const { width } = useWindowDimensions();
  const columns = columnsForWidth(width);

  return (
    <FlatList
      key={`columns-${columns}`}
      data={despesas}
      numColumns={columns}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <DespesaItem item={item} />}
      columnWrapperStyle={columns === 2 ? styles.columns : undefined}
      ListHeaderComponent={<DespesaSumario despesas={despesas} periodo={periodo} />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={44} color={colors.muted} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Nenhuma despesa.</Text>
          <Text style={[styles.emptyText, { color: colors.muted }]}>
            Toque em + para adicionar ou altere os filtros.
          </Text>
        </View>
      }
      contentContainerStyle={styles.list}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 24, flexGrow: 1 },
  columns: { gap: 12 },
  empty: { alignItems: 'center', paddingHorizontal: 15, paddingVertical: 48 },
  emptyTitle: { fontWeight: '700', fontSize: 17, marginTop: 14 },
  emptyText: { textAlign: 'center', fontSize: 14, marginTop: 6 },
});
