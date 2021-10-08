const express = require('express');
const userRouter = express.Router(); // Crée un routeur

// Permet d'importer le controller utilisateurs
const authCtrl = require('../controllers/auth');

// Permet d'exporter le router
module.exports = (app) => {

// Routes de l'API pour les utilisateurs
userRouter.post('/signup', authCtrl.signup);
userRouter.post('/login', authCtrl.login);

// Mettre la racine /api à toutes nos routes
app.use('/api', userRouter) 

}




