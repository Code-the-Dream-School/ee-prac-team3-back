const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tests",
  },
  answers: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "answers",
  },
});

const Problem = mongoose.model("problems", problemSchema);
module.exports = Problem;
