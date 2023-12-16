const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const verifyBlackList = require("../middlewares/blacklistMiddleware");
const verifyToken = require("../middlewares/authMiddleware");

// Obtenir tous les blogs
router.get("/", blogController.getAllBlogs);

// Obtenir un blog spécifique par ID
router.get("/:blogId", blogController.getBlogById);

// Obtenir les blogs public
router.get("/public/blogs", blogController.getPublicBlogs);

// Créer un nouveau blog
router.post("/",verifyToken, verifyBlackList, blogController.createBlog);

// Mettre à jour un blog spécifique
router.put(
  "/:blogId",
  verifyToken, verifyBlackList,
  blogController.updateBlog
);

// Supprimer un blog spécifique
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
