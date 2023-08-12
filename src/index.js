import mongoose from 'mongoose';
import server from './infrastructures/websocket/index.js';
import config from './config/index.js';
import logger from './utils/logger/index.js';

logger.info('Starting server...');

mongoose.connect(config.MONGO_URI).then(() => {
  logger.info('Connected to MongoDB');
  mongoose.set('debug', true);

  server.listen(config.PORT, () => {
    logger.info(`API can be accessed on http://localhost:${config.PORT}/api/v1`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
