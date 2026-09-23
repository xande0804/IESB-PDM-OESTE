import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

import * as labels from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  useEffect(() => {
    const carregarCompromissos = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);

        if (dadosSalvos) {
          setCompromissos(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        Alert.alert(
          'Erro',
          'Não foi possível carregar os compromissos.'
        );
      } finally {
        setDadosCarregados(true);
      }
    };

    carregarCompromissos();
  }, []);

  useEffect(() => {
    const salvarCompromissos = async () => {
      if (!dadosCarregados) {
        return;
      }

      try {
        const dados = JSON.stringify(compromissos);

        await AsyncStorage.setItem(STORAGE_KEY, dados);
      } catch (erro) {
        Alert.alert(
          'Erro',
          'Não foi possível salvar os compromissos.'
        );
      }
    };

    salvarCompromissos();
  }, [compromissos, dadosCarregados]);

  const adicionarCompromisso = () => {
    if (texto.trim() === '') {
      Alert.alert(
        labels.alertaTitulo,
        labels.alertaMensagem
      );

      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadoEm: new Date().toISOString(),
    };

    setCompromissos((listaAtual) => [
      ...listaAtual,
      novoCompromisso,
    ]);

    setTexto('');
  };

  const removerCompromisso = (id) => {
    setCompromissos((listaAtual) =>
      listaAtual.filter((item) => item.id !== id)
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require('./assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={styles.headerInfo}>
              <Text style={styles.titulo}>
                {labels.tituloApp}
              </Text>

              <Text style={styles.contador}>
                {compromissos.length} pendentes
              </Text>
            </View>
          </View>

          <CompromissoInput
            value={texto}
            onChangeText={setTexto}
            onAdd={adicionarCompromisso}
            labels={labels}
          />

          <CompromissoList
            itens={compromissos}
            onDelete={removerCompromisso}
            tituloLista={labels.tituloLista}
            listaVazia={labels.listaVazia}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 100,
    height: 55,
    marginRight: 12,
  },

  headerInfo: {
    flex: 1,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  contador: {
    marginTop: 3,
    color: '#666',
  },
});