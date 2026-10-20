const { test } = require('node:test');
const assert = require('node:assert/strict');
const { filterRecent, filterExpenses, summarizeExpenses, columnsForWidth } = require('../src/utils/expenses');
const now = new Date(2026, 9, 19, 12);
const data = [
  { id: '1', description: 'Almoço no RU', amount: 18.5, date: new Date(2026, 9, 19, 12), category: 'Alimentação' },
  { id: '2', description: 'Passagem', amount: 5.5, date: new Date(2026, 9, 12, 12), category: 'Transporte' },
  { id: '3', description: 'ALMOÇO ontem', amount: 10, date: new Date(2026, 9, 18, 12), category: 'Alimentação' },
  { id: '4', description: 'Livro', amount: 89.9, date: new Date(2026, 9, 12, 11, 59), category: 'Material' },
  { id: '5', description: 'Futura', amount: 50, date: new Date(2026, 9, 19, 12, 1), category: 'Outros' },
];

test('últimos sete dias: inclui limites, exclui anterior e futura', () => {
  assert.deepEqual(filterRecent(data, now).map(x => x.id), ['1', '2', '3']);
});
test('busca ignora caixa e espaços externos', () => {
  assert.deepEqual(filterExpenses(data, ' ALM ', 'Todas').map(x => x.id), ['1', '3']);
});
test('categoria e busca são combinadas e total reflete resultado', () => {
  const filtered = filterExpenses(data, 'alm', 'Alimentação');
  assert.deepEqual(filtered.map(x => x.id), ['1', '3']);
  assert.deepEqual(summarizeExpenses(filtered), { count: 2, total: 28.5 });
  assert.deepEqual(filterExpenses(data, 'alm', 'Material'), []);
  assert.deepEqual(summarizeExpenses([]), { count: 0, total: 0 });
});
test('responsividade troca para duas colunas só acima de 600px', () => {
  assert.equal(columnsForWidth(320), 1);
  assert.equal(columnsForWidth(600), 1);
  assert.equal(columnsForWidth(601), 2);
});
