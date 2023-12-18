const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minLength: [5, "Title must be at least 5 characters"],
  },
  note: {
    type: String,
    required: [true, "Note is required"],
    minLength: [5, "Note must be at least 5 characters"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User Id is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const noteModel = mongoose.model("Note", noteSchema);
module.exports = noteModel;
