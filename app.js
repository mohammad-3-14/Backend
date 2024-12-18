require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");

const app = express();

connectDB();

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
