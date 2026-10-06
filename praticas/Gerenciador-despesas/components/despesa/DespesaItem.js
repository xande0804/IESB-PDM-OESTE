import { Pressable, View, Text, StyleSheet } from 'react-native';

function getDataFormatada(data) {
  return (
    data.getDate() +
    '/' +
    (data.getMonth() + 1) +
    '/' +
    data.getFullYear()
  );
}

export default function DespesaItem({
  descricao,
  valor,
  data,
  categoria,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressionado,
      ]}
    >
      <View style={styles.informacoes}>
        <Text style={styles.descricao}>{descricao}</Text>
        <Text style={styles.data}>{getDataFormatada(data)}</Text>
        <View style={styles.tag}>
          <Text style={styles.categoria}>{categoria}</Text>
        </View>
      </View>

      <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#312e81',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pressionado: {
    opacity: 0.7,
  },
  informacoes: {
    flex: 1,
    marginRight: 12,
  },
  descricao: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  data: {
    color: '#e0e7ff',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#eeeeee',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  categoria: {
    color: '#333333',
    fontSize: 12,
  },
  valor: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});