const TIPOS_VALIDOS = ['entrega', 'retirada'];
const PRIORIDADES_VALIDAS = ['baixa', 'normal', 'alta'];
const STATUS_VALIDOS = ['recebido', 'em_preparacao', 'enviado', 'entregue', 'cancelado'];

const TRANSICOES = {
  recebido: ['em_preparacao', 'cancelado'],
  em_preparacao: ['enviado', 'cancelado'],
  enviado: ['entregue', 'cancelado'],
  entregue: [],
  cancelado: []
};

function validarPedido(dados) {
  const erros = [];

  if (!dados || typeof dados !== 'object' || Array.isArray(dados)) {
    return ['O corpo da requisição deve ser um objeto JSON.'];
  }

  if (typeof dados.cliente !== 'string' || dados.cliente.trim() === '') {
    erros.push('O campo "cliente" é obrigatório e não pode ficar vazio.');
  }

  if (typeof dados.tipo !== 'string' || !TIPOS_VALIDOS.includes(dados.tipo)) {
    erros.push('O campo "tipo" deve ser entrega ou retirada.');
  }

  if (typeof dados.valor !== 'number' || !Number.isFinite(dados.valor) || dados.valor <= 0) {
    erros.push('O campo "valor" deve ser numérico e maior que zero.');
  }

  if (typeof dados.prioridade !== 'string' || !PRIORIDADES_VALIDAS.includes(dados.prioridade)) {
    erros.push('O campo "prioridade" deve ser baixa, normal ou alta.');
  }

  return erros;
}


function validarId(id) {
  if (!/^\d+$/.test(String(id)) || Number(id) < 1) {
    throw Object.assign(new Error('O ID deve ser um número inteiro positivo.'), {
      statusCode: 400
    });
  }

  return Number(id);
}


function validarAtualizacao(dados, statusAtual) {
  if (!dados || typeof dados !== 'object' || Array.isArray(dados)) {
    return ['O corpo da requisição deve ser um objeto JSON.'];
  }

  if (typeof dados.status !== 'string' || !STATUS_VALIDOS.includes(dados.status)) {
    return ['O campo "status" deve ser recebido, em_preparacao, enviado, entregue ou cancelado.'];
  }

  if (!TRANSICOES[statusAtual].includes(dados.status)) {
    return ['Transição não permitida de "' + statusAtual + '" para "' + dados.status + '".'];
  }

  return [];
}

module.exports = { validarPedido, validarAtualizacao, validarId };
