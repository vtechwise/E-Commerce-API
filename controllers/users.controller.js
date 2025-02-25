const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const { NotFoundError } = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user with this given id ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
  res.send("get single user");
};

const showCurrentUser = (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = (req, res) => {
  res.send("update user");
};

const deleteUser = (req, res) => {
  res.send("");
};

const updateUserPassword = (req, res) => {
  res.send("update password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserPassword,
  updateUser,
  showCurrentUser,
};
