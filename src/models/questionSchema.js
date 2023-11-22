const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
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
  isFavorite: {
    type: Boolean,
    default: false,
  },

  questions: [
    {
      questionId: {
        type: Number,
        required: [true, "questionId is required"],
      },
      questionText: {
        type: String,
        required: [true, "questionText is required"],
      },
      options: {
        type: Array,
        required: [true, "options are required"],
      },
    },
  ],
  answers: {
    type: Array,
    required: [true, "answers are required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const questionModel = mongoose.model("Questions", questionSchema);
module.exports = questionModel;
