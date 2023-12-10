const { StatusCodes } = require("http-status-codes");
const Attempt = require("../models/attemptModel");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// add attempt
const createAttempt = async (req, res) => {
  try {
    // find the latestAttempt
    const latestAttempt = await Attempt.find()
      .sort({ _id: -1 })
      .findOne({ user: req.body.user })
      .findOne({ test: req.body.test });
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

// get max score for every quiz by user, but for the latest attempt
const maxScoreAttempts = async (userId) => {
  try {
    //rank
    const attempts = await Attempt.aggregate([
      {
        $match: { user: userId },
      },
      {
        $setWindowFields: {
          partitionBy: "$test",
          sortBy: { score: -1 },
          sortBy: { attemptNumber: -1 },
          output: {
            rankScoreForTest: {
              $rank: {},
            },
          },
        },
      },
      {
        $match: { rankScoreForTest: 1 },
      },
      {
        $project: { test: 1, maxScore: "$score" },
      },
    ]);
    return attempts;
    //
  } catch (error) {
    return error;
  }
};

// get latest score for every quiz by user: sortBy attempNumber in descending order
const latestScoreAttempts = async (userId) => {
  try {
    const attempts = await Attempt.aggregate([
      {
        $match: { user: userId },
      },
      {
        $setWindowFields: {
          partitionBy: "$test",
          sortBy: { attemptNumber: -1 },
          output: {
            rankScoreForTest: {
              $rank: {},
            },
          },
        },
      },
      {
        $match: { rankScoreForTest: 1 },
      },
    ]);

    return attempts;
  } catch (error) {
    return error;
  }
};

// combine latestScoreAttempts & maxScoreAttempts
const getUserAttempts = async (req, res) => {
  try {
    const user = new ObjectId(`${req.query.userId}`);
    const maxAttempts = await maxScoreAttempts(user);
    const currentAttempts = await latestScoreAttempts(user);
    const mergeResult = maxAttempts.map((attempt) => {
      console.log("attempt", attempt);
      let matchedAttempt = currentAttempts.find((item) =>
        // equals for comparing equality of objects
        item.test.equals(attempt.test)
      );
      return Object.assign({}, attempt, matchedAttempt);
    });
    res.status(StatusCodes.OK).send({
      message: "Attempts fetched successfully",
      data: mergeResult,
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
