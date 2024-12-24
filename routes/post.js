const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");

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

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validatePost(postValidationSchema),
  createPost
);
router.put(
  "/:slug",
  authenticate,
  authorize("admin"),
  validateUpdatePost(updatePostValidationSchema),
  updatePost
);

module.exports = router;
