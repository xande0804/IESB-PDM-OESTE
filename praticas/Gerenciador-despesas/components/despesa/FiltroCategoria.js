import { View, Pressable, Text, StyleSheet } from 'react-native';

export const CATEGORIAS = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
];

export default function FiltroCategoria({ categoria, onSelecionar }) {
  return (
    <View style={styles.container}>
      {['Todas', ...CATEGORIAS].map((item) => (
        <Pressable
          key={item}
          onPress={() => onSelecionar(item)}
          style={[
            styles.botao,
            categoria === item && styles.botaoSelecionado,
          ]}
        >
          <Text
            style={[
              styles.texto,
              categoria === item && styles.textoSelecionado,
            ]}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  botao: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  botaoSelecionado: {
    backgroundColor: '#312e81',
  },
  texto: {
    color: '#333333',
  },
  textoSelecionado: {
    color: 'white',
    fontWeight: 'bold',
  },
});