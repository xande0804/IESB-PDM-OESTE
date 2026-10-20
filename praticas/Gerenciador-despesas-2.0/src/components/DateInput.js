import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../utils/expenses';

export default function DateInput({ date, onChange, style, textColor }) {
  const [showPicker, setShowPicker] = useState(false);

  function handleDateChange(event, selectedDate) {
    setShowPicker(false);
    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate);
    }
  }

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Escolher data"
        style={style}
        onPress={() => setShowPicker(true)}>
        <Text style={{ color: textColor }}>{formatDate(date)}</Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={handleDateChange}
        />
      )}
    </>
  );
}
