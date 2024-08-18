const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./db/db");
const favicon = require("express-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

// Connection to the database
connectToDb();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS setup
const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.CLIENT_URL_TEST
].filter(Boolean); // Filter out any undefined values

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            console.log('Origin allowed:', origin);
            callback(null, true);
        } else {
            console.log('Origin not allowed:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Logger setup
app.use(logger("dev"));

// Static files and favicon
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Request logger middleware
app.use((req, res, next) => {
    console.log('Request:', req.method, req.url);
    next();
});

// Routes
app.use("/api/v1", require("./routes/mainRouter.js"));

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the backend service!');
});

// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;