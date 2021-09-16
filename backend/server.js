// Imports
var express     = require('express');
var bodyParser  = require('body-parser');
var apiRouter   = require('./apiRouter').router;

// Sécurité
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Instantiate server
var server = express();

// Authorisations
var app  = express();
var cors = require('cors');
app.use(cors({origin: true, credentials: true}));
app.use(helmet());

// AUTORISATION DE L'UTILILISATION DE L'API
app.use(function(req, res, next) {
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


// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure routes
server.get('/', limiter, function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon super server</h1>');
});

// Instancier le server
server.use('/api/', apiRouter);

// Launch server
server.listen(8080, function() {
    console.log('Server en écoute :)');
});