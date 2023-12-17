const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const verifyBlackList = require("../middlewares/blacklistMiddleware");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/", blogController.getAllBlogs);

router.get("/:blogId", blogController.getBlogById);

router.get("/public/blogs", blogController.getPublicBlogs);

router.post("/",verifyToken, verifyBlackList, blogController.createBlog);

router.put(
  "/:blogId",
  verifyToken, verifyBlackList,
  blogController.updateBlog
);

router.delete(
  "/:blogId",
  blogController.deleteBlog
);

router.post(
  "/change-privacy",
  verifyToken, verifyBlackList,
  blogController.changePrivacy
);

module.exports = router;
