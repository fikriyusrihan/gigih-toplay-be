/* eslint-disable no-console */
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import * as http from 'http';
import app from './infrastructures/express/index.js';
import config from './utils/config.js';

console.log('Starting server...');

let server;

mongoose.connect(config.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  mongoose.set('debug', true);

  server = http.createServer(app);

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

  server.listen(config.PORT, () => {
    console.log(`Listening to port ${config.PORT}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
