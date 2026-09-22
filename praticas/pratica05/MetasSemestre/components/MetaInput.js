import { StyleSheet, TextInput, Pressable, Text, View } from 'react-native';

export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma meta"
        value={value}
        onChangeText={onChangeText}
      />

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.botaoPressionado,
        ]}
        android_ripple={{ color: '#ffffff55' }}
        onPress={onAdd}
      >
        <Text style={styles.textoBotao}>Adicionar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },

  botao: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },

  botaoPressionado: {
    opacity: 0.7,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});