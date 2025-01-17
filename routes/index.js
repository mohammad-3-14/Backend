const express = require("express");
const router = express.Router();

router.use("/posts", require("./post"));
router.use("/auth", require("./auth"));
router.use("/uploads", require("./upload"));

module.exports = router;
