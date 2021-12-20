const express = require("express");
const router = express.Router();
const { auth, authAdmin } = require("../middleware/authentication");
const {
  getAllUsers,
  registerUser,
  loginUser,
  getLoginUserInfo,
} = require("../controllers/user");
//router.post("/register", register);
//router.post("/login", login);

router.route("/").get(auth, authAdmin, getAllUsers);
router.route("/:id").get(auth, getLoginUserInfo);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
//router.route("/loginInfo").get(auth, getLoginUserInfo);

//router.post("/login", login);

module.exports = router;
