const express = require("express");
const {
  upload,
  uploadFile,
  getFile,
} = require("../controllers/uploadController");

const router = express.Router();

router.post("/", upload.single("file"), uploadFile);
router.get("/:filename", getFile);

module.exports = router;
