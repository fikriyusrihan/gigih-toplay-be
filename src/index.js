/* eslint-disable no-console */
import mongoose from 'mongoose';
import server from './infrastructures/websocket/index.js';
import config from './config/index.js';

console.log('Starting server...');

mongoose.connect(config.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  mongoose.set('debug', true);

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
