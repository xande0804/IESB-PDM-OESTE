import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, Text, StyleSheet, Platform, useColorScheme } from 'react-native';
import { themes } from '../../constants/theme';
import { formatDate } from '../../utils/expenses';

export default function DespesaItem({ item }) {
  const navigation = useNavigation();
  const colors = themes[useColorScheme() === 'dark' ? 'dark' : 'light'];
  const shadow = Platform.select({
    ios: { shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 } },
    android: { elevation: 4 },
    default: {},
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Editar despesa ${item.description}`}
      onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: item.id })}
      style={({ pressed }) => [
        styles.container, shadow, { backgroundColor: colors.card, borderColor: colors.border },
        pressed && styles.pressed,
      ]}>
      <View style={styles.info}>
        <Text style={[styles.description, { color: colors.text }]}>{item.description}</Text>
        <Text style={[styles.date, { color: colors.muted }]}>{formatDate(item.date)}</Text>
        <Text style={[styles.category, { color: colors.primary }]}>{item.category}</Text>
      </View>
      <View style={styles.amountArea}>
        <Text style={[styles.amount, { color: colors.primary }]}>R$ {item.amount.toFixed(2)}</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.muted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, borderWidth: 1, borderRadius: 10, padding: 14,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 12 },
  pressed: { opacity: 0.7 },
  info: { flex: 1, marginRight: 8 },
  description: { fontSize: 15, fontWeight: '700', marginBottom: 5 },
  date: { fontSize: 12, marginBottom: 6 },
  category: { fontSize: 12, fontWeight: '600' },
  amountArea: { alignItems: 'center', flexDirection: 'row', gap: 4 },
  amount: { fontSize: 14, fontWeight: '700' },
});
