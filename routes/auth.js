const express = require("express");
const router = express.Router();

const {
  loginValidationSchema,
  validateLogin,
} = require("../validators/authValidator");

const { loginUser } = require("../controllers/userController");

router.post("/login", validateLogin(loginValidationSchema), loginUser);

module.exports = router;
