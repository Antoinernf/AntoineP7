// Permet d'importer express
const express = require('express');

// Crée un routeur
const messageRouter = express.Router();


module.exports = (app) => {

// Permet d'importer le middleware auth
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


// Permet d'importer le controller message et le controleur like
const messageCtrl = require('../controllers/message');

// Routes de l'API pour les messages "CRUD"
messageRouter.post('/message/', auth, multer, messageCtrl.createMessage); // Create information
messageRouter.get('/message/', messageCtrl.getAllMessages); // Read information
messageRouter.patch('/message/:postId', auth, multer, messageCtrl.modifyMessage); // Update informations
messageRouter.delete('/message/:postId', auth, messageCtrl.deleteMessage); // Delete information

// Mettre la racine /api à toutes nos routes
app.use('/api', messageRouter) 

}