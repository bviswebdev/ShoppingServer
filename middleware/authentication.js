const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  console.log("inside autnetication");
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("passed token");
    // attach the user to the job routes
    req.user = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

const authAdmin = async (req, res, next) => {
  // check header

  const { role } = req.user;
  console.log(role);
  if (!role) {
    throw new UnauthenticatedError("Role Based Authentication invalid");
  }
  if (role !== "ADMIN") {
    throw new UnauthenticatedError(
      "Only administrator role can access this resource"
    );
  }
  next();
};

const authUser = async (req, res, next) => {
  // check header

  const { role } = req.user;
  console.log(role);
  if (!role) {
    throw new UnauthenticatedError("Role Based Authentication invalid");
  }
  if (role !== "USER") {
    throw new UnauthenticatedError(
      "Only user role can access the cart resource"
    );
  }
  next();
};

module.exports = { auth, authAdmin, authUser };
