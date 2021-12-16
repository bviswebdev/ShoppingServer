const express = require("express");
const router = express.Router();
const { auth, authUser } = require("../middleware/authentication");
const {
  getAllCarts,
  getCartById,
  createCart,
  updateCartById,
  deleteCartById,
} = require("../controllers/cart");
//router.post("/register", register);
//router.post("/login", login);

router.route("/").get(getAllCarts).post(auth, authUser, createCart);
router
  .route("/:id")
  .get(getCartById)
  .delete(auth, authUser, deleteCartById)
  .patch(auth, authUser, updateCartById);

module.exports = router;
