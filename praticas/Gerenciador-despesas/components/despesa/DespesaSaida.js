import { View, StyleSheet } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

export default function DespesaSaida({
  despesas,
  periodo,
  onSelecionarDespesa,
}) {
  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      <DespesaLista
        despesas={despesas}
        onSelecionarDespesa={onSelecionarDespesa}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});