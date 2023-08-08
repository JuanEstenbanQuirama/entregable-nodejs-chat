const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    await Users.create({ username, email, password: hashed });
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, username, password} = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return next({
        status: 400,
        errorName: "Invalid credential",
        error: "incorrect email /password",
      });
    }
    // validando el password = tomo el pass en texto plano y lo comparo con el pass almacenado, me retorna un boolena
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      // return res.status(400).json({
      //   message: "Incorrect email or password",
      // });
      return next({
        status: 400,
        errorName: "Invalid password",
        error: "incorrect email /password",
      });
    }

    const {
      id,
      firstname,
      lastname,
      profileImage,
      validEmail,
      createdAt,
      updatedAt,
    } = user;

    const token = jwt.sign(
      { id, username, email, firstname, lastname },
      process.env.JWT_SECRET,
      { algorithm: "HS512", expiresIn: "20M" }
    );

    res.json({
      id,
      username,
      email,
      firstname,
      lastname,
      profileImage,
      validEmail,
      createdAt,
      updatedAt,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.findAll();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createUser,
  loginUser,
  getAllUsers
};
