import { createServer } from 'http';
import { Server } from 'socket.io';
import app from '../express/index.js';
import logger from '../../utils/logger/index.js';

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
  path: '/api/v1/comments',
});

io.on('connection', (socket) => {
  logger.info('A user connected to socket.io');

  const { videoId } = socket.handshake.query;
  socket.join(videoId);

  socket.on('disconnect', () => {
    logger.info('A user disconnected from socket.io');
  });
});

app.set('io', io);

export default server;
