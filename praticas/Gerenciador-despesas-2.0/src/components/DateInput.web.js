import { StyleSheet } from 'react-native';

function dateToISO(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseLocalDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return new Date(NaN);
  const [year, month, day] = value.split('-').map(Number);
  const result = new Date(year, month - 1, day);
  if (result.getFullYear() !== year || result.getMonth() !== month - 1 || result.getDate() !== day) {
    return new Date(NaN);
  }
  return result;
}

export default function DateInput({ date, onChange, style, textColor }) {
  return (
    <input
      type="date"
      aria-label="Escolher data"
      value={dateToISO(date)}
      onChange={event => onChange(parseLocalDate(event.target.value))}
      style={{
        ...StyleSheet.flatten(style),
        width: '100%',
        boxSizing: 'border-box',
        color: textColor,
        fontFamily: 'inherit',
      }}
    />
  );
}
