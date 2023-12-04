const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  labels: {
    type: [String],
    default: ["frontend", "backend"],
  },
  code: {
    type: String,
  },
  resources: {
    type: String,
  },
  problems: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "problems",
  },
});

const Test = mongoose.model("tests", testSchema);
module.exports = Test;
