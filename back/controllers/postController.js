const models = require('../models');

const postController = {
  // Créer un nouveau post
  async createPost(req, res) {
    try {
      console.log(req.body)
      const newPost = await models.Post.create({
        ...req.body,
      });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création du post', error });
    }
  },

  // Récupérer tous les posts d'un blog spécifique
  async getPostsByBlogId(req, res) {
    try {
      const posts = await models.Post.findAll({
        where: { BlogId: req.params.blogId }
      });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des posts', error });
    }
  },

  // Récupérer un post spécifique par son ID
  async getPostById(req, res) {
    try {
      const post = await models.Post.findByPk(req.params.postId);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération du post', error });
    }
  },

  // Mettre à jour un post spécifique
  async updatePost(req, res) {
    try {
      console.log(req.body)
      const updated = await models.Post.update(req.body, {
        where: { id: req.body.postId }
      });
      if (updated) {
        res.status(200).json({ message: 'Post modifié' });
      } else {
        res.status(404).json({ message: 'Post non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du post', error });
    }
  },

  // Supprimer un post spécifique
  async deletePost(req, res) {
    try {
      const deleted = await models.Post.destroy({
        where: { id: req.params.postId }
      });
      if (deleted) {
        res.status(200).json({ message: 'Post supprimé' });
      } else {
        res.status(404).json({ message: 'Post non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression du post', error });
    }
  }
};

module.exports = postController;
