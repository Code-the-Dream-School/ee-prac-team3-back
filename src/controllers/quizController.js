const quizModel = require("../models/quizSchema");
const { title, category, level, label, questions } = require("../db/data");

// questions controllers

/** insert  question */
const insertQuiz = async (req, res) => {
  const { role } = req.user;

  try {
    if (role !== "admin") {
      return res.status(403).json({
        message: "Only Admin can add questions",
      });
    }
    const quiz = await quizModel.insertMany({
      title,
      category,
      level,
      label,
      questions,
    });
    res.status(200).json({
      message: "Data Saved Sucessfuly",
      quiz,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/** get all quiz */
const getAllQuiz = async (req, res) => {
  try {
    const quiz = await quizModel.find();
    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/** get quiz per  choice(category,level...) */
const getQuizPerChoice = async (req, res) => {
  try {
    const quiz = await quizModel.find(req.body);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/** Delete all Quiz */
const deleteAllQuiz = async (req, res) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({
      message: "Only Admin can delete a quiz ",
    });
  }
  try {
    await quizModel.deleteMany();
    res.status(200).json({ message: "The Quiz has been successfuly deleted" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getAllQuiz,
  getQuizPerChoice,
  insertQuiz,
  deleteAllQuiz,
};
