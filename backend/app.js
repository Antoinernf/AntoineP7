// Importation package
const express = require('express'),
    helmet = require('helmet'),
    rateLimit   = require("express-rate-limit"),
    cors = require('cors');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

const fs = require('fs');

// Permet de créer l'application express
const app = express();

// Transforme le corps de la requête en objet JS
app.use(express.json({limit: '10mb'})); // Requêtes API ou AJAX + Accepte une limite de 500mb
app.use(express.urlencoded({limit: '10mb', extended: true })); // Pour les formulaires POST + Accepte une limite de 500mb

// Sécurisation avec RateLimiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

// Authorisation CORS
app.use(cors({origin: true, credentials: true}));

// Importation des fichiers dédiés aux routes de l'app
require('./routes/auth')(app); // Importation des routes sur l'utilisateur
require('./routes/user')(app); // Importation des routes sur l'édition des informations utilisateurs
require('./routes/message')(app); // Importation des routes sur les publications et la gestion des likes et commentaires
require('./routes/like')(app); // Importation des routes sur la gestion des likes

// Permet de configurer les en-têtes HTTP de manière sécurisée
app.use(helmet());

// Message par defaut
 app.use((req, res) => {
     res.status(200).send("Bonjour, le serveur est en marche !");
})

// Export du JWT pour le front pour checker les utilisateur et les déconnecter
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// Permet d'exporter l'application express pour pouvoir y accéder depuis les autres fichiers du projet 
module.exports = app;