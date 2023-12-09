const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  // const idleLimit = 15000;
  // let disconnectTimeout;
  // let disconnectTimeoutMsg;

  // function registerTimeouts() {
  //   disconnectTimeout = setTimeout(() => {
  //     socket.disconnect();
  //   }, idleLimit);

  //   disconnectTimeoutMsg = setTimeout(() => {
  //     socket.emit(
  //       'mensagem',
  //       'Sua conexão será fechada em breve. Interage ai irmão'
  //     );
  //   }, idleLimit * 0.75);
  // }

  // registerTimeouts();

  // socket.onAny((event, ...args) => {
  //   clearTimeout(disconnectTimeout);
  //   clearTimeout(disconnectTimeoutMsg);
  //   registerTimeouts();
  // });

  // Recebe nome do user
  socket.on('userName', (data) => {
    socket.emit('retMsg', data);
  });

  socket.on('mensagem', (data) => {
    console.log('Recebi informações:', data);
  });

  //Evento de ouvir a mensagem
  socket.on('fernando', (data) => {
    console.log('O fernando é:', data);
  });

  //Evento para ouvir o disconnect
  socket.on('disconnect', (reason) => {
    console.log('a user disconnected :( ', socket.id, reason);
  });
});

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
