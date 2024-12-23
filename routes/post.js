const express = require("express");
const router = express.Router();

const {
  postValidationSchema,
  validatePost,
  updatePostValidationSchema,
  validateUpdatePost,
} = require("../validators/postValidator");

const {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
} = require("../controllers/postController");

router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);

router.post("/", validatePost(postValidationSchema), createPost);
router.put(
  "/:slug",
  validateUpdatePost(updatePostValidationSchema),
  updatePost
);

module.exports = router;
