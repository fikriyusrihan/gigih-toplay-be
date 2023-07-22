import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/index.js';

const app = express();
app.use(express.json());

const port = 3000;

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening to port ${port}`);
});
