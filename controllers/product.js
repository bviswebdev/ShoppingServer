const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { productModel } = require("../models/ProductModel");
const { auth, authAdmin } = require("../middleware/authentication");

const getAllProducts = async (req, res) => {
  const data = await productModel.find({}).lean();
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

//query.and([{ color: 'green' }, { status: 'ok' }])
//var query = require('url').parse(req.url,true).query;

const getProductById = async (req, res) => {
  //const data = await productModel.find({});
  const {
    params: { id: productId },
  } = req;

  const data = await productModel
    .findById({
      _id: productId,
    })
    .lean();
  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const getProductByNameandBrand = async (req, res) => {
  //const data = await productModel.find({});
  const {
    query: { name: productName, brand: productBrand },
  } = req;

  const data = await productModel
    .find(
      {
        name: productName,
      },
      { brand: productBrand }
    )
    .count();

  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const createProduct = async (req, res) => {
  //const data = await productModel.find({});
  //console.log(req.file);
  let createData = {};
  if (req.body.jsonData) {
    createData = JSON.parse(req.body.jsonData);
    //console.log(createData);
    createData._id = undefined;
    createData.productImage._id = undefined;
    createData.category._id = undefined;

    if (req.file) {
      createData.productImage.fileSource = req.file.buffer;
    }
  }
  //let createData = req.body;
  /*if (createData.productImage && createData.productImage.fileSource) {
    createData.productImage.fileSource = Buffer.from(
      createData.productImage.fileSource,
      "base64"
    );
  }*/
  console.log(createData);
  const data = await productModel.create(createData);
  //const data = { middleware: "middleware working" };
  res.status(StatusCodes.CREATED).json({ statusMsg: "success", data });
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
  const data = await productModel
    .find({})
    .sort({ purchases: -1 })
    .limit(5)
    .lean();

  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const getMostViewedProducts = async (req, res) => {
  const data = await productModel.find({}).sort({ views: -1 }).limit(5).lean();
  /*let arr = [];
  data.forEach((d) => {
    const dat = JSON.parse(JSON.stringify(d));
    dat.productImage.fileSource = Buffer.from(
      dat.productImage.fileSource
    ).toString("base64");
    arr.push(dat);
  });*/
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
  getProductByNameandBrand,
};
