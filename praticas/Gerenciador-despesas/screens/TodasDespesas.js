import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategoria from '../components/despesa/FiltroCategoria';
import { filtrarPorCategoria } from '../utils/despesas';

export default function TodasDespesas({ despesas, navigation }) {
  const [categoria, setCategoria] = useState('Todas');

  const despesasFiltradas = filtrarPorCategoria(despesas, categoria);

  function selecionarDespesa(id) {
    navigation.navigate('GerenciarDespesa', { despesaId: id });
  }

  return (
    <View style={styles.container}>
      <FiltroCategoria
        categoria={categoria}
        onSelecionar={setCategoria}
      />

      <DespesaSaida
        despesas={despesasFiltradas}
        periodo="Todas as despesas"
        onSelecionarDespesa={selecionarDespesa}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});