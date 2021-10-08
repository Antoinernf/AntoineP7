// Permet d'importer express
const express = require('express');

// Crée un routeur
const likeRouter = express.Router();


module.exports = (app) => {

// Permet d'importer le middleware auth
const auth = require('../middleware/auth');

// Permet d'importer le controller message et le controleur like
const likeCtrl = require('../controllers/like');

// Route de l'API pour les likes
likeRouter.post('/like/', likeCtrl.setLike); // Like a post
// likeRouter.get('/like/:postId', auth, likeCtrl.getAllLike);// Select post liked
likeRouter.get('/like/:postId', auth, likeCtrl.getCountLike); 
// Mettre la racine /api à toutes nos routes
app.use('/api', likeRouter) 

}