# Requisições para testar no Postman

Antes, rode `npm start`.

1. **Criar pedido**
   - POST `http://localhost:3000/pedidos`
   - Body > raw > JSON:
   ```json
   {"cliente":"Carlos Silva","tipo":"entrega","valor":350,"prioridade":"normal"}
   ```
   - Esperado: 201.

2. **Testar validação**
   - POST `http://localhost:3000/pedidos`
   - Body:
   ```json
   {"cliente":" ","tipo":"entrega","valor":0,"prioridade":"normal"}
   ```
   - Esperado: 400.

3. **Listar**
   - GET `http://localhost:3000/pedidos`
   - Esperado: 200.

4. **Consultar ID inexistente**
   - GET `http://localhost:3000/pedidos/999`
   - Esperado: 404.

5. **Atualizar status**
   - PATCH `http://localhost:3000/pedidos/1/status`
   - Body:
   ```json
   {"status":"em_preparacao"}
   ```
   - Esperado: 200, desde que o pedido 1 tenha sido criado e ainda esteja `recebido`.

Tire suas próprias capturas reais para a pasta `evidencias/`.
