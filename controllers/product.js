const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { productModel } = require("../models/ProductModel");

const getAllProducts = async (req, res) => {
  const data = await productModel.find({});
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

module.exports = {
  getAllProducts,
};
