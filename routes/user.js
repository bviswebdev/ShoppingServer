const express = require("express");
const router = express.Router();
const { getAllUsers, registerUser, loginUser } = require("../controllers/user");
//router.post("/register", register);
//router.post("/login", login);

router.route("/").get(getAllUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
//router.post("/login", login);

module.exports = router;
