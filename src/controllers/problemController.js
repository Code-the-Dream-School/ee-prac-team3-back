const { StatusCodes } = require("http-status-codes");
const Problem = require("../models/problemModel");
const Test = require("../models/testModel");
const Joi = require("joi");
const schema = Joi.object({ testId: Joi.string().required() });

// get all questions

const getAllProblems = async (req, res) => {
  const problems = await Problem.find({}).populate("answers");
  res.status(StatusCodes.OK).json({
    problems,
    count: problems.length,
  });
};

// add question to test
// First, add a question to the questions collection. Then add that ID to the questions in the test

const createProblem = async (req, res) => {
  try {
    await schema.validateAsync({
      testId: req.body.testId,
    });
    const test = await Test.findById(req.body.testId);
    const newProblem = new Problem(req.body);
    const problem = await newProblem.save();
    test.problems.push(problem._id);
    await test.save();
    res.status(StatusCodes.CREATED).send({
      message: "Question added successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// edit question in test
const updateProblem = async (req, res) => {
  try {
    const {
      params: { id: problemId },
    } = req;
    const problem = await Problem.findByIdAndUpdate(
      { _id: problemId },
      req.body
    );
    res.send({
      message: "Question edited successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// delete question in test
const deleteProblem = async (req, res) => {
  try {
    const {
      params: { id: problemId },
    } = req;
    await Problem.findByIdAndDelete({ _id: problemId });

    res.send({
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  getAllProblems,
  createProblem,
  updateProblem,
  deleteProblem,
};
