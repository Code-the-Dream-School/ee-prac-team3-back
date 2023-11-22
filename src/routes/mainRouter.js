const express = require("express");
const { signUp, logIn, logOut } = require("../controllers/userController");
const {
  getQuestions,
  insertQuestions,
  dropQuestions,
  getQuestion,
} = require("../controllers/questionController");
const signupDataValidate = require("../middlewares/signupDataValidate");
const loginDataValidate = require("../middlewares/loginDataValidate");
const authenticateUser = require("../middlewares/authenticateUser");
const router = express.Router();

//user
router.post("/signup", signupDataValidate, signUp);
router.route("/login").post(loginDataValidate, logIn).get(authenticateUser);
router.get("/logout", logOut);

//questions

router
  .route("/questions")
  .get(authenticateUser, getQuestions)
  .post(authenticateUser, insertQuestions)
  .delete(authenticateUser, dropQuestions);

//question per category
router.route("/question/category").get(authenticateUser, getQuestion);

module.exports = router;
