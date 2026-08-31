import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {APP_TITLE, INPUT_PLACEHOLDER, ADD_BUTTON_TEXT, LIST_TITLE} from './labels';
import {  StyleSheet, Text, View, TextInput, Pressable, Switch} from 'react-native';
import { useState } from 'react';

const disciplinas = [
  'Programação para Dispositivos Móveis',
  'Banco de Dados',
  'Engenharia de Software'
];


export default function App() {
  const [mostrarObrigatorias, setMostrarObrigatorias] = useState(false);
  const [botaoPressionado, setBotaoPressionado] = useState(false);
  return (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{APP_TITLE}</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder={INPUT_PLACEHOLDER}
        />

        <Pressable
          style={[
            styles.addButton,
            botaoPressionado && styles.addButtonPressed
          ]}
          onPressIn={() => setBotaoPressionado(true)}
          onPressOut={() => {
            setTimeout(() => {
              setBotaoPressionado(false);
            }, 100);
          }}
        >
          <Text>{ADD_BUTTON_TEXT}</Text>
        </Pressable>
      </View>

      <View style={styles.switchRow}>
        <Text>Mostrar apenas obrigatórias</Text>

        <Switch
          value={mostrarObrigatorias}
          onValueChange={setMostrarObrigatorias}
        />
      </View>

      <Text style={styles.listTitle}>{LIST_TITLE}</Text>

      <View style={styles.list}>
        {disciplinas.map((disciplina, index) => (
          <View key={index} style={styles.listItem}>
            <Text>{disciplina}</Text>
          </View>
        ))}
      </View>

    </SafeAreaView>
  </SafeAreaProvider>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'column', // Organiza os elementos principais de cima para baixo.
  },
  inputRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center', // Mantém input e botão alinhados verticalmente na mesma linha.
  },
  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  addButton: {
    width: '28%',
    marginLeft: '2%',
    padding: 10,
    alignItems: 'center', // Centraliza o texto horizontalmente dentro do botão.
    justifyContent: 'center', // Centraliza o texto verticalmente dentro do botão.
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  list: {
    width: '100%',
    marginTop: 16,
  },
  listItem: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  addButtonPressed: {
    opacity: 0.5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  
});
