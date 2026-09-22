import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregouMetas, setCarregouMetas] = useState(false);

  useEffect(() => {
  async function carregarMetas() {
    try {
      const metasSalvas = await AsyncStorage.getItem('@metas_semestre');

      if (metasSalvas !== null) {
        setMetas(JSON.parse(metasSalvas));
      }
    } catch (erro) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar suas metas.'
      );
    } finally {
      setCarregouMetas(true);
    }
  }

  carregarMetas();
}, []);

useEffect(() => {
  async function salvarMetas() {
    if (!carregouMetas) {
      return;
    }

    try {
      await AsyncStorage.setItem(
        '@metas_semestre',
        JSON.stringify(metas)
      );
    } catch (erro) {
      Alert.alert(
        'Erro',
        'Não foi possível salvar suas metas.'
      );
    }
  }

  salvarMetas();
}, [metas, carregouMetas]);

  function adicionarMeta() {
    if (texto.trim() === '') {
      Alert.alert('Atenção', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((metasAtuais) => [...metasAtuais, novaMeta]);
    setTexto('');
  }

  function removerMeta(id) {
    setMetas((metasAtuais) =>
      metasAtuais.filter((meta) => meta.id !== id)
    );
  }

  function alternarMetaConcluida(id) {
  setMetas((metasAtuais) =>
    metasAtuais.map((meta) =>
      meta.id === id
        ? { ...meta, concluida: !meta.concluida }
        : meta
      )
    );
  }

const pendentes = metas.filter((meta) => !meta.concluida).length;
const concluidas = metas.filter((meta) => meta.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.cabecalho}>
            <Image
              source={require('./assets/icon.png')}
              style={styles.imagem}
            />

            <Text style={styles.titulo}>Metas do Semestre</Text>
            <Text style={styles.contador}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>

          <MetaInput
            value={texto}
            onChangeText={setTexto}
            onAdd={adicionarMeta}
          />

          <MetaList
            metas={metas}
              onDelete={removerMeta}
              onToggle={alternarMetaConcluida}
            />  
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  container: {
    flex: 1,
    padding: 20,
  },

  cabecalho: {
    alignItems: 'center',
    marginBottom: 25,
  },

  imagem: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },

  titulo: {
  fontSize: 24,
  fontWeight: 'bold',
  },

  contador: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
});