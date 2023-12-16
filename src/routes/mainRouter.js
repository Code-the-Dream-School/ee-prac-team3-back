const express = require("express");
const {
  signUp,
  logIn,
  logOut,
  getUser,
} = require("../controllers/userController");
const {
  addNote,
  getNotes,
  updateNote,
  deleteManyNotes,
} = require("../controllers/noteController");
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

//notes
router.post("/note", authenticateUser, addNote);
router.put("/note/:id", authenticateUser, updateNote);
router
  .route("/notes")
  .get(authenticateUser, getNotes)
  .delete(authenticateUser, deleteManyNotes);

module.exports = router;
