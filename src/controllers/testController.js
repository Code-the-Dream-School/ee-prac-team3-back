const { StatusCodes } = require("http-status-codes");
const Test = require("../models/testModel");

// get all tests
const getAllTests = async (req, res) => {
  const tests = await Test.find({}).populate({
    path: "problems",
    populate: { path: "answers" },
  });
  res.status(StatusCodes.OK).json({
    tests,
    count: tests.length,
  });
};

// get a single test

const getSingleTest = async (req, res) => {
  try {
    const {
      params: { id: testId },
    } = req;
    const test = await Test.findById({ _id: testId }).populate({
      path: "problems",
      populate: { path: "answers" },
    });
    res.status(StatusCodes.OK).send({
      test: test,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

//create a test
const createTest = async (req, res) => {
  try {
    // req.body.problems = [];
    const newTest = new Test(req.body);
    await newTest.save();
    res.send({
      message: "Quiz added successfully",
    });
  } catch (error) {
    res.status(StatusCodes.CREATED).send({
      message: error.message,
    });
  }
};

// update test by id
const updateTest = async (req, res) => {
  try {
    const {
      params: { id: testId },
    } = req;
    const test = await Test.findByIdAndUpdate({ _id: testId }, req.body);
    res.status(StatusCodes.OK).send({
      message: "Quiz edited successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// delete test by id

const deleteTest = async (req, res) => {
  try {
    const {
      params: { id: testId },
    } = req;
    await Test.findByIdAndDelete({ _id: testId });
    res.send({
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  getAllTests,
  getSingleTest,
  createTest,
  updateTest,
  deleteTest,
};
