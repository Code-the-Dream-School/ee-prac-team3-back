require("dotenv").config();
console.log("test!!!!!!!!!!!");
const app = require("./app");
const PORT = process.env.PORT || 8000;

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);
