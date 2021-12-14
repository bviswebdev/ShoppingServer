const express = require("express");
const router = express.Router();
const { getAllCarts } = require("../controllers/cart");
//router.post("/register", register);
//router.post("/login", login);

router.route("/").get(getAllCarts);

module.exports = router;
