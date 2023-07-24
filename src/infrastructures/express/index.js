import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../docs/index.js';
import routes from './routes/index.js';

const app = express();
app.use(express.json());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

app.use('/api/v1', routes);

export default app;
