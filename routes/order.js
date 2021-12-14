const express = require("express");
const router = express.Router();
const { getAllOrders } = require("../controllers/order");
//router.post("/register", register);
//router.post("/login", login);

router.route("/").get(getAllOrders);

module.exports = router;
