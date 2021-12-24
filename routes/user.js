const express = require("express");
const router = express.Router();
const { auth, authAdmin, authUser } = require("../middleware/authentication");
const {
  getAllUsers,
  registerUser,
  loginUser,
  getLoginUserInfo,
  getUserByEmail,
  updateUserAddressById,
} = require("../controllers/user");
//router.post("/register", register);
//router.post("/login", login);

router.route("/count").get(getUserByEmail);
router.route("/").get(auth, authAdmin, getAllUsers);
router.route("/:id").get(auth, getLoginUserInfo);
router.route("/address/:id").patch(auth, authUser, updateUserAddressById);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
//router.route("/loginInfo").get(auth, getLoginUserInfo);

//router.post("/login", login);

module.exports = router;
