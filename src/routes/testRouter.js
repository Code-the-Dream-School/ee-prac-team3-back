const express = require("express");
const { test } = require("../controllers/testController");
const router = express.Router();

router.get("/", test);

module.exports = router;
