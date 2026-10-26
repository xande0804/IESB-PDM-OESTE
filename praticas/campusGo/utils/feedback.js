import { Alert, Platform } from 'react-native';

// Alert.alert nao aparece na maioria dos navegadores Expo Web.
export function showMessage(title, message = '') {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') window.alert(message ? title + '\n' + message : title);
    return;
  }
  Alert.alert(title, message);
}
