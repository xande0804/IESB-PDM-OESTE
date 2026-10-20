import { View, StyleSheet } from 'react-native';
import DespesaLista from './DespesaLista';

export default function DespesaSaida({ despesas, periodo }) {
  return <View style={styles.container}><DespesaLista despesas={despesas} periodo={periodo} /></View>;
}

const styles = StyleSheet.create({ container: { flex: 1 } });
