const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { productModel } = require("../models/ProductModel");
const { auth, authAdmin } = require("../middleware/authentication");

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
  //console.log(req.body);
  let createData = req.body;
  if (createData.productImage && createData.productImage.fileSource) {
    createData.productImage.fileSource = Buffer.from(
      createData.productImage.fileSource,
      "base64"
    );
  }

  const data = await productModel.create(createData);
  //const data = { middleware: "middleware working" };
  res
    .status(StatusCodes.CREATED)
    .json({ statusMsg: "success", data: req.body });
};

const updateProductById = async (req, res) => {
  //const data = await productModel.find({});
  console.log("inside update");
  const {
    params: { id: productId },
  } = req;

  let updateData = req.body;
  if (updateData.productImage && updateData.productImage.fileSource) {
    updateData.productImage.fileSource = Buffer.from(
      updateData.productImage.fileSource,
      "base64"
    );
  }
  //console.log(updateData);
  const data = await productModel.findByIdAndUpdate(
    {
      _id: productId,
    },
    updateData,
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

const getMostPurchasedProducts = async (req, res) => {
  const data = await productModel.find({}).sort({ purchases: -1 }).limit(5);
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const getMostViewedProducts = async (req, res) => {
  const data = await productModel.find({}).sort({ views: -1 }).limit(5);
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const getAllCategories = async (req, res) => {
  const data = await productModel.find({}).distinct("category.catName");
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
  getMostPurchasedProducts,
  getMostViewedProducts,
  getAllCategories,
};
