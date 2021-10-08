const db = require('../models/index'); // Importation de la base de données

// Récupérer les profils utilisateurs
exports.getUserProfile = (req, res, next) => {
    const id = req.params.id;
    db.User.findOne({
        attributes: [ 'id', 'email', 'username', 'bio', 'isAdmin' ],
        where: { id: id }
    })
    .then(user => {
            res.status(200).json(user);
    })
    .catch(error => res.status(404).json({ error: "Impossible de trouver l'utilsateur" }));
}

// Permet à un utilisateur de modifier son profil
exports.modifyUserProfile = (req, res, next) => {
    const body = req.body;
    db.User.update( // Query uptade vers la BDD
        body,
        {where: {id: req.params.id } }
    )
    .then(result => {
        console.log("result success", result)
        res.status(200).json("Profil mis à jour")
    })
    .catch(error => {
        console.log('error', console.error())
        res.status(200).json({ message: error })
    })
};

// Permet à un utilisateur de supprimer son compte
exports.deleteAccount = (req, res, next) => {
    const id = req.params.id;
    db.User.destroy({where:{ id: id }}) 
    .then(result => {
        console.log("result success", result)
        res.status(200).json({ message: "Profil supprimé" })
    })
    .catch(error => {
        console.log('error', console.error())
        res.status(200).json({ message: error })
    })
}