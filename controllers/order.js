const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { orderModel } = require("../models/OrderModel");

const getAllOrders = async (req, res) => {
  const data = await orderModel.find({});
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const getOrderById = async (req, res) => {
  //const data = await productModel.find({});
  const {
    params: { id: orderId },
  } = req;

  const data = await orderModel.findById({
    _id: orderId,
  });
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const createOrder = async (req, res) => {
  //const data = await productModel.find({});

  let createData = req.body;
  createData._id = undefined;
  createData.orderDate = new Date(createData.orderDate);
  const data = await orderModel.create(createData);
  //const data = { middleware: "middleware working" };
  res
    .status(StatusCodes.CREATED)
    .json({ statusMsg: "success", data: req.body });
};

const updateOrderById = async (req, res) => {
  //const data = await productModel.find({});

  const {
    params: { id: orderId },
  } = req;

  let updateData = req.body;

  const data = await orderModel.findByIdAndUpdate(
    {
      _id: orderId,
    },
    updateData,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const deleteOrderById = async (req, res) => {
  //const data = await productModel.find({});
  const {
    params: { id: orderId },
  } = req;

  const data = await orderModel.findByIdAndDelete({
    _id: orderId,
  });

  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
};
