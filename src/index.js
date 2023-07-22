import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/index.js';
import config from './utils/config.js';

const app = express();
app.use(express.json());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening to port ${config.PORT}`);
});
