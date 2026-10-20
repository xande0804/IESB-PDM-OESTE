const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validate, normalizeAmountInput, toAmount } = require('../src/utils/expenses');
const now = new Date(2026, 9, 19, 12);
const sample = () => ({ description: 'Almoço', amount: '18,50', date: new Date(2026, 9, 19, 10), category: 'Alimentação' });

test('dados válidos não geram erros; vírgula e ponto funcionam', () => {
  assert.deepEqual(validate(sample(), now), {});
  assert.equal(toAmount('18,50'), 18.5);
  assert.equal(toAmount('18.50'), 18.5);
});
test('todos os campos inválidos geram mensagens separadas', () => {
  const errors = validate({ description: '', amount: '', date: new Date(2026, 9, 20), category: '' }, now);
  assert.deepEqual(Object.keys(errors).sort(), ['amount', 'category', 'date', 'description']);
});
test('descrição exige três caracteres sem contar espaços externos', () => {
  for (const description of ['', '  ', 'ab', ' ab ']) assert.ok(validate({ ...sample(), description }, now).description);
  assert.equal(validate({ ...sample(), description: 'abc' }, now).description, undefined);
});
test('valores zero, negativo, NaN, vazios e acima de duas casas são inválidos', () => {
  for (const amount of ['', '0', '0.00', '-5', 'abc', '.', '12.345', '1,234', 'Infinity']) {
    assert.ok(validate({ ...sample(), amount }, now).amount, amount);
  }
});
test('datas futuras são inválidas; hoje e passado são válidos', () => {
  assert.ok(validate({ ...sample(), date: new Date(2026, 9, 20) }, now).date);
  assert.equal(validate({ ...sample(), date: new Date(2026, 9, 19) }, now).date, undefined);
});
test('categoria obrigatória e limitada às opções da Aula 09', () => {
  for (const category of ['', 'Lazer', 'Contas']) assert.ok(validate({ ...sample(), category }, now).category);
  for (const category of ['Alimentação', 'Transporte', 'Material', 'Outros']) {
    assert.equal(validate({ ...sample(), category }, now).category, undefined);
  }
});
test('máscara substitui vírgula, limita decimais e rejeita letras', () => {
  assert.equal(normalizeAmountInput('12,50', ''), '12.50');
  assert.equal(normalizeAmountInput('', '12'), '');
  assert.equal(normalizeAmountInput('12.345', '12.34'), '12.34');
  assert.equal(normalizeAmountInput('abc', '12'), '12');
});
