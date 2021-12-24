const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { productModel } = require("../models/ProductModel");
const { auth, authAdmin } = require("../middleware/authentication");

const getAllProducts = async (req, res) => {
  const data = await productModel.find({ isActive: true }).lean();
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

const getCategoryByName = async (req, res) => {
  //const data = await productModel.find({});
  const {
    query: { name: categoryName },
  } = req;

  const data = await productModel
    .find({
      "category.catName": categoryName,
    })
    .count();

  res.status(StatusCodes.OK).json({ statusMsg: "success", data });
};

const createProduct = async (req, res) => {
  //const data = await productModel.find({});

  let createData = {};
  if (req.body.jsonData) {
    createData = JSON.parse(req.body.jsonData);

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

  const data = await productModel.create(createData);
  //const data = { middleware: "middleware working" };
  res.status(StatusCodes.CREATED).json({ statusMsg: "success", data });
};

const updateProductById = async (req, res) => {
  //const data = await productModel.find({});

  const {
    params: { id: productId },
  } = req;

  let createData = {};
  let updateData = {};
  if (req.body.jsonData) {
    createData = JSON.parse(req.body.jsonData);

    updateData["name"] = createData.name;
    updateData["brand"] = createData.brand;
    updateData["description"] = createData.description;
    updateData["unitPrice"] = createData.unitPrice;
    updateData["quantity"] = createData.quantity;
    if (req.file) {
      let productImage = {};
      productImage["fileName"] = createData.productImage.fileName;
      productImage["fileType"] = createData.productImage.fileType;
      productImage["fileSize"] = createData.productImage.fileSize;
      productImage["fileUrl"] = createData.productImage.fileUrl;
      productImage["fileSource"] = req.file.buffer;
      updateData["productImage"] = productImage;
    }

    updateData["isActive"] = createData.isActive;
    let category = {};
    category["catName"] = createData.category.catName;
    category["catDesc"] = createData.category.catDesc;
    category["catImgUrl"] = createData.category.catImgUrl;
    category["catActive"] = createData.category.catActive;
    updateData["category"] = category;
  }

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

  const data = await productModel.findByIdAndUpdate(
    {
      _id: productId,
    },
    { isActive: false },
    { new: true, runValidators: true }
  );

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
  const data = await productModel
    .find({ isActive: true })
    .distinct("category.catName");
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
  getCategoryByName,
};
