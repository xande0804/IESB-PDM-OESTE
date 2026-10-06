import { FlatList, Text, StyleSheet } from 'react-native';
import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas, onSelecionarDespesa }) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DespesaItem
          {...item}
          onPress={() => onSelecionarDespesa(item.id)}
        />
      )}
      ListEmptyComponent={
        <Text style={styles.vazio}>Nenhuma despesa para exibir.</Text>
      }
      contentContainerStyle={styles.lista}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingBottom: 16,
  },
  vazio: {
    textAlign: 'center',
    color: '#555555',
    marginTop: 24,
    fontSize: 16,
  },
});