import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titulo}>Minhas tarefas</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Digite uma nova tarefa..." />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lista}>
        <View style={styles.card}>
          <Text>Estudar React Native</Text>
          <TouchableOpacity>
            <Text>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text>Fazer atividade da faculdade</Text>
          <TouchableOpacity>
            <Text>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text>Revisar Java</Text>
          <TouchableOpacity>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    width: '70%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flex: 1,
    padding: 10
  },
  addButton: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 8,
    marginLeft: 8
  },
  addButtonText: {
    color: '#fff'
  },
  card: {
  flexDirection: 'row',
  width: '100%',
  padding: 12,
  marginBottom: 10,
  backgroundColor: '#f2f2f2',
  borderRadius: 8,
  justifyContent: 'space-between',
  },
  lista: {
  width: '70%',
  marginTop: 10,
  },
  titulo: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 16
  },
});
