// require("dotenv").config();
// const app = require("./app");
// const PORT = process.env.PORT || 8000;

// const listener = () => console.log(`Listening on Port ${PORT}!`);
// app.listen(PORT, listener);

require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();

// Enable CORS for all routes
app.use(cors());

const PORT = process.env.PORT || 8000;

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);
