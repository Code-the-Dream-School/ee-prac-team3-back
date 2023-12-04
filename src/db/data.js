const title = "Javascript";
const category = "javascript";
const level = "advanced";
const label = ["frontend", "backend"];

const questions = [
  {
    questionText: "Javascript is an _______ language",
    options: ["Object-Oriented", "Object-Based", "Procedural"],
    correctOption: "Object-Oriented",
  },
  {
    questionText:
      "Following methods can be used to display data in some form using Javascript",
    options: ["document.write()", "console.log()", "window.alert()"],
    correctOption: "console.log()",
  },
  {
    questionText:
      "When an operator value is NULL, the typeof returned by the unary operator is:",
    options: ["Boolean", "Undefined", "Object"],
    correctOption: "Object",
  },
  {
    questionText: "What does the toString() method return?",
    options: ["Return Object", "Return String", "Return Integer"],
    correctOption: "Return String",
  },
  {
    questionText:
      "Which function is used to serialize an object into a JSON string?",
    options: ["stringify()", "parse()", "convert()"],
    correctOption: "stringify()",
  },
];

module.exports = { title, category, level, label, questions };
