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
    params: { id: cartId },
  } = req;

  const data = await cartModel.findById({
    _id: cartId,
  });
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const createCart = async (req, res) => {
  //const data = await productModel.find({});
  //console.log(req.body);
  let createData = req.body;
  const data = await cartModel.create(createData);
  //const data = { middleware: "middleware working" };
  res
    .status(StatusCodes.CREATED)
    .json({ statusMsg: "success", data: req.body });
};

const updateCartById = async (req, res) => {
  //const data = await productModel.find({});
  console.log("inside update");
  const {
    params: { id: cartId },
  } = req;

  let updateData = req.body;
  //console.log(updateData);
  const data = await cartModel.findByIdAndUpdate(
    {
      _id: cartId,
    },
    updateData,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const deleteCartById = async (req, res) => {
  //const data = await productModel.find({});
  const {
    params: { id: cartId },
  } = req;

  const data = await cartModel.findByIdAndDelete({
    _id: cartId,
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
