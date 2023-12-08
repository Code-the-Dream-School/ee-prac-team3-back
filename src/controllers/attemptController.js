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
const getMaxScoreAttempts = async (req, res) => {
  try {
    //rank
    const attempts = await Attempt.aggregate([
      {
        $match: { user: new ObjectId(`${req.query.userId}`) },
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
    ]);
    //
    res.status(StatusCodes.OK).send({
      message: "Attempts fetched successfully",
      data: attempts,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// get latest score for every quiz by user: sortBy attempNumber in descending order
const getLatestScoreAttempts = async (req, res) => {
  try {
    //rank
    const attempts = await Attempt.aggregate([
      {
        $match: { user: new ObjectId(`${req.query.userId}`) },
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
    //
    res.status(StatusCodes.OK).send({
      message: "Attempts fetched successfully",
      data: attempts,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// get all attempts
const getAllAttempts = async (req, res) => {
  const attempts = await Attempt.find({});
  res.status(StatusCodes.OK).json({
    attempts,
    count: attempts.length,
  });
};

// delete attempt
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
  getMaxScoreAttempts,
  createAttempt,
  getLatestScoreAttempts,
  getAllAttempts,
  deleteAttempt,
};
