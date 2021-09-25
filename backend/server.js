// Importer le fichier .env
require('dotenv').config({path: './config/.env'});

// Importer le package http de Node
const http = require('http');

// Importer notre application Node
const app = require('./app');

// Choix du port local du server
app.set('port', process.env.PORT || 3000);

// Création du serveur
const server = http.createServer(app);

// Indique le port qui doit utilisé par le serveur
server.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});