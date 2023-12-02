const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./db/db");
const favicon = require("express-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

//connection to the database
connectToDb();

const mainRouter = require("./routes/mainRouter.js");

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); //cross the app
app.use(logger("dev"));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

// routes
app.use("/api/v1", mainRouter);

module.exports = app;
