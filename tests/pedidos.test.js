const request = require('supertest');
const app = require('../app-test');
const service = require('../services/pedidoService');

const pedidoValido = {
  cliente: 'Carlos Silva',
  tipo: 'entrega',
  valor: 350,
  prioridade: 'normal'
};

beforeEach(() => service.limparParaTestes());

describe('API de gerenciamento de pedidos', () => {
  test('POST cria pedido válido', async () => {
    const resposta = await request(app).post('/pedidos').send(pedidoValido);

    if (resposta.status !== 201) {
      throw new Error('O status deveria ser 201');
    }

    if (resposta.body.status !== 'recebido') {
      throw new Error('O pedido deveria estar recebido');
    }

    if (resposta.body.cliente !== 'Carlos Silva') {
      throw new Error('O nome do cliente está incorreto');
    }
  });

  test('POST rejeita dados inválidos', async () => {
    const resposta = await request(app).post('/pedidos')
      .send({ ...pedidoValido, cliente: ' ', valor: -1 });

    if (resposta.status !== 400) {
      throw new Error('O status deveria ser 400');
    }

    if (!resposta.body.detalhes || resposta.body.detalhes.length === 0) {
      throw new Error('Deveria retornar os detalhes dos erros');
    }
  });

  test('GET lista pedidos', async () => {
    await request(app).post('/pedidos').send(pedidoValido);
    const resposta = await request(app).get('/pedidos');

    if (resposta.status !== 200) {
      throw new Error('O status deveria ser 200');
    }

    if (resposta.body.length !== 1) {
      throw new Error('Deveria existir um pedido na lista');
    }
  });

  test('GET retorna 404 para ID inexistente', async () => {
    const resposta = await request(app).get('/pedidos/999');

    if (resposta.status !== 404) {
      throw new Error('O status deveria ser 404');
    }
  });

  test('PATCH atualiza status', async () => {
    await request(app).post('/pedidos').send(pedidoValido);
    const resposta = await request(app).patch('/pedidos/1/status')
      .send({ status: 'em_preparacao' });

    if (resposta.status !== 200) {
      throw new Error('O status deveria ser 200');
    }

    if (resposta.body.status !== 'em_preparacao') {
      throw new Error('O pedido deveria estar em preparação');
    }
  });

  test('PATCH rejeita transição inválida', async () => {
    await request(app).post('/pedidos').send(pedidoValido);
    const resposta = await request(app).patch('/pedidos/1/status')
      .send({ status: 'entregue' });

    if (resposta.status !== 400) {
      throw new Error('O status deveria ser 400');
    }
  });
});
