const yup = require("yup");

const postValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان اجباری است")
    .min(3, "عنوان باید حداقل ۳ کاراکتر باشد")
    .max(100, "عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد"),

  content: yup
    .string()
    .required("محتوا اجباری است")
    .min(10, "محتوا باید حداقل ۱۰ کاراکتر باشد"),

  description: yup
    .string()
    .nullable()
    .max(250, "توضیحات نباید بیشتر از ۲۵۰ کاراکتر باشد"),

  type: yup
    .mixed()
    .required("نوع مقاله اجباری است")
    .oneOf(
      ["article", "video", "audio"],
      "نوع مقاله معتبر نیست، باید 'article'، 'video' یا 'audio' باشد"
    )
    .default("article"),

  thumbnail: yup
    .string()
    .nullable()
    .url("آدرس تصویر شاخص باید یک URL معتبر باشد"),

  slug: yup.string(),

  status: yup
    .string()
    .oneOf(
      ["draft", "published"],
      "وضعیت مقاله معتبر نیست، باید 'draft' یا 'published' باشد"
    )
    .default("draft"),

  audioUrl: yup
    .string()
    .nullable()
    .when("type", {
      is: "audio",
      then: () =>
        yup
          .string()
          .required("آدرس فایل صوتی برای نوع 'audio' اجباری است")
          .url("آدرس فایل صوتی باید معتبر باشد"),
      otherwise: () => yup.string().nullable(),
    }),

  videoUrl: yup
    .string()
    .nullable()
    .when("type", {
      is: "video",
      then: () =>
        yup
          .string()
          .required("آدرس فایل ویدیویی برای نوع 'video' اجباری است")
          .url("آدرس فایل ویدیویی باید معتبر باشد"),
      otherwise: () => yup.string().nullable(),
    }),
});

const validatePost = (schema) => async (req, res, next) => {
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

const updatePostValidationSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "عنوان باید حداقل ۳ کاراکتر باشد")
    .max(100, "عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد"),

  content: yup.string().min(10, "محتوا باید حداقل ۱۰ کاراکتر باشد"),

  description: yup
    .string()
    .nullable()
    .max(250, "توضیحات نباید بیشتر از ۲۵۰ کاراکتر باشد"),

  type: yup
    .mixed()
    .oneOf(
      ["article", "video", "audio"],
      "نوع مقاله معتبر نیست، باید 'article'، 'video' یا 'audio' باشد"
    ),

  thumbnail: yup
    .string()
    .nullable()
    .url("آدرس تصویر شاخص باید یک URL معتبر باشد"),

  slug: yup.string(),

  audioUrl: yup
    .string()
    .nullable()
    .when("type", {
      is: "audio",
      then: () =>
        yup
          .string()
          .required("آدرس فایل صوتی برای نوع 'audio' اجباری است")
          .url("آدرس فایل صوتی باید معتبر باشد"),
      otherwise: () => yup.string().nullable(),
    }),

  status: yup
    .string()
    .oneOf(
      ["draft", "published"],
      "وضعیت مقاله معتبر نیست، باید 'draft' یا 'published' باشد"
    )
    .default("draft"),

  videoUrl: yup
    .string()
    .nullable()
    .when("type", {
      is: "video",
      then: () =>
        yup
          .string()
          .required("آدرس فایل ویدیویی برای نوع 'video' اجباری است")
          .url("آدرس فایل ویدیویی باید معتبر باشد"),
      otherwise: () => yup.string().nullable(),
    }),
});

const validateUpdatePost = (schema) => async (req, res, next) => {
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
  postValidationSchema,
  validatePost,
  updatePostValidationSchema,
  validateUpdatePost,
};
