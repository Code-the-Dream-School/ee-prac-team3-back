const { StatusCodes } = require("http-status-codes");
const Attempt = require("../models/attemptModel");
const { default: mongoose } = require("mongoose");
const {
  maxScoreAttempts,
  latestScoreAttempts,
} = require("../functions/attempts");
const ObjectId = mongoose.Types.ObjectId;

// add attempt
const createAttempt = async (req, res) => {
  try {
    // find the latestAttempt
    const latestAttempt = await Attempt.find()
      .sort({ _id: -1 })
      .findOne({ user: req.body.user })
      .findOne({ quiz: req.body.quiz });
    const newAttempt = new Attempt(req.body);
    // increment
    latestAttempt
      ? (newAttempt.attemptNumber = latestAttempt.attemptNumber + 1)
      : (newAttempt.attemptNumber = 1);
    await newAttempt.save();
    res.status(StatusCodes.CREATED).send({
      message: "Attempt added successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// combine latestScoreAttempts & maxScoreAttempts
const getUserAttempts = async (req, res) => {
  try {
    const user = new ObjectId(`${req.query.userId}`);
    const maxAttempts = await maxScoreAttempts(user);
    console.log("maxScoreattempts", maxScoreAttempts);
    console.log("maxAttempts", maxAttempts);
    const currentAttempts = await latestScoreAttempts(user);
    console.log("currentAttempts", currentAttempts);
    const mergeResult = maxAttempts.map((attempt) => {
      console.log("attempt", attempt);
      let matchedAttempt = currentAttempts.find((item) =>
        // equals for comparing equality of objects
        item.quiz.equals(attempt.quiz)
      );
      return Object.assign({}, attempt, matchedAttempt);
    });
    const removeDuplicates = mergeResult.reduce((accumulator, current) => {
      let exists = accumulator.find((item) => {
        return item._id === current._id;
      });
      if (!exists) {
        accumulator = accumulator.concat(current);
      }
      return accumulator;
    }, []);
    res.status(StatusCodes.OK).send({
      message: "Attempts fetched successfully",
      data: removeDuplicates,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// get all attempts !only for testing!
const getAllAttempts = async (req, res) => {
  const attempts = await Attempt.find({});
  res.status(StatusCodes.OK).json({
    attempts,
    count: attempts.length,
  });
};

// delete attempt !only for testing!
const deleteAttempt = async (req, res) => {
  try {
    const {
      params: { id: attemptId },
    } = req;

    await Attempt.findByIdAndDelete({
      _id: attemptId,
    });
    res.status(StatusCodes.OK).send({ message: "Attempt Deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getUserAttempts,
  createAttempt,
  getAllAttempts,
  deleteAttempt,
};
