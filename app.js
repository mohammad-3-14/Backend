require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

connectDB();

app.use("/api", routes);
app.use(errorHandler);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
