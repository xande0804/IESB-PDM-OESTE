import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking, Platform } from 'react-native';

/** Abre a galeria; cancelar retorna null, sem trocar o avatar. */
export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.7,
  });
  return result.canceled ? null : result.assets[0].uri;
}

/** Solicita permissão antes de abrir a câmera. */
export async function takePhoto() {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();
  if (!granted) {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') window.alert('Permissão negada. Autorize a câmera nas configurações do navegador.');
    } else {
      Alert.alert('Permissão negada', 'Libere a câmera para tirar uma foto.', [
        { text: 'Agora não', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]);
    }
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
  return result.canceled ? null : result.assets[0].uri;
}
