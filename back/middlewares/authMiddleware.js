const jwt = require("jsonwebtoken");
const models = require("../models");
const authConfig = require("../config/authConfig");

module.exports = verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, authConfig.jwtSecret);
      const username = decodedToken.username;
      const user = await models.User.findOne({
        where: { username: username },
      });
      if (!user) {
        return res.status(401).json({ message: "Authentification échouée" });
      }
      next(); // Passez au middleware suivant si le token et l'utilisateur sont valides
    } catch (error) {
      // Gestion des erreurs liées au JWT
      return res.status(401).json({ message: "Token invalide" });
    }
  } else {
    res.status(401).json({ message: "Token non fourni" });
  }
};
