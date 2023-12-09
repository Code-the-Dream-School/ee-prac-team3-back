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
  deleteNote,
  deleteAllNote,
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

router.post("/addnote", authenticateUser, addNote);
router.get("/getnotes", authenticateUser, getNotes);
router.put("/updatenote", authenticateUser, updateNote);
router.delete("/deletenote", authenticateUser, deleteNote);
router.delete("/deleteallnote", authenticateUser, deleteAllNote);

module.exports = router;
