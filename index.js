const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const stripeRoutes = require("./routes/stripe.routes");
const swaggerOptions = require("./swagger/swaggerOptions");
const errorHandler = require("./services/errorHandler");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const apiPrefix = "/api";

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de pruebas de Stripe y Paddle");
}
);

app.use(errorHandler);


app.use(`${apiPrefix}/docs` , swaggerUi.serve, swaggerUi.setup(swaggerOptions));
app.use(`${apiPrefix}/stripe`, stripeRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
