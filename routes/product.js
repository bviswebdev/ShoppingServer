const express = require("express");
const router = express.Router();
const { getAllProducts } = require("../controllers/product");
//router.post("/register", register);
//router.post("/login", login);

router.route("/").get(getAllProducts);

module.exports = router;
