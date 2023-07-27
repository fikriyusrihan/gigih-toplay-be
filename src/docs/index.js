import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Tokopedia Play - Documentation',
      version: '1.0.0',
      description: 'Tokopedia Play is a video streaming service that provides a variety of interesting videos that can be watched by users.',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: [
    './src/models/*.js',
    './src/infrastructures/express/routes/*.route.js',
  ],
};

export default swaggerJsdoc(options);
