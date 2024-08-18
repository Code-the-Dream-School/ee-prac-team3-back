const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require("./db/db");
const favicon = require("express-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

// Connect to the database
connectToDb();

const mainRouter = require("./routes/mainRouter.js");

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const allowedOrigins = [
    'http://localhost:3000',        // Local development URL
    'https://app-jsquiz.netlify.app' // Production URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(logger("dev"));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

// Routes
app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;