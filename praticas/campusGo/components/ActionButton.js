import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

export function ActionButton({ label, icon, onPress, variant = 'primary', disabled = false }) {
  const secondary = variant === 'secondary';
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondary,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.inner}>
        {icon ? <Ionicons name={icon} size={19} color={secondary ? colors.primary : '#fff'} /> : null}
        <Text style={[styles.text, secondary && styles.secondaryText]}>{label}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: { backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 13, paddingHorizontal: 16, marginTop: 10 },
  secondary: { backgroundColor: colors.lavender, borderColor: colors.primary, borderWidth: 1 },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.78 },
  inner: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 9 },
  text: { fontWeight: '700', color: '#fff', fontSize: 15 },
  secondaryText: { color: colors.primary },
});
