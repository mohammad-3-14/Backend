const authorize = (roles = []) => {
  if (typeof roles === "string") roles = [roles];

  return (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "لطفا وارد حساب کاربری تان شوید" });
      }

      if (!roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "شما اجازه دسترسی به این بخش را ندارید" });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { authorize };
