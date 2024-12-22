const express = require("express");
const router = express.Router();

const {
  postValidationSchema,
  validatePost,
} = require("../validators/postValidator");

const {
  getAllPosts,
  getPostBySlug,
  createPost,
} = require("../controllers/postController");

router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);

router.post("/", validatePost(postValidationSchema), createPost);

module.exports = router;
