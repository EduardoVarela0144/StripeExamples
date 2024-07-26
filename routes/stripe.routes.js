const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripe.controller");
const multer = require("multer");
const upload = multer();

// Swagger documentation

/**
* @swagger
* tags:
*   name: Stripe
*   description: Endpoints para pruebas de Stripe
*/

/**
* @swagger

* /stripe/single_payment:
*   post:
*     summary: Generar un pago unico.
*     description: Ejemplo de como generar un pago unico con Stripe.
*     tags: [Stripe]
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             $ref: '#/definitions/SinglePaymentInput'
*     responses:
*       200:
*         description: Pago generado exitosamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 url:
*                   type: string
*                   description: URL de la sesión de pago.

* /stripe/subscription:
*   post:
*     summary: Hacer pago de una suscripción.
*     description: Ejemplo de como generar un pago unico con Stripe.
*     tags: [Stripe]
*     responses:
*       200:
*         description: Pago generado exitosamente.
*/



/**
* @swagger
* definitions:
*   SinglePaymentInput:
*     type: object
*     required:
*       - amount
*     properties:
*       amount:
*         type: number
*/

router.post("/single_payment", upload.none(), stripeController.payment);
router.post("/subscription", stripeController.subscription);
router.get("/complete", stripeController.complete);

module.exports = router;