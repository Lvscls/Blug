const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyBlackList = require("../middlewares/blacklistMiddleware");
const verifyToken = require("../middlewares/authMiddleware");

// Créer un nouveau post pour un blog spécifique
router.post("/", verifyToken, verifyBlackList, postController.createPost);

// Récupérer tous les posts d'un blog spécifique
router.get("/blogs/:blogId/posts", postController.getPostsByBlogId);

// Récupérer un post spécifique par son ID
router.get("/:postId", postController.getPostById);

// Mettre à jour un post spécifique
router.patch(
  "/:postId",
  verifyToken, verifyBlackList,
  postController.updatePost
);

// Supprimer un post spécifique
router.delete("/:postId", postController.deletePost);

module.exports = router;
