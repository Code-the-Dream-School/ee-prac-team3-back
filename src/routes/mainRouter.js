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
const {
favorites
  removeFavoriteQuiz,
  addFavoriteQuiz,
  getUserFavorites,
} = require("../controllers/favoriteController");
const {
  createAttempt,
  getUserAttempts,
  getAllAttempts,
  deleteAttempt,
} = require("../controllers/attemptController");

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


//Favorites
router.get("/favorites", authenticateUser, getUserFavorites);
router.post("/favorites/add", authenticateUser, addFavoriteQuiz);
router.post("/favorites/remove", authenticateUser, removeFavoriteQuiz);

// user progress
router
  .route("/progress/user", authenticateUser)
  .post(createAttempt)
  .get(getUserAttempts);

// for testing only
router.route("/progress").get(getAllAttempts);
router.route("/progress/:id").delete(deleteAttempt);

module.exports = router;
