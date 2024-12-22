const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const postModel = require("../model/postModel");
const {
  postValidationSchema,
  validatePost,
} = require("../validators/postValidator");

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
    const slug = req.body.slug;

    if (slug) {
      const isSlugExist = await postModel.findOne({
        slug: slugify(slug, { lower: true }),
      });

      if (isSlugExist) {
        return res.status(400).json({
          message: " نامک انتخابی تکراری می باشد",
        });
      }
    }

    const newPost = new postModel({
      ...req.body,
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

router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);

router.post("/", validatePost(postValidationSchema), createPost);

module.exports = router;
