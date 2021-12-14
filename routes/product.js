const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("../controllers/product");
//router.post("/register", register);
//router.post("/login", login);

router.route("/").get(getAllProducts).post(createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProductById)
  .patch(updateProductById);

module.exports = router;
