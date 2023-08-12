import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerDocument from '../../docs/index.js';
import routes from './routes/index.js';
import { errorConverter, errorHandler } from './middlewares/error.js';

const app = express();

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 200, // 100 requests per 2 minutes
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use(cors());

// Use rate limiter to limit requests
app.use(limiter);

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
