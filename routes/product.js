const express = require("express");
const router = express.Router();
const { auth, authAdmin } = require("../middleware/authentication");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
  getMostPurchasedProducts,
  getMostViewedProducts,
  getAllCategories,
} = require("../controllers/product");
//router.post("/register", register);
//router.post("/login", login);

router.route("/mvproducts").get(getMostViewedProducts);
router.route("/mpproducts").get(getMostPurchasedProducts);
router.route("/categories").get(getAllCategories);
router.route("/").get(getAllProducts).post(auth, authAdmin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(auth, authAdmin, deleteProductById)
  .patch(auth, authAdmin, updateProductById);

module.exports = router;
