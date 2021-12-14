const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { cartModel } = require("../models/CartModel");

const getAllCarts = async (req, res) => {
  const data = await cartModel.find({});
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

module.exports = {
  getAllCarts,
};
