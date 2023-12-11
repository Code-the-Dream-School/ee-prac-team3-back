const express = require("express");
const {
  signUp,
  logIn,
  logOut,
  getAdmin,
  getUser,
} = require("../controllers/userController");
const signupDataValidate = require("../middlewares/signupDataValidate");
const loginDataValidate = require("../middlewares/loginDataValidate");
const authenticateUser = require("../middlewares/authenticateUser");
const adminRole = require("../middlewares/adminRole");
const router = express.Router();

//user
router.post("/signup", signupDataValidate, signUp);
router
  .route("/login")
  .post(loginDataValidate, logIn)
  .get(authenticateUser, getUser);
router.get("/logout", logOut);

//admin
router.put("/admin", authenticateUser, adminRole, getAdmin);

module.exports = router;
