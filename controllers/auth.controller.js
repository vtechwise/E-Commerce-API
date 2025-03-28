const { StatusCodes } = require("http-status-codes");
const {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { createJWT, createTokenUser } = require("../utils");
const { attachCookieToResponse } = require("../utils/jwt");

const registerUser = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new BadRequestError("Email already exist");
  }
  const response = await User.create({ email, name, password });

  const user = createTokenUser(response);
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
  const correctPassword = await user.comparePassword(password);

  if (!correctPassword) {
    throw new UnauthenticatedError("Incorrect password");
  }
  const tokenUser = createTokenUser(user);
  // console.log(tokenUser);

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
