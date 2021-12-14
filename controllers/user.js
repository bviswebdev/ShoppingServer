const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { userModel } = require("../models/UserModel");

const getAllUsers = async (req, res) => {
  const data = await userModel.find({});
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

module.exports = {
  getAllUsers,
};
