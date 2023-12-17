const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyBlackList = require("../middlewares/blacklistMiddleware");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/", verifyToken, verifyBlackList, postController.createPost);

router.get("/blogs/:blogId/posts", postController.getPostsByBlogId);

router.get("/:postId", postController.getPostById);

router.patch(
  "/:postId",
  verifyToken, verifyBlackList,
  postController.updatePost
);

router.delete("/:postId", postController.deletePost);

module.exports = router;
