const express = require("express");
const {
  signUp,
  logIn,
  logOut,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const signupDataValidate = require("../middlewares/signupDataValidate");
const loginDataValidate = require("../middlewares/loginDataValidate");
const authenticateUser = require("../middlewares/authenticateUser");
const router = express.Router();

//user
router.post("/signup", signupDataValidate, signUp);
router.route("/login").post(loginDataValidate, logIn).get(authenticateUser);
router.get("/logout", logOut);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);

module.exports = router;
