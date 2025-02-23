const { StatusCodes } = require("http-status-codes");
const {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { createJWT } = require("../utils");
const { attachCookieToResponse } = require("../utils/jwt");

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
  attachCookieToResponse(res, user);
  res.status(StatusCodes.CREATED).json(user);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide both value");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Invalid Credentials");
  }
  const correctPassword = user.comparePassword(password);
  if (!correctPassword) {
    throw new UnauthenticatedError("Incorrect password");
  }
  const tokenUser = {
    name: user.name,
    email: user.email,
    userId: user._id,
    role: user.role,
  };
  attachCookieToResponse(res, tokenUser);
  res.status(StatusCodes.OK).json(tokenUser);
};

const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
