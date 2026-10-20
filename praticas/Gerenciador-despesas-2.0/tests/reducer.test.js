const { test } = require('node:test');
const assert = require('node:assert/strict');
const { expensesReducer, deserializeExpenses } = require('../src/utils/expenses');

const data = { description: 'Almoço', amount: 18.5, date: new Date(2026, 9, 19), category: 'Alimentação' };

test('ADD gera IDs únicos, adiciona no início e não modifica o array anterior', () => {
  const original = [];
  const one = expensesReducer(original, { type: 'ADD', payload: data });
  const two = expensesReducer(one, { type: 'ADD', payload: data });
  assert.equal(original.length, 0);
  assert.equal(one.length, 1);
  assert.equal(two.length, 2);
  assert.equal(typeof one[0].id, 'string');
  assert.notEqual(two[0].id, two[1].id);
  assert.notStrictEqual(one, original);
});

test('UPDATE altera apenas a despesa correspondente e conserva o ID', () => {
  const old = [{ id: 'a', ...data }, { id: 'b', ...data }];
  const next = expensesReducer(old, { type: 'UPDATE', payload: { id: 'a', data: { amount: 50, id: 'indevido' } } });
  assert.equal(next[0].id, 'a');
  assert.equal(next[0].amount, 50);
  assert.strictEqual(next[1], old[1]);
  assert.equal(old[0].amount, 18.5);
});

test('DELETE remove apenas o ID selecionado sem mutar os dados', () => {
  const old = [{ id: 'a', ...data }, { id: 'b', ...data }];
  assert.deepEqual(expensesReducer(old, { type: 'DELETE', payload: 'a' }).map(x => x.id), ['b']);
  assert.equal(old.length, 2);
  assert.deepEqual(expensesReducer(old, { type: 'DELETE', payload: 'inexistente' }), old);
});

test('SET substitui a lista e pode zerar todas as despesas', () => {
  const old = [{ id: 'a', ...data }];
  assert.deepEqual(expensesReducer(old, { type: 'SET', payload: [] }), []);
  assert.equal(old.length, 1);
  assert.strictEqual(expensesReducer(old, { type: 'DESCONHECIDA' }), old);
});

test('JSON persistido restaura Date e valores alterados; sem dados inicia vazio', () => {
  const restored = deserializeExpenses(JSON.stringify([{ id: 'a', ...data, amount: 31 }]));
  assert.equal(restored[0].amount, 31);
  assert.ok(restored[0].date instanceof Date);
  assert.deepEqual(deserializeExpenses(null), []);
});
