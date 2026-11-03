import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
import { colors } from '../constants/theme';

export function DoneIcon({ onPress }) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePress() {
    scale.value = withSequence(withSpring(1.3), withSpring(1));
    onPress();
  }

  return (
    <Pressable accessibilityRole="button" onPress={handlePress} style={styles.button}>
      <View style={styles.inner}>
        <Animated.View style={style}>
          <Ionicons name="checkmark-circle" color="#fff" size={23} />
        </Animated.View>
        <Text style={styles.label}>Concluir</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: { backgroundColor: colors.success, borderRadius: 14, marginTop: 10, paddingVertical: 12 },
  inner: { flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' },
  label: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
