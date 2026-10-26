import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionButton } from '../../components/ActionButton';
import { FadeIn } from '../../components/FadeIn';
import { useNotices } from '../../hooks/useNotices';
import { api } from '../../services/api';
import { showMessage } from '../../utils/feedback';
import { colors } from '../../constants/theme';

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  async function createNotice() {
    if (!title.trim() || !body.trim()) {
      showMessage('Preencha os campos', 'Informe título e texto.');
      return;
    }
    try {
      setSending(true);
      const result = await api.create('posts', { title: title.trim(), body: body.trim(), userId: 1 });
      showMessage('Aviso criado', 'ID recebido: ' + result.id + '. O JSONPlaceholder não grava de verdade.');
      setTitle('');
      setBody('');
    } catch (err) {
      showMessage('Erro ao criar aviso', err.message);
    } finally {
      setSending(false);
    }
  }

  if (isLoading && notices.length === 0 && !error) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.subtle}>Carregando avisos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" color={colors.danger} size={50} />
        <Text style={styles.title}>Não foi possível carregar</Text>
        <Text style={styles.subtle}>{error}</Text>
        <ActionButton label="Tentar novamente" icon="refresh" onPress={reload} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={notices}
      keyExtractor={(item) => String(item.id)}
      refreshing={isLoading}
      onRefresh={reload}
      renderItem={({ item }) => (
        <FadeIn>
          <View style={styles.card}>
            <Text style={styles.cardTag}>AVISO #{item.id}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardBody}>{item.body}</Text>
          </View>
        </FadeIn>
      )}
      ListEmptyComponent={<Text style={styles.empty}>Nenhum aviso.</Text>}
      ListHeaderComponent={
        <View>
          <View style={styles.hero}>
            <Text style={styles.heroTag}>CAMPUSGO</Text>
            <Text style={styles.heroTitle}>Mural de avisos</Text>
            <Text style={styles.heroText}>Novidades do campus em um só lugar.</Text>
          </View>
          <Text style={styles.title}>Avisos recentes</Text>
          <Text style={styles.subtle}>Puxe a lista para baixo para atualizar.</Text>
        </View>
      }
      ListFooterComponent={
        <View style={styles.form}>
          <Text style={styles.title}>Criar aviso</Text>
          <Text style={styles.subtle}>Bônus: envia um POST simulado ao JSONPlaceholder.</Text>
          <TextInput
            placeholder="Título"
            placeholderTextColor={colors.subtle}
            value={title}
            onChangeText={setTitle}
            maxLength={100}
            style={styles.input}
          />
          <TextInput
            placeholder="Texto do aviso"
            placeholderTextColor={colors.subtle}
            value={body}
            onChangeText={setBody}
            multiline
            maxLength={500}
            style={[styles.input, styles.multiline]}
          />
          <ActionButton label={sending ? 'Enviando...' : 'Criar aviso'} icon="add-circle-outline" disabled={sending} onPress={createNotice} />
        </View>
      }
    />
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { width: '100%', maxWidth: 760, alignSelf: 'center', padding: 20, paddingBottom: 38 },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', padding: 25 },
  hero: { backgroundColor: colors.primary, borderRadius: 20, padding: 26, marginBottom: 22 },
  heroTag: { color: '#E2E6FF', fontWeight: '800', letterSpacing: 1.5 },
  heroTitle: { color: '#fff', fontSize: 27, fontWeight: '800', marginTop: 8 },
  heroText: { color: '#E2E6FF', marginTop: 9 },
  title: { color: colors.text, fontSize: 21, fontWeight: '800', marginTop: 8 },
  subtle: { color: colors.subtle, marginTop: 7, lineHeight: 21, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 18, marginTop: 13 },
  cardTag: { color: colors.primary, fontWeight: '800', fontSize: 11, letterSpacing: 1.2 },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '800', marginTop: 9, textTransform: 'capitalize' },
  cardBody: { color: colors.subtle, marginTop: 9, lineHeight: 21 },
  empty: { textAlign: 'center', color: colors.subtle, marginTop: 24 },
  form: { backgroundColor: '#fff', borderRadius: 17, borderWidth: 1, borderColor: colors.border, padding: 20, marginTop: 24 },
  input: { color: colors.text, backgroundColor: '#fff', borderColor: colors.border, borderWidth: 1, borderRadius: 11, padding: 13, marginTop: 12 },
  multiline: { minHeight: 90, textAlignVertical: 'top' },
});
