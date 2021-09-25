// Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config({path: './config/.env'});

const db = require('../models/index');


// Regex de validation
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d).{4,8}$/;


// Permet de créer un nouvel utilisateur
exports.signup = (req, res, next) => {
    var email    = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    console.log(email);
    console.log(username);
    console.log(password);

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
        return res.status(400).json({ error: 'Mot de passe invalide (must length 4 - 8 and include 1 number at least' });
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
                user.save()
                    .then(() => res.status(201).json({ message: 'Votre compte a bien été créé !' }))
                    .catch(error => res.status(400).json({ error: 'Une erreur s\'est produite !' }));
            })
            .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de votre compte' }));
        } else {
            return res.status(404).json({ error: 'Cet utilisateur existe déjà' })
        }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
};


// Permet à un utilisateur de se connecter
exports.login = (req, res, next) => {
    db.User.findOne({
        where: { email: req.body.email }
    })
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect' });
                }
                res.status(200).json({
                    userId: user.id,
                    isAdmin: user.isAdmin,
                    username: user.username,
                    imageProfile: user.imageProfile,
                    token: jwt.sign(
                        {userId: user.id},
                        process.env.JWT_SECRET_TOKEN,
                        {expiresIn: '24h'}
                    )
                });
            })
            .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
        } else {
            return res.status(404).json({ error: 'Cet utilisateur n\'existe pas, veuillez créer un compte' })
        }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
}
