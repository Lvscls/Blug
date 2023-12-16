const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      // options pour la stratégie google
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/api/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      // vérifier si l'utilisateur existe déjà dans notre base de données
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // déjà un utilisateur
          const token = jwt.sign(
            { userId: currentUser.id, A2FEnabled: currentUser.isA2FEnabled },
            authConfig.jwtSecret,
            { expiresIn: "24h" }
          );
          done(null, currentUser, { token });
        } else {
          // si non, créer un nouvel utilisateur dans notre base de données
          new User({
            googleId: profile.id,
            username: profile.displayName,
            // autres champs que vous pourriez vouloir sauvegarder
          })
            .save()
            .then((newUser) => {
              const token = jwt.sign(
                { userId: newUser.id, A2FEnabled: newUser.isA2FEnabled },
                authConfig.jwtSecret,
                { expiresIn: "24h" }
              );
              done(null, newUser, { token });
            });
        }
      });
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
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ githubId: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            // déjà un utilisateur
            const token = jwt.sign(
              { userId: currentUser.id, A2FEnabled: currentUser.isA2FEnabled },
              authConfig.jwtSecret,
              { expiresIn: "24h" }
            );
            done(null, currentUser, { token });
          } else {
            // si non, créer un nouvel utilisateur dans notre base de données
            new User({
              githubId: profile.id,
              username: profile.displayName,
              // autres champs que vous pourriez vouloir sauvegarder
            })
              .save()
              .then((newUser) => {
                const token = jwt.sign(
                  { userId: newUser.id, A2FEnabled: newUser.isA2FEnabled },
                  authConfig.jwtSecret,
                  { expiresIn: "24h" }
                );
                done(null, newUser, { token });
              });
          }
        })
        .catch((err) => {
          console.error("Error during user retrieval or creation:", err);
          done(err, null);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

module.exports = passport;
