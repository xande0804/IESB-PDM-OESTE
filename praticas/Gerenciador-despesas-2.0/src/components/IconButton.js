import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ icon, size = 24, color, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Adicionar despesa"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { padding: 8, marginRight: 8 },
  pressed: { opacity: 0.5 },
});
