// require("dotenv").config();
// const app = require("./app");
// const PORT = process.env.PORT || 8000;

// const listener = () => console.log(`Listening on Port ${PORT}!`);
// app.listen(PORT, listener);

require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const cookieParser = require("cookie-parser");

// Enable CORS for all routes
app.use(cors());

//Secure
app.use(cookieParser());

app.get("/", (res) => {
  // Set a cookie with SameSite=None; Secure attributes
  res.cookie("exampleCookie", "exampleValue", {
    sameSite: "None",
    secure: true,
    httpOnly: true,
  });
  res.send("Cookie set with SameSite=None; Secure attributes");
});

// //set Access-Control-Allow-Credentials to true
// app.use((res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://cute-conkies-9d76b9.netlify.app/"
//   );
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

//Secure flag is set on cookies. Sends cookies only over HTTPS
// app.use(cookieParser());

// app.get("/", (res) => {
//   // Set a cookie with the Secure flag
//   res.cookie("exampleCookie", "exampleValue", { secure: true, httpOnly: true });
//   res.send("Cookie set with Secure flag");
// });

const PORT = process.env.PORT || 8000;

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);
