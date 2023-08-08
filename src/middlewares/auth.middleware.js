const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  try {
    // recuperarf el topekn
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next({
        status: 401,
        errorName: "no token",
        error: "no token present in headers",
      });
    }

    // veriricar el token - si es vcalido codifica la info y regresa un onbjeto con la info del user si no es valido manda una excepcion
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: "HS512",
    });
    req.user = decoded;
    next();
  } catch (error) {
    next({
      status: 498,
      errorName: "Invalid token",
      error,
    });
  }
};

module.exports = authenticate;
