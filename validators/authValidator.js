const yup = require("yup");

const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("نام کاربری اجباری است")
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
    .max(40, "نام کاربری نباید بیشتر از 40کاراکتر باشد"),

  password: yup
    .string()
    .required("رمز عبور اجباری است")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

const validateLogin = (schema) => async (req, res, next) => {
  try {
    const validatedData = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    req.body = validatedData;
    next();
  } catch (error) {
    res.status(422).json({
      message: "اطلاعات وارد شده نامعتبر است",
      errors: error.errors,
    });
  }
};

module.exports = {
  loginValidationSchema,
  validateLogin,
};
