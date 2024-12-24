const express = require("express");
const router = express.Router();

router.use("/posts", require("./post"));
router.use("/auth", require("./auth"));

module.exports = router;
