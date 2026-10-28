const pedidoService = require('../services/pedidoService');

function criar(req, res, next) {
  console.log('1 - CONTROLLER recebeu', req.body);

  try {
    const pedido = pedidoService.criar(req.body);
    console.log('4 - CONTROLLER enviando resposta', pedido);
    return res.status(201).json(pedido);
  } catch (erro) {
    return next(erro);
  }
}

function listar(req, res, next) {
  console.log('1 - CONTROLLER solicitou listagem');
  try {
    return res.status(200).json(pedidoService.listar());
  } catch (erro) {
    return next(erro);
  }
}

function buscarPorId(req, res, next) {
  console.log('1 - CONTROLLER consultando ID', req.params.id);
  try {
    return res.status(200).json(pedidoService.buscarPorId(req.params.id));
  } catch (erro) {
    return next(erro);
  }
}

function atualizarStatus(req, res, next) {
  console.log('1 - CONTROLLER recebeu atualização', req.params.id, req.body);
  try {
    return res.status(200).json(
      pedidoService.atualizarStatus(req.params.id, req.body)
    );
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { criar, listar, buscarPorId, atualizarStatus };
