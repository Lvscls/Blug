const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// https://www.npmjs.com/package/qrcode
const qrcode = require("qrcode");
// https://www.npmjs.com/package/otplib
const { authenticator } = require("otplib");
const authConfig = require("../config/authConfig");

const authController = {
  // Inscription d'un utilisateur
  async signup(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const secretA2F = authenticator.generateSecret();
      const user = await models.User.create({
        username: req.body.username,
        password: hashedPassword,
        secretA2F: secretA2F,
      });
      res.status(201).json({ message: "Utilisateur créé", user });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création de l utilisateur",
        error,
      });
    }
  },

  // Connexion d'un utilisateur
  async login(req, res) {
    try {
      const user = await models.User.findOne({
        where: { username: req.body.username },
      });
      if (!user) {
        return res.status(401).json({ message: "Authentification échouée" });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(401).json({ message: "Authentification échouée" });
      }
      const blacklistedToken = await models.Blacklist.findOne({
        username: user.username,
      });
      if (blacklistedToken) {
        await blacklistedToken.destroy();
      }

      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          A2FEnabled: user.isA2FEnabled,
        },
        authConfig.jwtSecret,
        { expiresIn: "24h" }
      );
      res
        .status(200)
        .json({ message: "Connexion réussie", token: token, user: user });
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur", error });
    }
  },
  // Génération du QR code pour l'A2F
  async generateQRCode(req, res) {
    try {
      const service = "BlugA2F";
      const user = await models.User.findOne({
        where: { username: req.body.username },
      });
      if (!user) {
        return res.status(401).json({ message: "Authentification échouée" });
      }
      const authenticatorSecret = user.secretA2F;
      console.log("authenticatorSecret", authenticatorSecret)
      const otpauth = authenticator.keyuri(user, service, authenticatorSecret);
      qrcode.toDataURL(otpauth, (err, imageUrl) => {
        if (err) {
          console.log("Error with QR");
          return res.status(500).send("Internal Server Error");
        }
        res.status(200).json({ imageUrl });
      });
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur", error });
    }
  },

  // Vérification du token A2F
  async verifyToken(req, res) {
    const token = req.body.verificationCode;
    const jwtToken = req.body.token;
    const decodedToken = jwt.verify(jwtToken, authConfig.jwtSecret);
    const username = decodedToken.username;
    const user = await models.User.findOne({
      where: { username: username },
    });
    const authenticatorSecret = user.secretA2F;

    try {
      if (!token) {
        throw new Error("Please supply a token");
      }

      // Vérifiez et décodez le JWT pour récupérer l'ID de l'utilisateur

      const userId = decodedToken.userId;
      if (!userId) {
        throw new Error("Invalid token format");
      }
      // Vérifiez le token avec l'authenticator
      const isValid = authenticator.check(token, authenticatorSecret);

      if (!isValid) {
        throw new Error("Invalid token");
      }

      // Mettre à jour le champ isA2FEnabled à true dans la base de données pour cet utilisateur
      const user = await models.User.findByPk(userId);

      if (!user) {
        throw new Error("User not found");
      }

      // Mettez à jour le champ isA2FEnabled à true
      await user.update({ isA2FEnabled: true });

      res.send({
        message:
          "Le token est valide et le champ isA2FEnabled a été mis à jour",
      });
    } catch (err) {
      console.error(err);
      res.status(400).send(err.message);
    }
  },

  // Déconnexion d'un utilisateur de tous ses appareils
  async logoutAll(req, res) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, authConfig.jwtSecret);
      console.log("decodedToken", decodedToken);
      await models.Blacklist.create({ username: decodedToken.username });
      res.status(200).json({ message: "Déconnexion réussie" });
    } catch (error) {
      res.status(500).json({ message: "Erreur interne du serveur", error });
    }
  },
};

module.exports = authController;
