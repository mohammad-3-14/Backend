const express = require("express");
const router = express.Router();
const postModel = require("../model/postModel");

router.get("/", async (req, res, next) => {
  try {
    const posts = await postModel.find();
    res.status(200).json({
      message: "مقالات با موفیت دریافت شد",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (post) {
      res.status(200).json({
        message: "مقاله با موفیت دریافت شد",
        data: post,
      });
    } else {
      res.status(404).json({
        message: "مقاله پیدا نشد",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
