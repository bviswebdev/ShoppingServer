const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { userModel } = require("../models/UserModel");
const { cartModel } = require("../models/CartModel");

const getAllUsers = async (req, res) => {
  const data = await userModel.find({});
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const registerUser = async (req, res) => {
  const data = await userModel.create({ ...req.body });
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();

  const cart = await cartModel.findOne({
    userId: user._id,
  });

  res.status(StatusCodes.OK).json({ user, cart, token });
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
};
