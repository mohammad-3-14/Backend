const slugify = require("slugify");
const PostModel = require("../models/postModel");

const getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const posts = await PostModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ [sort]: order });
    const total = await PostModel.countDocuments();

    res.status(200).json({
      message: "مقالات با موفیت دریافت شد",
      data: posts,
      total,
      page,
      perPage: limit,
    });
  } catch (error) {
    next(error);
  }
};

const getPostBySlug = async (req, res, next) => {
  try {
    const post = await PostModel.findOne({ slug: req.params.slug });

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

      const isSlugExist = await PostModel.findOne({ slug });
      if (isSlugExist) {
        return res.status(400).json({
          message:
            "نامک انتخابی تکراری می‌باشد. لطفا یک نامک دیگر انتخاب کنید.",
        });
      }
    } else {
      slug = slugify(req.body.title, { lower: true });

      let isSlugExist = await PostModel.findOne({ slug });
      let counter = 1;
      while (isSlugExist) {
        slug = `${slugify(req.body.title, { lower: true })}-${counter}`;
        isSlugExist = await PostModel.findOne({ slug });
        counter++;
      }
    }

    const newPost = new PostModel({
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

const updatePost = async (req, res, next) => {
  try {
    const { slug: currentSlug } = req.params;

    const existingPost = await PostModel.findOne({ slug: currentSlug });
    if (!existingPost) {
      return res.status(404).json({
        message: "مقاله‌ای با این نامک یافت نشد",
      });
    }

    let newSlug = currentSlug;

    if (req.body.slug) {
      newSlug = slugify(req.body.slug, { lower: true });

      const isSlugExist = await PostModel.findOne({ slug: newSlug });
      if (
        isSlugExist &&
        isSlugExist._id.toString() !== existingPost._id.toString()
      ) {
        return res.status(400).json({
          message: "نامک انتخابی تکراری است. لطفا یک نامک دیگر انتخاب کنید.",
        });
      }
    }

    const updatedPost = await PostModel.findOneAndUpdate(
      { slug: currentSlug },
      { ...req.body, slug: newSlug },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "مقاله با موفقیت به‌روزرسانی شد",
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
};
