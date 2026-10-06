const { test } = require('node:test');
const assert = require('node:assert/strict');

const {
  tratarValor,
  validarDespesa,
  filtrarPorCategoria,
  filtrarUltimos7Dias,
  somarDespesas,
  ultrapassaLimite,
} = require('../utils/despesas');

test('aceita valor com vírgula e converte para ponto', () => {
  assert.equal(tratarValor('12,50', ''), '12.50');
});

test('permite apagar o valor durante a digitação', () => {
  assert.equal(tratarValor('', '12'), '');
});

test('rejeita letras e mais de duas casas decimais', () => {
  assert.equal(tratarValor('abc', '12'), '12');
  assert.equal(tratarValor('12.345', '12.34'), '12.34');
});

test('aceita despesa com os campos preenchidos', () => {
  assert.equal(
    validarDespesa('Almoço', '25.50', 'Alimentação'),
    true
  );
});

test('rejeita campos vazios, descrição em branco e valor zero', () => {
  assert.equal(validarDespesa('', '10', 'Lazer'), false);
  assert.equal(validarDespesa('   ', '10', 'Lazer'), false);
  assert.equal(validarDespesa('Cinema', '', 'Lazer'), false);
  assert.equal(validarDespesa('Cinema', '10', ''), false);
  assert.equal(validarDespesa('Cinema', '0', 'Lazer'), false);
  assert.equal(validarDespesa('Cinema', '.', 'Lazer'), false);
});

test('filtra por categoria e permite exibir todas', () => {
  const despesas = [
    { id: '1', categoria: 'Alimentação', valor: 25 },
    { id: '2', categoria: 'Transporte', valor: 10 },
  ];

  assert.deepEqual(
    filtrarPorCategoria(despesas, 'Alimentação'),
    [despesas[0]]
  );

  assert.deepEqual(filtrarPorCategoria(despesas, 'Todas'), despesas);
  assert.deepEqual(filtrarPorCategoria(despesas, 'Lazer'), []);
});

test('recentes inclui os limites e exclui antigas e futuras', () => {
  const hoje = new Date(2026, 9, 5, 12);
  const despesas = [
    { id: '1', data: new Date(2026, 8, 28, 12) },
    { id: '2', data: new Date(2026, 9, 5, 12) },
    { id: '3', data: new Date(2026, 8, 28, 11, 59) },
    { id: '4', data: new Date(2026, 9, 5, 12, 1) },
  ];

  assert.deepEqual(
    filtrarUltimos7Dias(despesas, hoje),
    [despesas[0], despesas[1]]
  );
});

test('soma somente as despesas recebidas e retorna zero para lista vazia', () => {
  assert.equal(somarDespesas([{ valor: 25.5 }, { valor: 10 }]), 35.5);
  assert.equal(somarDespesas([]), 0);
});

test('bônus é ativado somente acima de 200 reais', () => {
  assert.equal(ultrapassaLimite(200), false);
  assert.equal(ultrapassaLimite(200.01), true);
});