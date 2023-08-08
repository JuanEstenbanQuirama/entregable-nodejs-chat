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

const registerUserValidator = [
  check("username", "error username")
    .exists()
    .withMessage("falta campo username")
    .notEmpty()
    .withMessage("no vacio")
    .isString()
    .withMessage("no es un string")
    .isLength({ min: 6, max: 30 }),
  check("email", "error email")
    .exists()
    .withMessage("falta campo correo")
    .notEmpty()
    .withMessage("el campo de correo no debe estar vacio")
    .isString()
    .withMessage("el campo de correo no es string")
    .isEmail()
    .withMessage("no tiene formato de correo")
    .isLength({ min: 10, max: 50 })
    .withMessage("min 10 y maximo 50"),
  check("password", "error con el password")
    .exists()
    .withMessage("falta el campo de password")
    .notEmpty()
    .withMessage("el campo de password no debe esyaer vacio")
    .isString()
    .withMessage("el campo de password no es un string")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    )
    .withMessage("minimo 8, cosas etc"),
  validateResult,
];

module.exports = {
  loginUserValidator,
  registerUserValidator,
};
