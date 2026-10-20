const CATEGORIES = ['Alimentação', 'Transporte', 'Material', 'Outros'];

function normalizeAmountInput(text, previous = '') {
  const normalized = String(text).replace(',', '.');
  return /^\d*\.?\d{0,2}$/.test(normalized) ? normalized : previous;
}

function toAmount(text) {
  return parseFloat(String(text).replace(',', '.'));
}

function validate(values, now = new Date()) {
  const errors = {};
  if (String(values.description ?? '').trim().length < 3) {
    errors.description = 'Mínimo de 3 caracteres';
  }
  const text = String(values.amount ?? '').replace(',', '.');
  const amount = toAmount(text);
  if (!/^\d*\.?\d{0,2}$/.test(text) || text.trim() === '' || !Number.isFinite(amount) || amount <= 0) {
    errors.amount = 'Informe um valor maior que zero';
  }
  const date = values.date;
  if (!(date instanceof Date) || Number.isNaN(date.getTime()) || date > now) {
    errors.date = 'A data não pode ser futura';
  }
  if (!CATEGORIES.includes(values.category)) {
    errors.category = 'Escolha uma categoria';
  }
  return errors;
}

function expensesReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'ADD':
      return [{ ...payload, id: Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 11) }, ...state];
    case 'UPDATE':
      return state.map(item => item.id === payload.id ? { ...item, ...payload.data, id: item.id } : item);
    case 'DELETE':
      return state.filter(item => item.id !== payload);
    case 'SET':
      return [...payload];
    default:
      return state;
  }
}

function deserializeExpenses(json) {
  if (!json) return [];
  const items = JSON.parse(json);
  if (!Array.isArray(items)) throw new Error('Dados salvos inválidos');
  return items.map(item => ({ ...item, date: new Date(item.date) }));
}

function filterRecent(expenses, today = new Date()) {
  const limit = new Date(today);
  limit.setDate(today.getDate() - 7);
  return expenses.filter(item => item.date >= limit && item.date <= today);
}

function filterExpenses(expenses, query = '', category = 'Todas') {
  const term = query.trim().toLocaleLowerCase('pt-BR');
  return expenses.filter(item =>
    (category === 'Todas' || item.category === category)
    && item.description.toLocaleLowerCase('pt-BR').includes(term)
  );
}

function summarizeExpenses(expenses) {
  return {
    count: expenses.length,
    total: expenses.reduce((sum, item) => sum + item.amount, 0),
  };
}

function columnsForWidth(width) {
  return width > 600 ? 2 : 1;
}

function formatDate(date) {
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

module.exports = {
  CATEGORIES, normalizeAmountInput, toAmount, validate,
  expensesReducer, deserializeExpenses, filterRecent, filterExpenses,
  summarizeExpenses, columnsForWidth, formatDate,
};
