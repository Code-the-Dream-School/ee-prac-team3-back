const mongoose = require("mongoose");
const { Schema } = mongoose;

const quizSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minlength: [4, "tilte must be more than 4 chars"],
    maxlength: [50, "title must be less than 50 chars"],
  },
  category: {
    type: String,
    enum: ["javascript", "react", "nodejs", "html", "css"],
  },
  level: {
    type: String,
    enum: ["basic", "middle", "advanced"],
  },
  label: {
    type: String,
    enum: ["frontend", "backend"],
  },
  // isFavorite: {
  //   type: Boolean,
  //   default: false,
  // },

  questions: [
    {
      questionText: {
        type: String,
        required: [true, "questionText is required"],
      },
      options: {
        type: Array,
        required: true,
      },
      correctOption: {
        type: String,
        required: true,
      },
      isMultiChoice: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const quizModel = mongoose.model("Questions", quizSchema);
module.exports = quizModel;
