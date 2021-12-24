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

  const userName = user.firstName + " " + user.lastName;
  const userEmail = user.email;
  const role = user.role;

  res.status(StatusCodes.OK).json({
    statusMsg: "success",
    data: { user, cart, token, role, email: userEmail, userName },
  });
};

const updateUserAddressById = async (req, res) => {
  //const data = await productModel.find({});

  const {
    params: { id: appUserId },
  } = req;

  let updateAddressData = req.body;
  updateAddressData._id = undefined;

  const data = await userModel.findByIdAndUpdate(
    {
      _id: appUserId,
    },
    { $push: { addresses: updateAddressData } },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const getLoginUserInfo = async (req, res) => {
  //const { email } = req.body;

  const {
    params: { id: emailId },
  } = req;

  if (!emailId) {
    throw new BadRequestError("Please provide email");
  }
  const user = await userModel.findOne({ email: emailId });
  if (!user) {
    throw new UnauthenticatedError("Invalid Login");
  }

  const cart = await cartModel.findOne({
    userId: user._id.toString(),
  });

  const userName = user.firstName + " " + user.lastName;
  const userEmail = user.email;
  const role = user.role;

  res.status(StatusCodes.OK).json({
    statusMsg: "success",
    data: { user, cart, role, email: userEmail, userName },
  });
};

const getUserByEmail = async (req, res) => {
  //const data = await productModel.find({});
  const {
    query: { email: userEmail },
  } = req;

  const data = await userModel
    .find({
      email: userEmail,
    })
    .count();

  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getLoginUserInfo,
  getUserByEmail,
  updateUserAddressById,
};
