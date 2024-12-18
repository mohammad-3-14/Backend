require("dotenv").config();
const express = require("express");
const app = express();





const port= process.env.APP_PORT || 3000;

 

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
