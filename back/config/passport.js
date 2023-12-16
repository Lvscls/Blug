const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const models = require("../models");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/api/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Profile ID:", profile.id);
      try {
        const currentUser = await models.User.findOne({
          where: { googleId: profile.id },
        });

        if (currentUser) {
          // Utilisateur existant
          console.log("Existing user:", currentUser);
          const token = jwt.sign(
            { userId: currentUser.id, A2FEnabled: currentUser.isA2FEnabled },
            authConfig.jwtSecret,
            { expiresIn: "24h" }
          );
          done(null, currentUser, { token });
        } else {
          // Créer un nouvel utilisateur
          const newUser = await models.User.create({
            googleId: profile.id,
            username: profile.displayName,
            // autres champs que vous pourriez vouloir sauvegarder
          });

          // Générer le token pour le nouvel utilisateur
          const token = jwt.sign(
            { userId: newUser.id, A2FEnabled: newUser.isA2FEnabled },
            authConfig.jwtSecret,
            { expiresIn: "24h" }
          );
          done(null, newUser, { token });
        }
      } catch (error) {
        console.error("Error in authentication:", error);
        done(error);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "/api/auth/github/redirect", // Assurez-vous que l'URL est complète
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Profile ID:", profile.id);
      try {
        const currentUser = await models.User.findOne({
          where: { githubId: profile.id },
        });

        if (currentUser) {
          // Utilisateur existant
          console.log("Existing user:", currentUser);
          const token = jwt.sign(
            { userId: currentUser.id, A2FEnabled: currentUser.isA2FEnabled },
            authConfig.jwtSecret,
            { expiresIn: "24h" }
          );
          done(null, currentUser, { token });
        } else {
          // Créer un nouvel utilisateur
          const newUser = await models.User.create({
            githubId: profile.id,
            username: profile.displayName,
            // autres champs que vous pourriez vouloir sauvegarder
          });

          // Générer le token pour le nouvel utilisateur
          const token = jwt.sign(
            { userId: newUser.id, A2FEnabled: newUser.isA2FEnabled },
            authConfig.jwtSecret,
            { expiresIn: "24h" }
          );
          done(null, newUser, { token });
        }
      } catch (error) {
        console.error("Error in authentication:", error);
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

module.exports = passport;
