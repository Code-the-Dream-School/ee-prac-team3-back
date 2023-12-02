const questionModel = require("../models/questionSchema");
const { title, category, questions, answers } = require("../db/data");

// questions controllers

/** insert  question */
const insertQuestions = async (req, res) => {
  const { role } = req.user;

  try {
    if (role !== "admin") {
      return res.status(403).json({
        message: "Only Admin can add questions",
      });
    }
    const question = await questionModel.insertMany({
      title,
      category,
      questions,
      answers,
    });
    res.status(200).json({
      message: "Data Saved Sucessfuly",
      question,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/** get all questions */
const getQuestions = async (req, res) => {
  try {
    const questions = await questionModel.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/** get question per  category */
const getQuestion = async (req, res) => {
  const { category } = req.body; // required category should be return from the frontend
  try {
    const questions = await questionModel.find({ category: category });
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/** Delete all Questions */
const dropQuestions = async (req, res) => {
  try {
    await questionModel.deleteMany();
    res.status(200).json({ message: "Questions Successfuly Deleted" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { getQuestions, getQuestion, insertQuestions, dropQuestions };
