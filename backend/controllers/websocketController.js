import socketIo from 'socket.io';

const io = socketIo();

io.sockets.on('connection', (sk) => {
  let w = null;
  let b = null;
  let skColor = false;

  console.log('WebSocket connection received');

  sk.on('setup', (data) => {
    webSocketController.setupGame(sk, data, skColor, w, b);
  });
});

export default io;
