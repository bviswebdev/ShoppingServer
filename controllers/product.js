const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { productModel } = require("../models/ProductModel");

const getAllProducts = async (req, res) => {
  const data = await productModel.find({});
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const getProductById = async (req, res) => {
  //const data = await productModel.find({});
  const {
    params: { id: productId },
  } = req;

  const data = await productModel.findById({
    _id: productId,
  });
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const createProduct = async (req, res) => {
  //const data = await productModel.find({});
  const data = await productModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ statusMsg: "success", data });
};

const updateProductById = async (req, res) => {
  //const data = await productModel.find({});
  const {
    params: { id: productId },
  } = req;

  const data = await productModel.findByIdAndUpdate(
    {
      _id: productId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const deleteProductById = async (req, res) => {
  //const data = await productModel.find({});
  const {
    params: { id: productId },
  } = req;

  const data = await productModel.findByIdAndDelete({
    _id: productId,
  });

  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
