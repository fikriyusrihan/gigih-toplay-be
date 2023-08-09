/* eslint-disable no-console */
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from '../express/index.js';

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
  path: '/api/v1/comments',
});

io.on('connection', (socket) => {
  console.log('A user connected');

  const { videoId } = socket.handshake.query;
  socket.join(videoId);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.set('io', io);

export default server;
