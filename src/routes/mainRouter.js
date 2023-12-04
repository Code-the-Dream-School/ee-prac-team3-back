const express = require("express");
const { signUp, logIn, logOut } = require("../controllers/userController");
const signupDataValidate = require("../middlewares/signupDataValidate");
const loginDataValidate = require("../middlewares/loginDataValidate");
const authenticateUser = require("../middlewares/authenticateUser");
const {
  getAllTests,
  getSingleTest,
  createTest,
  updateTest,
  deleteTest,
} = require("../controllers/testController");
const {
  getAllProblems,
  createProblem,
  updateProblem,
  deleteProblem,
} = require("../controllers/problemController");
const {
  createAnswer,
  getAllAnswers,
  updateAnswer,
  deleteAnswer,
} = require("../controllers/answerController");
const router = express.Router();

//user
router.post("/signup", signupDataValidate, signUp);
router.route("/login").post(loginDataValidate, logIn).get(authenticateUser);
router.get("/logout", logOut);

// tests
router.route("/test").get(getAllTests).post(createTest);
router
  .route("/test/:id")
  .get(getSingleTest)
  .patch(updateTest)
  .delete(deleteTest);

// questions
router.route("/problem").get(getAllProblems).post(createProblem);
router.route("/problem/:id").patch(updateProblem).delete(deleteProblem);

// answers
router.route("/answer").post(createAnswer).get(getAllAnswers);
router.route("/answer/:id").patch(updateAnswer).delete(deleteAnswer);

module.exports = router;
