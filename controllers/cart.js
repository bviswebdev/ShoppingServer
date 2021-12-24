const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { cartModel } = require("../models/CartModel");

const getAllCarts = async (req, res) => {
  const data = await cartModel.find({});
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const getCartById = async (req, res) => {
  //const data = await productModel.find({});
  const {
    params: { id: cartUserId },
  } = req;

  const data = await cartModel.findById({
    userId: cartUserId,
  });
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const createCart = async (req, res) => {
  //const data = await productModel.find({});

  let createData = req.body;

  createData._id = undefined;
  createData.cartItems.forEach((element) => {
    element._id = undefined;
    element.cartItemProduct._id = undefined;
    element.cartItemProduct.productImageUrl = undefined;
  });
  //createData.CartItem._id = undefined;
  //createData.CartItem.CartItemProduct._id = undefined;

  const data = await cartModel.create(createData);
  //const data = { middleware: "middleware working" };
  res
    .status(StatusCodes.CREATED)
    .json({ statusMsg: "success", data: req.body });
};

const updateCartById = async (req, res) => {
  //const data = await productModel.find({});

  const {
    params: { id: cartUserId },
  } = req;

  let updateData = req.body;
  updateData._id = undefined;
  updateData.cartItems.forEach((element) => {
    element._id = undefined;
    element.cartItemProduct._id = undefined;
    element.cartItemProduct.productImageUrl = undefined;
  });

  const data = await cartModel.findOneAndUpdate(
    {
      userId: cartUserId,
    },
    updateData,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const deleteCartById = async (req, res) => {
  //const data = await productModel.find({});
  const {
    params: { id: cartUserId },
  } = req;

  const data = await cartModel.deleteOne({
    userId: cartUserId,
  });

  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

module.exports = {
  getAllCarts,
  getCartById,
  createCart,
  updateCartById,
  deleteCartById,
};
