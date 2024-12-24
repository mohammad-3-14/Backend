const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res.status(401).json({
        message: "نام کاربری یا رمز عبور اشتباه است.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "نام کاربری یا رمز عبور اشتباه است.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "ورود با موفقیت انجام شد.",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser };
