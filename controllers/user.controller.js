const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, BadRequestError } = require("../errors");
const User = require("../models/user.model");

const registerUser = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new BadRequestError("Email already exist");
  }
  const user = (await User.create(req.body)).isSelected('-password');
  res.status(StatusCodes.CREATED).json(user);
};

const loginUser = async (req, res) => {};

const logoutUser = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
