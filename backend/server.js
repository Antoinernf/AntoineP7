// Imports
const express     = require('express');
const apiRouter   = require('./apiRouter').router;
const morgan      = require("morgan");
const helmet      = require("helmet");
const rateLimit   = require("express-rate-limit");
require('dotenv').config({path: './config/.env'});

// Création d'app express
var server = express();

// Sécurisation
server.use(helmet());

// logger les requests et responses
server.use(morgan("dev"));

// AUTORISATION DE L'UTILILISATION DE L'API AVEC CORS
var cors = require('cors');
server.use(cors({origin: true, credentials: true}));

// AUTORISATION DE L'UTILILISATION DE L'API DU HEADER
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Utilisation de RateLimit 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

// Utilisation de JSON pour le flux de données
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Configuration des routes
server.get('/', limiter, function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon super server</h1>');
});

// Instancier le server
server.use('/api/', apiRouter);

// Launch server
server.listen(process.env.PORT, function() {
    console.log('Server en écoute :)');
});