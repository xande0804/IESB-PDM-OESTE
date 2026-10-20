import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useExpenses } from '../store/expenses-context';
import { themes } from '../constants/theme';
import {
  CATEGORIES,
  formatDate,
  normalizeAmountInput,
  toAmount,
  validate,
} from '../utils/expenses';

export default function GerenciarDespesa({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const selected = expenses.find(item => item.id === expenseId);
  const colors = themes[useColorScheme() === 'dark' ? 'dark' : 'light'];

  const [form, setForm] = useState({
    description: selected?.description ?? '',
    amount: selected ? String(selected.amount) : '',
    date: selected?.date ?? new Date(),
    category: selected?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
    });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);
    if (errors[field]) {
      setErrors(previous => ({
        ...previous,
        [field]: validate(next)[field],
      }));
    }
  }

  function handleAmountChange(text) {
    handleChange('amount', normalizeAmountInput(text, form.amount));
  }

  function handleSubmit() {
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length !== 0) return;

    const data = {
      description: form.description.trim(),
      amount: toAmount(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) updateExpense(expenseId, data);
    else addExpense(data);

    navigation.goBack();
  }

  function confirmDelete() {
    function remove() {
      deleteExpense(expenseId);
      navigation.goBack();
    }

    if (Platform.OS === 'web') {
      if (window.confirm('Excluir despesa? Esta ação não pode ser desfeita.')) {
        remove();
      }
      return;
    }

    Alert.alert('Excluir despesa', 'Esta ação não pode ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: remove },
    ]);
  }

  function onDateChange(event, selectedDate) {
    setShowDatePicker(false);
    if (event.type === 'set' && selectedDate) {
      handleChange('date', selectedDate);
    }
  }

  function renderError(field) {
    if (!errors[field]) return null;
    return <Text style={[styles.error, { color: colors.danger }]}>{errors[field]}</Text>;
  }

  function fieldStyle(field) {
    return [
      styles.input,
      {
        color: colors.text,
        backgroundColor: colors.input,
        borderColor: errors[field] ? colors.danger : colors.border,
        borderWidth: errors[field] ? 2 : 1,
      },
    ];
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}>
        <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
        <TextInput
          accessibilityLabel="Descrição"
          style={fieldStyle('description')}
          placeholder="Descrição da despesa"
          placeholderTextColor={colors.muted}
          value={form.description}
          onChangeText={text => handleChange('description', text)}
        />
        {renderError('description')}

        <Text style={[styles.label, { color: colors.text }]}>Valor (R$)</Text>
        <TextInput
          accessibilityLabel="Valor"
          style={fieldStyle('amount')}
          placeholder="0.00"
          placeholderTextColor={colors.muted}
          keyboardType="decimal-pad"
          value={form.amount}
          onChangeText={handleAmountChange}
        />
        {renderError('amount')}

        <Text style={[styles.label, { color: colors.text }]}>Data</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Escolher data"
          style={fieldStyle('date')}
          onPress={() => setShowDatePicker(true)}>
          <Text style={{ color: colors.text }}>{formatDate(form.date)}</Text>
        </Pressable>
        {renderError('date')}
        {showDatePicker && (
          <DateTimePicker
            value={form.date}
            mode="date"
            maximumDate={new Date()}
            onChange={onDateChange}
          />
        )}

        <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Escolher categoria"
          style={[fieldStyle('category'), styles.categoryInput]}
          onPress={() => setIsPickerOpen(true)}>
          <Text style={{ color: form.category ? colors.text : colors.muted }}>
            {form.category || 'Escolha a categoria'}
          </Text>
          <Text style={{ color: colors.primary }}>▾</Text>
        </Pressable>
        {renderError('category')}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Salvar despesa"
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.saveButton,
            { backgroundColor: colors.primary },
            pressed && styles.pressed,
          ]}>
          <Text style={[styles.buttonText, { color: colors.background }]}>SALVAR</Text>
        </Pressable>

        {isEditing && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Excluir despesa"
            onPress={confirmDelete}
            style={({ pressed }) => [
              styles.deleteButton,
              { borderColor: colors.danger },
              pressed && styles.pressed,
            ]}>
            <Text style={[styles.buttonText, { color: colors.danger }]}>EXCLUIR</Text>
          </Pressable>
        )}
      </ScrollView>

      <Modal
        visible={isPickerOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPickerOpen(false)}>
        <View style={styles.backdrop}>
          <View style={[styles.sheet, { backgroundColor: colors.card }]}>
            <Text style={[styles.sheetTitle, { color: colors.text }]}>
              Escolha uma categoria
            </Text>
            {CATEGORIES.map(category => (
              <Pressable
                key={category}
                accessibilityRole="button"
                onPress={() => {
                  handleChange('category', category);
                  setIsPickerOpen(false);
                }}
                style={[styles.option, { borderBottomColor: colors.border }]}>
                <Text style={{ color: colors.text, fontSize: 16 }}>{category}</Text>
              </Pressable>
            ))}
            <Button
              title="Cancelar"
              color={colors.primary}
              onPress={() => setIsPickerOpen(false)}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 64 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, marginTop: 10 },
  input: {
    borderRadius: 9,
    padding: 12,
    minHeight: 48,
    fontSize: 16,
    justifyContent: 'center',
  },
  categoryInput: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  error: { fontSize: 12, marginTop: 5 },
  saveButton: {
    borderRadius: 9,
    alignItems: 'center',
    padding: 15,
    marginTop: 28,
    marginBottom: 12,
  },
  deleteButton: {
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    padding: 14,
  },
  pressed: { opacity: 0.5 },
  buttonText: { fontSize: 15, fontWeight: '700' },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: { borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 22, paddingBottom: 32 },
  sheetTitle: { fontWeight: '700', fontSize: 18, marginBottom: 14 },
  option: { paddingVertical: 17, borderBottomWidth: 1 },
});
