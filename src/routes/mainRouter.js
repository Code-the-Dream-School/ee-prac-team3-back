const express = require("express");
const {
  getAllQuiz,
  insertQuiz,
  getQuizPerChoice,
  deleteAllQuiz,
} = require("../controllers/quizController");
const {
  signUp,
  logIn,
  getUser,
  logOut,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const signupDataValidate = require("../middlewares/signupDataValidate");
const loginDataValidate = require("../middlewares/loginDataValidate");
const authenticateUser = require("../middlewares/authenticateUser");
const router = express.Router();

//user

router.post("/signup", signupDataValidate, signUp);
router
  .route("/login")
  .post(loginDataValidate, logIn)
  .get(authenticateUser, getUser);
router.get("/logout", logOut);
router.put("/updateuser", authenticateUser, updateUser);
router.delete("/deleteuser", authenticateUser, deleteUser);

//questions

router
  .route("/quiz")
  .get(authenticateUser, getAllQuiz)
  .post(authenticateUser, insertQuiz)
  .delete(authenticateUser, deleteAllQuiz);

//question per category
router.route("/quiz/category").get(authenticateUser, getQuizPerChoice);

module.exports = router;
