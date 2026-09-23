import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function CompromissoList({
  itens,
  onDelete,
  tituloLista,
  listaVazia,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>{listaVazia}</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.info}>
              <Text style={styles.textoItem}>{item.texto}</Text>
            </View>

            <Pressable
              onPress={() => onDelete(item.id)}
              android_ripple={{ color: '#ffffff40' }}
              style={({ pressed }) => [
                styles.botaoRemover,
                pressed && styles.botaoPressionado,
              ]}
            >
              <Text style={styles.textoRemover}>Remover</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },

  info: {
    flex: 1,
    marginRight: 10,
  },

  textoItem: {
    fontSize: 16,
  },

  botaoRemover: {
    backgroundColor: '#c8102e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },

  botaoPressionado: {
    opacity: 0.8,
  },

  textoRemover: {
    color: '#fff',
    fontWeight: 'bold',
  },

  listaVazia: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
  },
});