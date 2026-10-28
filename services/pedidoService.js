const { validarPedido, validarAtualizacao, validarId } = require('../validators/pedidoValidator');
const { AppError } = require('../utils/AppError');

// Armazenamento em memória, permitido no enunciado.
const pedidos = [];
let proximoId = 1;

function criar(dados) {
  console.log('2 - SERVICE recebeu', dados);

  const erros = validarPedido(dados);
  if (erros.length > 0) {
    throw new AppError(400, 'Dados inválidos.', erros);
  }

  const pedido = {
    id: proximoId++,
    cliente: dados.cliente.trim(),
    tipo: dados.tipo,
    valor: dados.valor,
    prioridade: dados.prioridade,
    status: 'recebido'
  };

  pedidos.push(pedido);
  console.log('3 - SERVICE criou', pedido);
  return { ...pedido };
}

function listar() {
  console.log('2 - SERVICE listando pedidos');
  return pedidos.map((pedido) => ({ ...pedido }));
}

function buscarPorId(id) {
  const idValidado = validarId(id);
  const pedido = pedidos.find((item) => item.id === idValidado);

  if (!pedido) {
    throw new AppError(404, 'Pedido com ID ' + idValidado + ' não encontrado.');
  }

  console.log('2 - SERVICE encontrou', pedido);
  return { ...pedido };
}

function atualizarStatus(id, dados) {
  const idValidado = validarId(id);
  const pedido = pedidos.find((item) => item.id === idValidado);

  if (!pedido) {
    throw new AppError(404, 'Pedido com ID ' + idValidado + ' não encontrado.');
  }

  const erros = validarAtualizacao(dados, pedido.status);
  if (erros.length > 0) {
    throw new AppError(400, 'Atualização inválida.', erros);
  }

  pedido.status = dados.status;
  console.log('3 - SERVICE atualizou', pedido);
  return { ...pedido };
}

function limparParaTestes() {
  pedidos.length = 0;
  proximoId = 1;
}

module.exports = { criar, listar, buscarPorId, atualizarStatus, limparParaTestes };
