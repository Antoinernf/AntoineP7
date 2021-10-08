// Imports packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: './config/.env'}); // Package Dotenv
const db = require('../models/index'); // Importation de la base de données
const {generateTokenForUser} = require('../utils/jwt.utils'); // Importer une fonction de jwt.utils


// Regex de validation
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d).{4,8}$/;

// Permet de créer un nouvel utilisateur
exports.signup = (req, res, next) => {
    const {email, username, password} = req.body

    // Permet de vérifier que tous les champs sont complétés
    if(email == null || email == '' || username == null || username == ''|| password == null || password == '') {
        return res.status(400).json({ error: 'Tous les champs doivent être renseignés' });
    } 

    // Permet de contrôler la longueur du pseudo
    if(username.length <= 3 || username.length >= 15) {
        return res.status(400).json({ error: 'Le pseudo doit contenir 3 à 15 caractères' });
    }

    // Permet de contrôler la validité de l'adresse mail
    if(!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Adresse mail invalide' });
    }

    // Permet de contrôler la validité du mot de passe
    if(!passwordRegex.test(password)) {
        return res.status(400).json({ error: "Mot de passe invalide : Entre 4 et 8 caractères et un chiffre" });
    }

    // Permet de vérifier que l'utilisateur que l'on souhaite créer n'existe pas déjà
    db.User.findOne({
        attributes: ['email' || 'username'],
        where: {
            email: email,
            username: username
        }
    })
    .then(userExist => {
        if(!userExist) {
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = db.User.build({
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                    isAdmin: 0
                });
                return user.save()
                    .then(() => res.status(201).json({ message: "Votre compte a bien été créé !" }))
                    .catch(error => res.status(400).json({ error: "Une erreur s'est produite !" }));
            })
            .catch(error => res.status(400).json({ error: "Une erreur c'est produite" }));
        } else {
            return res.status(404).json({ error: "Cet utilisateur existe déjà" })
        }
    })
    .catch(error => res.status(400).json({ error: "Une erreur s'est produite !" }));
};

// Permet à un utilisateur de se connecter
exports.login = (req, res, next) => {
    db.User.findOne({ // Fonction de Sequelize qui importe les consignes à la BDD
        where: { email: req.body.email } // Comparer email
    })
    .then(user => {
            bcrypt.compare(req.body.password, user.password)  // Comparer mot de passe avec cryptage bcrypt
            .then(valid => {

                return !valid 
                    ? res.status(401).json({ error: "Mot de passe incorrect" })
                    : res.status(200).json({
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        username: user.username,
                        imageProfile: user.imageProfile,
                        token: generateTokenForUser(user)
                    });
            })
            .catch(error => res.status(404).json({ error: "Une erreur s'est produite !" }));
    })
    .catch(error => res.status(404).json({ error: "Combinaison incorrect"})); // L'email n'est pas bon. Information masquée pour la sécurité
}

