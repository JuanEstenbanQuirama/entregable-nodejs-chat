const { check } = require("express-validator");
const validateResult = require("../middlewares/validate.middleware");

const loginUserValidator = [
  check("email", "error email")
    .exists()
    .withMessage("falta el campo email")
    .notEmpty()
    .withMessage("email no vacio")
    .isString()
    .withMessage("El email no es un string")
    .isEmail()
    .withMessage("NO tiene formato email"),
  check("password", "error password").exists().notEmpty().isString(),
  validateResult,
];

const messageSendValidator = [
  check("content", "error content")
    .exists()
    .withMessage("falta campo content")
    .notEmpty()
    .withMessage("no vacio")
    .isString()
    .withMessage("no es un string")
    .isLength({ min: 6, max: 500 }),
];

module.exports = {
    messageSendValidator
};
