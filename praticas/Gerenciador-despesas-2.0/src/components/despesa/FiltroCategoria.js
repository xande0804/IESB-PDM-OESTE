import { ScrollView, Pressable, Text, StyleSheet, useColorScheme } from 'react-native';
import { themes } from '../../constants/theme';
import { CATEGORIES } from '../../utils/expenses';

export default function FiltroCategoria({ category, onChange }) {
  const colors = themes[useColorScheme() === 'dark' ? 'dark' : 'light'];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
      style={styles.scroll} contentContainerStyle={styles.container}>
      {['Todas', ...CATEGORIES].map(value => {
        const selected = value === category;
        return (
          <Pressable key={value} onPress={() => onChange(value)}
            accessibilityRole="button"
            style={[styles.chip, {
              backgroundColor: selected ? colors.primary : colors.soft,
              borderColor: colors.border,
            }]}>
            <Text style={{ color: selected ? colors.background : colors.text,
              fontWeight: selected ? '700' : '400' }}>{value}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0, marginBottom: 10 },
  container: { gap: 8, paddingVertical: 6 },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 18, borderWidth: 1 },
});
