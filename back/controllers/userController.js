const models = require("../models");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");

const userController = {
  // Récupérer tous les utilisateurs
  async getAllUsers(req, res) {
    try {
      const users = await models.User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erreur lors de la récupération des utilisateurs",
          error,
        });
    }
  },

  // Récupérer un utilisateur par son ID
  async getUserById(req, res) {
    try {
      const user = await models.User.findByPk(req.params.userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erreur lors de la récupération de l utilisateur",
          error,
        });
    }
  },

  // Mettre à jour un utilisateur
  async updateUser(req, res) {
    try {
      const updated = await models.User.update(req.body, {
        where: { id: req.params.userId },
      });
      if (updated) {
        const updatedUser = await models.User.findByPk(req.params.userId);
        res
          .status(200)
          .json({ message: "Utilisateur mis à jour", updatedUser });
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erreur lors de la mise à jour de l utilisateur",
          error,
        });
    }
  },

  // Supprimer un utilisateur
  async deleteUser(req, res) {
    try {
      const deleted = await models.User.destroy({
        where: { id: req.params.userId },
      });
      if (deleted) {
        res.status(200).json({ message: "Utilisateur supprimé" });
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erreur lors de la suppression de l utilisateur",
          error,
        });
    }
  },

  // Récupérer l'utilisateur actuel grâce au token
  async getCurrentUser(req, res) {
    try {
      const data = jwt.decode(req.body.token, authConfig.jwtSecret);
      console.log(data)
      const user = await models.User.findByPk(data.userId);
      const blog = await models.Blog.findOne({
        where: {
          UserId: user.id, // Assurez-vous que le nom de la clé étrangère est correct
        },
      });
      const isPrivate = blog?.isPrivate ?? null;
      const blogId = blog?.id ?? null;
      const filteredUser = {
        userId: user.id,
        username: user.username,
        isA2FEnabled: user.isA2FEnabled,
        hasBlog: !!blog,
        blogIsPrivate: isPrivate,
        blogId: blogId,
        // googleId: user.googleId,
        // githubId: user.githubId
      };
      res.status(200).json(filteredUser);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Erreur lors de la récupération de l utilisateur",
          error,
        });
    }
  },
};

module.exports = userController;
