const express = require('express');
const pedidoRoutes = require('./routes/pedidoRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use('/pedidos', pedidoRoutes);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ erro: 'JSON inválido.' });
  }

  return errorHandler(err, req, res, next);
});

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

module.exports = app;
