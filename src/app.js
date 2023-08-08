const express = require("express");
const morgan = require('morgan');
require("dotenv").config();

const apiRoutes = require('./routes');
const userRoutes = require("./routes/user.routes");
const { logError, errorHandler, handleOrmError, notFoundErrorHandler} = require("./middlewares/errors.middleware");
const errorRoutes = require("./routes/error.routes");

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(morgan('tiny'));

apiRoutes(app);

app.get("/", (req, res) => {
  res.send("Welcome to mi server");
});

//middleware de error

errorRoutes(app);

app.listen(PORT, () => {
  console.log(`server listen in port ${PORT}`);
});
