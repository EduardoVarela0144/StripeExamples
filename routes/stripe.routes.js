const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripe.controller");
const  stripeCustomerController = require("../controllers/stripe.customer.controller");
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

* /stripe/customer:
*   post:
*     summary: Crear un cliente.
*     description: Ejemplo de como crear un cliente con Stripe.
*     tags: [Stripe]
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             $ref: '#/definitions/CustomerInput'
*     responses:
*       200:
*         description: Cliente creado exitosamente.
*   get:
*     summary: Obtener todos los clientes.
*     description: Ejemplo de como obtener todos los clientes con Stripe.
*     tags: [Stripe]
*     responses:
*       200:
*         description: Clientes obtenidos exitosamente.

* /stripe/create_invoice:
*   post:
*     summary: Crear una factura.
*     description: Ejemplo de como crear una factura con Stripe.
*     tags: [Stripe]
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             $ref: '#/definitions/InvoiceInput'
*     responses:
*       200:
*         description: Factura generada exitosamente.

* /stripe/add_item_invoice:
*   post:
*     summary: Agregar un item a una factura.
*     description: Ejemplo de como agregar un item a una factura con Stripe.
*     tags: [Stripe]
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             $ref: '#/definitions/InvoiceAddItem'
*     responses:
*       200:
*         description: Item agregado exitosamente.


* /stripe/send_invoice:
*   post:
*     summary: Enviar una factura.
*     description: Ejemplo de como enviar una factura con Stripe.
*     tags: [Stripe]
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             $ref: '#/definitions/InvoiceSend'
*     responses:
*       200:
*         description: Factura enviada exitosamente.


* /stripe/attach_subscription:
*   post:
*     summary: Adjuntar una suscripción.
*     description: Ejemplo de como adjuntar una suscripción con Stripe.
*     tags: [Stripe]
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             $ref: '#/definitions/AttachSubscription'
*     responses:
*       200:
*         description: Suscripción adjuntada exitosamente.


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

*   CustomerInput:
*     type: object
*     required:
*       - email
*       - name
*       - phone
*     properties:
*       email:
*         type: string
*       name:
*         type: string
*       phone:
*         type: string

*   InvoiceInput:
*     type: object
*     required:
*       - customer
*     properties:
*       customer:
*         type: string

*   InvoiceAddItem:
*     type: object
*     required:
*       - invoice
*       - customer
*       - product
*     properties:
*       invoice:
*         type: string
*       customer:
*         type: string
*       product:
*         type: string

*   InvoiceSend:
*     type: object
*     required:
*       - invoice
*     properties:
*       invoice:
*         type: string


*   AttachSubscription:
*     type: object
*     required:
*       - customer
*       - product
*     properties:
*       customer:
*         type: string
*       product:
*         type: string




*/

router.post("/single_payment", upload.none(), stripeController.payment);
router.post("/create_invoice", upload.none(), stripeController.createInvoice);
router.post("/add_item_invoice", upload.none(), stripeController.addItemInvoice);
router.post("/send_invoice", upload.none(), stripeController.sendInvoice);
router.post("/attach_subscription", upload.none(), stripeController.attachSubscription);
router.post("/subscription", stripeController.subscription);
router.get("/complete", stripeController.complete);
router.post("/customer", upload.none(),  stripeCustomerController.createCustomer);
router.get("/customer", upload.none(),  stripeCustomerController.getCustomers);



module.exports = router;