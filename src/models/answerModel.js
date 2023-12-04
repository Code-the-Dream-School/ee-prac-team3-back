const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "problems",
  },
});

const Answer = mongoose.model("answers", answerSchema);
module.exports = Answer;
