const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { createJWT } = require("../utils");

const registerUser = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new BadRequestError("Email already exist");
  }
  const response = await User.create({ email, name, password });

  const user = {
    name: response.name,
    email: response.email,
    userId: response._id,
  };
  const token = createJWT(user)
  user.token = token;

  res.status(StatusCodes.CREATED).json(user);
};

const loginUser = async (req, res) => {};

const logoutUser = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
