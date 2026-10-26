import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from '../../components/ActionButton';
import { pickImage, takePhoto } from '../../services/media';
import { showMessage } from '../../utils/feedback';
import { colors } from '../../constants/theme';

const PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  useFocusEffect(useCallback(() => {
    let active = true;
    AsyncStorage.getItem(PHOTO_KEY)
      .then((saved) => { if (active) setPhotoUri(saved || null); })
      .catch((err) => showMessage('Erro ao recuperar foto', err.message));
    return () => { active = false; };
  }, []));

  async function savePhoto(uri) {
    if (!uri) return;
    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
      setPhotoUri(uri);
    } catch (err) {
      showMessage('Erro ao salvar foto', err.message);
    }
  }

  async function handleGallery() {
    try {
      await savePhoto(await pickImage());
    } catch (err) {
      showMessage('Erro na galeria', err.message);
    }
  }

  async function handleCamera() {
    try {
      await savePhoto(await takePhoto());
    } catch (err) {
      showMessage('Erro na câmera', err.message);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Meu perfil</Text>
      <Text style={styles.subtle}>Toque no avatar para escolher uma foto.</Text>
      <View style={styles.card}>
        <Pressable accessibilityRole="button" style={styles.avatarButton} onPress={handleGallery}>
          {photoUri
            ? <Image source={{ uri: photoUri }} style={styles.avatar} />
            : <View style={[styles.avatar, styles.empty]}>
                <Ionicons name="person" size={64} color={colors.primary} />
              </View>}
          <View style={styles.badge}><Ionicons name="camera" size={17} color="#fff" /></View>
        </Pressable>
        <Text style={styles.name}>Estudante</Text>
        <Text style={styles.subtle}>CampusGo • Aula 10</Text>
        <View style={styles.buttons}>
          <ActionButton label="Galeria" icon="images-outline" onPress={handleGallery} variant="secondary" />
          <ActionButton label="Câmera" icon="camera-outline" onPress={handleCamera} />
        </View>
      </View>
      <View style={styles.info}>
        <Ionicons name="information-circle-outline" color={colors.primary} size={21} />
        <Text style={styles.infoText}>Foto salva com AsyncStorage na chave @profile-photo.</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { width: '100%', maxWidth: 760, alignSelf: 'center', padding: 20 },
  title: { color: colors.text, fontSize: 26, fontWeight: '800' },
  subtle: { color: colors.subtle, textAlign: 'center', lineHeight: 20, marginTop: 8 },
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 26, marginTop: 24, alignItems: 'center' },
  avatarButton: { position: 'relative' },
  avatar: { width: 130, height: 130, borderRadius: 65 },
  empty: { backgroundColor: colors.lavender, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', right: 0, bottom: 0, borderRadius: 18, width: 35, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, borderWidth: 3, borderColor: '#fff' },
  name: { fontWeight: '800', fontSize: 20, color: colors.text, marginTop: 16 },
  buttons: { width: '100%', maxWidth: 320, marginTop: 15 },
  info: { backgroundColor: colors.lavender, borderRadius: 14, marginTop: 20, padding: 17, flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoText: { flex: 1, color: colors.primaryDark, lineHeight: 20 },
});
