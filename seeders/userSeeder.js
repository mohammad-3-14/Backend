const User = require("../models/userModel");

const seedUsers = async () => {
  const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (adminExists) {
    console.warn("admin user already exists");
    return;
  }

  const adminUser = new User({
    fullname: process.env.ADMAIN_FULL_NANE,
    username: process.env.ADMIN_USER_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
  });

  await adminUser.save();
  console.log("created admin user");
};

module.exports = seedUsers;
