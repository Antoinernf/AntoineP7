// Imporation
var express     = require('express');
var apiRouter   = require('./apiRouter').router;
var app   = express();
var cors = require('cors');
app.use(cors({origin: true, credentials: true}));


// AUTORISATION DE L'UTILILISATION DE L'API
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Instensier le server
var server = express();

// Configuration avec Json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Configure les routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon super server !!!!!</h1>');
});

server.use('/api/', apiRouter);

// Choix du serveur local
server.listen(8080, function() {
    console.log('Server en écoute :)');
});