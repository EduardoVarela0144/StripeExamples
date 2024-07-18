const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Pruebas Stripe",
      version: "1.0.0",
      description: "Guia de uso de la API de pruebas de Stripe",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [path.join(process.cwd(), "/routes/*.routes.js")],
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
