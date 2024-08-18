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

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.CLIENT_URL_PROD,
    'https://*.app-jsquiz.netlify.app'
];

console.log("allowedOrigins === ", allowedOrigins);

app.use(cors({
    origin: function (origin, callback) {
        console.log("Request origin: ", origin);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(function (req, res, next) {
    console.log('Request:', req.method, req.url);
    next();
});

app.use(logger("dev"));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

// routes
app.use("/api/v1", mainRouter);

module.exports = app;
