const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const registerUser = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new BadRequestError("Email already exist");
  }
  const response = await User.create(req.body);

  const user = {
    name: response.name,
    email: response.email,
    userId: response._id,
  };
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });
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
