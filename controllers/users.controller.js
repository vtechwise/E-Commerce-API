const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");

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

const updateUser = async (req, res) => {
    const { name, email } = req.body
    if (!name || !email) {
        throw new BadRequestError('Please provide name and email ')
    }
    const user = await User.findOne({ _id: req.user.userId })
    user.name = name 
    user.email = email
    await user.save()
};

const deleteUser = (req, res) => {
  res.send("");
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || newPassword) {
    throw new BadRequestError("Please provude both input fields");
  }
  const user = await User.findOne({ _id: req.user.userId });
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid password");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Password updated successfully" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserPassword,
  updateUser,
  showCurrentUser,
};
