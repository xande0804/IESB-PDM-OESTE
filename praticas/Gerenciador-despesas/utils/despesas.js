function tratarValor(texto, valorAnterior) {
  const textoLimpo = texto.replace(',', '.');
  const valorValido = /^\d*\.?\d{0,2}$/.test(textoLimpo);

  return valorValido ? textoLimpo : valorAnterior;
}

function validarDespesa(descricao, valor, categoria) {
  return (
    descricao.trim().length > 0 &&
    valor.trim().length > 0 &&
    /^\d*\.?\d{0,2}$/.test(valor) &&
    Number.isFinite(Number(valor)) &&
    Number(valor) > 0 &&
    categoria.trim().length > 0
  );
}

function filtrarPorCategoria(despesas, categoria) {
  if (categoria === 'Todas') {
    return despesas;
  }

  return despesas.filter((despesa) => despesa.categoria === categoria);
}

function filtrarUltimos7Dias(despesas, hoje = new Date()) {
  const seteDiasAtras = new Date(hoje);
  seteDiasAtras.setDate(hoje.getDate() - 7);

  return despesas.filter(
    (despesa) => despesa.data >= seteDiasAtras && despesa.data <= hoje
  );
}

function somarDespesas(despesas) {
  return despesas.reduce(
    (acumulador, despesa) => acumulador + despesa.valor,
    0
  );
}

function ultrapassaLimite(total) {
  return total > 200;
}

module.exports = {
  tratarValor,
  validarDespesa,
  filtrarPorCategoria,
  filtrarUltimos7Dias,
  somarDespesas,
  ultrapassaLimite,
};