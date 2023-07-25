import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerDocument from '../../docs/index.js';
import routes from './routes/index.js';
import { errorConverter, errorHandler } from './middlewares/error.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  '/api/v1/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

// Register routes
app.use('/api/v1', routes);

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle error
app.use(errorHandler);

export default app;
