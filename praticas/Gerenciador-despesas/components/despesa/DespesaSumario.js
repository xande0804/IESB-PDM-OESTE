import { View, Text, StyleSheet } from 'react-native';
import { somarDespesas, ultrapassaLimite } from '../../utils/despesas';

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = somarDespesas(despesas);

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text
        style={[
          styles.total,
          ultrapassaLimite(somaDespesas) && styles.totalVermelho,
        ]}
      >
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  periodo: {
    color: '#312e81',
    fontSize: 16,
  },
  total: {
    color: '#312e81',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalVermelho: {
    color: '#dc2626',
  },
});