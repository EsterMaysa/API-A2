const { AppError } = require('../utils/AppError');

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  if (err instanceof AppError || Number.isInteger(err.statusCode)) {
    const resposta = { erro: err.message };
    if (err.details) resposta.detalhes = err.details;
    return res.status(err.statusCode).json(resposta);
  }

  console.error('Erro inesperado:', err);
  return res.status(500).json({ erro: 'Erro interno do servidor.' });
}
module.exports = { errorHandler };
