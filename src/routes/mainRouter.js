const express = require("express");
const { signUp, logIn, logOut } = require("../controllers/userController");
const signupDataValidate = require("../middlewares/signupDataValidate");
const loginDataValidate = require("../middlewares/ loginDataValidate");
const authenticateUser = require("../middlewares/authenticateUser");
const router = express.Router();

//user
router.post("/signup", signupDataValidate, signUp);
router.post("/login", loginDataValidate, logIn);
router.get("/getuser", authenticateUser);
router.get("/logout", logOut);

module.exports = router;
