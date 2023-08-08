const { Router } = require("express");
const { createUser, loginUser, getAllUsers } = require("../controllers/users.controller");
const { loginUserValidator, registerUserValidator } = require("../validators/users.validators");


const router = Router();

router.post("/users", registerUserValidator, createUser);

router.post("/login", loginUserValidator, loginUser);

router.get("/users", getAllUsers);

module.exports = router;
