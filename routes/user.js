const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/user");
//router.post("/register", register);
//router.post("/login", login);

router.route("/").get(getAllUsers);

module.exports = router;
