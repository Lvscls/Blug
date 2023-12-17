const models = require("../models");

const blogController = {
  // Récupérer tous les blogs
  async getAllBlogs(req, res) {
    try {
      const blogs = await models.Blog.findAll();
      res.status(200).json(blogs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des blogs", error });
    }
  },

  // Récupérer un blog par son ID
  async getBlogById(req, res) {
    try {
      const blog = await models.Blog.findByPk(req.params.blogId);
      if (blog) {
        res.status(200).json(blog);
      } else {
        res.status(404).json({ message: "Blog non trouvé" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du blog", error });
    }
  },

  // Récupérer les blogs public
  async getPublicBlogs(req, res) {
    try {
      const publicBlogs = await models.Blog.findAll({
        where: { isPrivate: false },
      });
      res.status(200).json(publicBlogs);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erreur lors de la récupération des blogs publiques",
          error,
        });
    }
  },

  // Créer un nouveau blog
  async createBlog(req, res) {
    try {
      console.log(req.body);
      const newBlog = await models.Blog.create(req.body);
      console.log(newBlog);
      res.status(201).json(newBlog);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la création du blog", error });
    }
  },

  // Mettre à jour un blog
  async updateBlog(req, res) {
    try {
      const updated = await models.Blog.update(req.body, {
        where: { id: req.params.blogId },
      });
      if (updated) {
        const updatedBlog = await models.Blog.findByPk(req.params.blogId);
        res.status(200).json(updatedBlog);
      } else {
        res.status(404).json({ message: "Blog non trouvé" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour du blog", error });
    }
  },

  // Supprimer un blog
  async deleteBlog(req, res) {
    try {
      const deleted = await models.Blog.destroy({
        where: { id: req.params.blogId },
      });
      if (deleted) {
        res.status(200).json({ message: "Blog supprimé" });
      } else {
        res.status(404).json({ message: "Blog non trouvé" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression du blog", error });
    }
  },

  // Changer la privacy d'un blog (public ou privé)
  async changePrivacy(req, res) {
    try {
      console.log(req.body)
      const blog = await models.Blog.findByPk(req.body.blogId);

      if (blog) {
        const updated = await models.Blog.update(
          { isPrivate: !blog.isPrivate }, // Commutation entre true et false
          {
            where: { id: req.body.blogId },
          }
        );

        if (updated) {
          const updatedBlog = await models.Blog.findByPk(req.body.blogId);
          res.status(200).json({message: 'Changement effectué'});
        } else {
          res.status(404).json({ message: "Blog non trouvé" });
        }
      } else {
        res.status(404).json({ message: "Blog non trouvé" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors du changement de la privacy", error });
    }
  },
};

module.exports = blogController;
