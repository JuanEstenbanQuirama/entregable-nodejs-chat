const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw(); // throw es un manejador de errores
    next();
  } catch (error) {
    const errors = error.errors.length;
    return next({
      status: 400,
      errorName: "Invalid or missing data",
      error: { errorsQty: errors, errors: error.errors.map((e) => e.msg) }
    });
  }
};

module.exports = validateResult;
