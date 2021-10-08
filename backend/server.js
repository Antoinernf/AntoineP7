// Importer le fichier .env
require('dotenv').config({path: './config/.env'});

// Importer le package http de Node
const http = require('http');

// Importer notre application Node
const app = require('./app');

// Indique le port qui doit utilisé par le serveur
app.listen(8080, () => {
    console.log(`Listening on port 8080`);
});