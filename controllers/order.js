const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { orderModel } = require("../models/OrderModel");

const getAllOrders = async (req, res) => {
  const data = await orderModel.find({});
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

module.exports = {
  getAllOrders,
};
