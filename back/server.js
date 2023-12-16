const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const passportConfig = require('./config/passport');
const appConfig = require("./config/appConfig");

// Importation des modèles
const models = require("./models");

// Importation des routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();


app.use(session({
    secret: 'votre_secret_ici', // Utilisez un secret fort en production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Mettez `true` si vous êtes sur HTTPS
  }));
  
// Middleware pour l'analyse du corps des requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour la gestion des CORS
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(passportConfig.initialize());
app.use(passportConfig.session());

// Configuration des routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).send("Désolé, cette route n'existe pas !");
});

// Synchronisation avec la base de données et démarrage du serveur
models.sequelize.sync().then(() => {
  app.listen(appConfig.port, () => {
    console.log(`Serveur démarré sur le port ${appConfig.port}`);
  });
});
