const { StatusCodes } = require("http-status-codes");
const Problem = require("../models/problemModel");
const Answer = require("../models/answerModel");
/* const Joi = require("joi");
const schema = Joi.object({ problemId: Joi.string().required() }); */

// add answer to question

const createAnswer = async (req, res) => {
  try {
    /*   await schema.validateAsync({
      problemId: req.body.problemId,
    }); */
    const problem = await Problem.findOne({ _id: req.body.problem });
    const newAnswer = new Answer(req.body);
    const answer = await newAnswer.save();
    problem.answers.push(answer._id);
    await problem.save();
    res.status(StatusCodes.CREATED).send({
      message: "Answer added successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// get all answers

const getAllAnswers = async (req, res) => {
  const answers = await Answer.find({});
  res.status(StatusCodes.OK).json({
    answers,
    count: answers.length,
  });
};

// edit an answer

const updateAnswer = async (req, res) => {
  try {
    const {
      params: { id: answerId },
    } = req;
    const problem = await Answer.findByIdAndUpdate({ _id: answerId }, req.body);
    res.send({
      message: "Answer edited successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// delete an answer

const deleteAnswer = async (req, res) => {
  try {
    const {
      params: { id: answerId },
    } = req;
    await Answer.findByIdAndDelete({ _id: answerId });
    res.send({
      message: "Answer deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  createAnswer,
  getAllAnswers,
  updateAnswer,
  deleteAnswer,
};
