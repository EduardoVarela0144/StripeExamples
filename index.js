const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const stripeRoutes = require('./routes/stripe.routes');

const swaggerOptions = require('./swagger/swaggerOptions');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions))
app.use('/api/v1/stripe', stripeRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});