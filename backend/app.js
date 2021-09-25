// Importation package
const express = require('express');
const helmet = require('helmet');
const rateLimit   = require("express-rate-limit");

// Permet d'accéder au chemin du système de fichiers
const path = require('path');

// Permet de créer l'application express
const app = express();

// Sécurisation avec RateLimiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });


// Middleware d'authorisation CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Part 2
const cors = require('cors');
app.use(cors({origin: true, credentials: true}));

// Importation des fichiers dédiés aux routes de l'app
// Permet d'importer les routers user 
const userRoutes = require('./routes/user');

// Transforme le corps de la requête en objet JS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Permet de configurer les en-têtes HTTP de manière sécurisée
app.use(helmet());

// Configuration des routes
app.get('/', limiter, function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon super server</h1>');
});

// Permet d'accéder aux routes pour les utilisateurs
app.use('/api/user', userRoutes);

// Permet d'exporter l'application express pour pouvoir y accéder depuis les autres fichiers du projet 
module.exports = app;