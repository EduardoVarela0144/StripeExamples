const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
require("dotenv").config();

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
        url: `${process.env.BASE_URL}/api`,
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
