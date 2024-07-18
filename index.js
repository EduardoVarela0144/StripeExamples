const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const roleRoutes = require("./routes/role.routes")
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger/swaggerOptions');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/roles', roleRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions))

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
