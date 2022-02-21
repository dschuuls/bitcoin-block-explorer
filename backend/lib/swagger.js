const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'nuri-challenge',
    version: '1.0.0',
    description: 'An API to retrieve data from the Bitcoin blockchain'
  },
};

const options = {
  swaggerDefinition,
  apis: ['routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
