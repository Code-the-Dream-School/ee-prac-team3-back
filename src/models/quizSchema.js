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
    required: [true, "category is required"],
    enum: ["javascript", "react", "nodejs", "html", "css"],
  },
  level: {
    type: String,
    enum: ["basic", "intermediate", "advanced"],
  },
  label: [
    {
      type: String,
      enum: ["frontend", "backend"],
    },
  ],

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
      type: {
        type: String,
        enum: ["radio", "checkbox"],
        default: "radio",
      },
      code: {
        type: String,
        required: false,
      },
      resources: {
        type: String,
        required: false,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const quizModel = mongoose.model("Quiz", quizSchema);
module.exports = quizModel;
