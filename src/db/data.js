const title = "Javascript Basics";
const category = "html";

const questions = [
  {
    questionId: 1,
    questionText: "Javascript is an _______ language",
    options: ["Object-Oriented", "Object-Based", "Procedural"],
  },
  {
    questionId: 2,
    questionText:
      "Following methods can be used to display data in some form using Javascript",
    options: ["document.write()", "console.log()", "window.alert()"],
  },
  {
    questionId: 3,
    questionText:
      "When an operator value is NULL, the typeof returned by the unary operator is:",
    options: ["Boolean", "Undefined", "Object"],
  },
  {
    questionId: 4,
    questionText: "What does the toString() method return?",
    options: ["Return Object", "Return String", "Return Integer"],
  },
  {
    questionId: 5,
    questionText:
      "Which function is used to serialize an object into a JSON string?",
    options: ["stringify()", "parse()", "convert()"],
  },
];
const answers = [0, 1, 2, 1, 0]; // answers should be compared with the one user has return

module.exports = { title, category, questions, answers };
