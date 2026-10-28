const express = require('express');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/pedidos', pedidoRoutes);

// Middleware simples para rotas inexistentes.
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

// Tratamento de erros inesperados e JSON inválido.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ erro: 'JSON inválido.' });
  }
  console.error('Erro inesperado:', err);
  return res.status(500).json({ erro: 'Erro interno do servidor.' });
});

app.listen(PORT, function () {
  console.log('Servidor rodando na porta ' + PORT);
});

module.exports = app;
