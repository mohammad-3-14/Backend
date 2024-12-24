const jwt = require("jsonwebtoken");


const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "توکن احراز هویت یافت نشد." });
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
      } catch (error) {
        return res.status(401).json({ message: "توکن نامعتبر است." });
      }




};








module.exports = {authenticate};