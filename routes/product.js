const express = require("express");
const router = express.Router();
const { auth, authAdmin } = require("../middleware/authentication");
const multer = require("multer");
//const upload = multer({ dest: 'uploads/' })
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
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
} = require("../controllers/product");
//router.post("/register", register);
//router.post("/login", login);

router.route("/mvproducts").get(getMostViewedProducts);
router.route("/mpproducts").get(getMostPurchasedProducts);
router.route("/categories").get(getAllCategories);
router.route("/count").get(getProductByNameandBrand);
router.route("/categorycount").get(getCategoryByName);
router
  .route("/")
  .get(getAllProducts)
  .post(auth, authAdmin, upload.single("fileSource"), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(auth, authAdmin, deleteProductById)
  .patch(auth, authAdmin, upload.single("fileSource"), updateProductById);

module.exports = router;
