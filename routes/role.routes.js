/**
 * @swagger
 * tags:
 *   name: Stripe
 *   description: Pruebas Stripe
 */

/**
 * @swagger
 * /org:
 *   post:
 *     summary: Crear una organizacion
 *     description: Crea una nueva organizacion
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RoleInput'
 *     responses:
 *       '201':
 *         description: Rol creado exitosamente
 *         schema:
 *           $ref: '#/definitions/Role'
 *       '500':
 *         description: Error de servidor
 *     security:
 *       - BearerAuth: []
 *   get:
 *     summary: Obtener todas las organizaciones
 *     description: Obtiene todos los roles disponibles en el sistema.
 *     tags: [Roles]
 *     responses:
 *       '200':
 *         description: Lista de roles obtenida exitosamente
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Role'
 *       '500':
 *         description: Error de servidor
 *     security:
 *         - BearerAuth: []
 */

/**
 * @swagger
 * definitions:
 *   RoleInput:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *   Role:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       description:
 *         type: string
 */

