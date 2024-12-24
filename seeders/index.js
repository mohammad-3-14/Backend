require("dotenv").config();

const mongoose = require("mongoose");
const seedUsers = require("./userSeeder");
const connectDB = require("../config/database");

const runSeeders = async () => {
  try {
    await connectDB();

    await seedUsers();
    console.log("seeders run successfully");
  } catch (error) {
    console.error("seed error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

runSeeders();
