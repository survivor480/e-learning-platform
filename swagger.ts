import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Learnings API',
      version: '1.0.0',
      description: 'This document contains all the APIs for Learning Backend',
    },
  },
  apis: ['./routes/*.ts'], // Path to the API routes files
};

const specs = swaggerJsdoc(options);

export default {
  serveSwagger: swaggerUi.serve,
  setupSwagger: swaggerUi.setup(specs),
};
