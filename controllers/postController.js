const slugify = require("slugify");
const postModel = require("../model/postModel");

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postModel.find();
    res.status(200).json({
      message: "مقالات با موفیت دریافت شد",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

const getPostBySlug = async (req, res, next) => {
  try {
    const post = await postModel.findOne({ slug: req.params.slug });

    if (post) {
      return res.status(200).json({
        message: "مقاله با موفیت دریافت شد",
        data: post,
      });
    }
    return res.status(404).json({
      message: "مقاله پیدا نشد",
    });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    let slug;

    if (req.body.slug) {
      slug = slugify(req.body.slug, { lower: true });

      const isSlugExist = await postModel.findOne({ slug });
      if (isSlugExist) {
        return res.status(400).json({
          message:
            "نامک انتخابی تکراری می‌باشد. لطفا یک نامک دیگر انتخاب کنید.",
        });
      }
    } else {
      slug = slugify(req.body.title, { lower: true });

      let isSlugExist = await postModel.findOne({ slug });
      let counter = 1;
      while (isSlugExist) {
        slug = `${slugify(req.body.title, { lower: true })}-${counter}`;
        isSlugExist = await postModel.findOne({ slug });
        counter++;
      }
    }

    const newPost = new postModel({
      ...req.body,
      slug,
    });

    await newPost.save();

    res.status(201).json({
      message: "مقاله با موفقیت ایجاد شد",
      data: newPost,
    });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getAllPosts,
  getPostBySlug,
  createPost,
};
