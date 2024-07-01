const express = require("express");
const router = express.Router();
const { greet } = require("../controllers/hello");

router.get("/", greet);

module.exports = router;
