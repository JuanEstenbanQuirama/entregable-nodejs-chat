const {
  logError,
  handleOrmError,
  errorHandler,
  notFoundErrorHandler,
} = require("../middlewares/errors.middleware");

const errorRoutes = (app) => {
  app.use(logError); // muestra en consola
  app.use(handleOrmError); //
  app.use(errorHandler);
  app.use(notFoundErrorHandler);
};

module.exports = errorRoutes;
