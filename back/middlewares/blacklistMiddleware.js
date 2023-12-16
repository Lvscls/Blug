const models = require("../models");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");

module.exports = verifyBlackList = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token non fourni" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, authConfig.jwtSecret);
    const username = decodedToken.username;

    const blacklistedToken = await models.Blacklist.findOne({
      where: { username: username },
    });

    if (blacklistedToken) {
      return res.status(401).json({ message: "Token sur liste noire" });
    } else {
      next();
    }
  } catch (error) {
    // Gestion des erreurs liées au JWT
    return res.status(401).json({ message: "Token invalide" });
  }
};
