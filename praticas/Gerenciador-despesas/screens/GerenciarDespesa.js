import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { CATEGORIAS } from '../components/despesa/FiltroCategoria';
import { tratarValor, validarDespesa } from '../utils/despesas';

export default function GerenciarDespesa({
  route,
  navigation,
  despesas,
  onAdicionar,
  onEditar,
  onExcluir,
}) {
  const despesaId = route.params?.despesaId;
  const despesaAtual = despesas.find((item) => item.id === despesaId);
  const editando = Boolean(despesaAtual);

  const [descricao, setDescricao] = useState(
    despesaAtual?.descricao ?? ''
  );
  const [valor, setValor] = useState(
    despesaAtual ? despesaAtual.valor.toFixed(2) : ''
  );
  const [data, setData] = useState(
    despesaAtual?.data ?? new Date()
  );
  const [categoria, setCategoria] = useState(
    despesaAtual?.categoria ?? ''
  );
  const [showPicker, setShowPicker] = useState(false);
  const [erro, setErro] = useState('');

  function handleChangeValor(texto) {
    setValor((valorAnterior) => tratarValor(texto, valorAnterior));
  }

  function onChangeData(event, selectedDate) {
    setShowPicker(false);

    if (event.type === 'set' && selectedDate) {
      setData(selectedDate);
    }
  }

  function salvarDespesa() {
    if (!validarDespesa(descricao, valor, categoria)) {
      setErro(
        'Preencha a descrição, selecione uma categoria e informe um valor maior que zero.'
      );
      return;
    }

    const dados = {
      descricao: descricao.trim(),
      valor: Number(valor),
      data,
      categoria,
    };

    if (editando) {
      onEditar(despesaId, dados);
    } else {
      onAdicionar(dados);
    }

    navigation.goBack();
  }

  function excluirDespesa() {
    onExcluir(despesaId);
    navigation.goBack();
  }

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição da despesa"
      />

      <Text style={styles.label}>Valor da despesa</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={handleChangeValor}
        keyboardType="decimal-pad"
        maxLength={10}
        placeholder="0.00"
      />

      <Text style={styles.label}>Data da despesa</Text>
      <Pressable
        style={styles.input}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.data}>
          {data.getDate()}/{data.getMonth() + 1}/{data.getFullYear()}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={data}
          mode="date"
          onChange={onChangeData}
        />
      )}

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategoria(item)}
            style={[
              styles.categoria,
              categoria === item && styles.categoriaSelecionada,
            ]}
          >
            <Text
              style={[
                styles.textoCategoria,
                categoria === item && styles.textoSelecionado,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <View style={styles.botao}>
        <Button
          title={editando ? 'Salvar alterações' : 'Adicionar despesa'}
          onPress={salvarDespesa}
          color="#312e81"
        />
      </View>

      <View style={styles.botao}>
        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          color="#555555"
        />
      </View>

      {editando && (
        <View style={styles.botao}>
          <Button
            title="Excluir despesa"
            onPress={excluirDespesa}
            color="#dc2626"
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#312e81',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  data: {
    fontSize: 16,
    color: '#333333',
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categoria: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  categoriaSelecionada: {
    backgroundColor: '#312e81',
  },
  textoCategoria: {
    color: '#333333',
  },
  textoSelecionado: {
    color: 'white',
    fontWeight: 'bold',
  },
  erro: {
    color: '#dc2626',
    marginBottom: 16,
  },
  botao: {
    marginBottom: 12,
  },
});