const Attempt = require("../models/attemptModel");

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
          partitionBy: "$quiz",
          sortBy: { score: -1 },
          output: {
            rankScoreForQuiz: {
              $rank: {},
            },
          },
        },
      },
      {
        $match: { rankScoreForQuiz: 1 },
      },
      {
        $project: { quiz: 1, maxScore: "$score" },
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
          partitionBy: "$quiz",
          sortBy: { attemptNumber: -1 },
          output: {
            rankScoreForQuiz: {
              $rank: {},
            },
          },
        },
      },
      {
        $match: { rankScoreForQuiz: 1 },
      },
    ]);

    return attempts;
  } catch (error) {
    return error;
  }
};

module.exports = {
  maxScoreAttempts,
  latestScoreAttempts,
};
