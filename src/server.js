require("dotenv").config();
console.log("process.env.PORT ====> ", process.env.PORT);
console.log("process.env.MONGO_URI ====> ", process.env.MONGO_URI);
const app = require("./app");
const PORT = process.env.PORT || 8000;

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);
