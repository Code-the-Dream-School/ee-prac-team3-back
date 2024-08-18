const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./db/db");
const favicon = require("express-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

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
    process.env.CLIENT_URL_TEST
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            console.log('origin === ', origin);
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
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + "/public/favicon.ico"));

// routes
app.use("/api/v1", mainRouter);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the backend service!');
});

// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
