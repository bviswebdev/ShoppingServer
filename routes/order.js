const express = require("express");
const router = express.Router();
const { auth, authUser } = require("../middleware/authentication");
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
} = require("../controllers/order");
//router.post("/register", register);
//router.post("/login", login);

router.route("/").get(getAllOrders).post(auth, authUser, createOrder);
router
  .route("/:id")
  .get(getOrderById)
  .delete(auth, authUser, deleteOrderById)
  .patch(auth, authUser, updateOrderById);

module.exports = router;
