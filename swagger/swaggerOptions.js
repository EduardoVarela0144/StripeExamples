const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
require("dotenv").config();

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Billing XYZ API",
      version: "1.0.0",
      description: "Guia de uso de la API de pruebas de Stripe y Paddle",
    },
    servers: [
      {
        url: `${process.env.BASE_URL}/api`,
      },
    ],
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
