const db = require('../models/index'); // Importation de la base de données

exports.getAllMessages = (req, res, next) => {
    db.Message.findAll({
            model: db.User,
            // attributes: [ 'title' ] prendre qu'un élément de la table
    })
    .then(postFound => {
        if(postFound) {
            res.status(200).json(postFound);
        } else {
            res.status(404).json({ error: 'Aucun message trouvé' });
        }
    })
    .catch(error => {
        res.status(400).send({ error: "Une erreur c'est produite"});
    });
}


exports.createMessage = (req, res) => {
    const content = req.body.content;

    // Permet de vérifier que tous les champs sont complétés
    if (content == null || content == '') {
        return res.status(400).json({ error: 'Tous les champs doivent être renseignés' });
    } 

    // Permet de contrôler la longueur du titre et du contenu du message
    if (content.length <= 4) {
        return res.status(400).json({ error: 'Le contenu du message doit contenir au moins 4 caractères' });
    }
    
    db.User.findOne({
        where: { id: req.body.userId }
    })
    
    .then(userFound => {
       
            const post = db.Message.build({
                title: "",
                UserId: userFound.id,
                content: req.body.content,
                likes: 0,
                attachment: req.file ? `/assets/${req.file.filename}`: req.body.imagePost
            })
            post.save()
            .then(() => res.status(201).json({ message: 'Votre publication a bien été publié !' }))
        })

    .catch(error => res.status(400).json({ error: "Quelque chose c'est mal passé" }));
}


// Modifier le message
exports.modifyMessage = (req, res, next) => {

        const postObject = req.file ?
        {
        content: req.body.content,
        imagePost: `${req.protocol}://${req.get('host')}/assets/${req.file.filename}`
        } : { ...req.body };

        db.Message.findOne({
            where: {  id: req.params.postId },
        })
        .then(postFound => {
                db.Message.update(
                    postObject,
                    { where: { id: postFound.id } }
                )
                .then(post => res.status(200).json({ message: 'Votre message a bien été modifié !' }))
                .catch(error => res.status(400).json({ error: "Impossible de publier votre message" }))
            })
        .catch(error => res.status(400).json({ error: "Une erreur c'est produite" }));
    }

// SUPPRIMER UN POST
exports.deleteMessage = (req, res, next) => {

    db.Message.findOne({
        attributes: ['id'],
        where: { id: req.params.postId }
    })
    .then(post => {
        if(post) {
            if(post.imagePost != null) {
                const filename = post.imagePost.split('/assets/')[1];
            
                fs.unlink(`assets/${filename}`, () => {
                    db.Message.destroy({ 
                        where: { id: req.params.postId } 
                    })
                     return res.status(200).json({ message: 'Votre message a été supprimé' })
                })
            } else {
                db.Message.destroy({ 
                    where: { id: req.params.postId } 
                })
                return res.status(200).json({ message: 'Votre message a été supprimé' })
            }
        } else {
            return res.status(404).json({ error: 'Message non trouvé'})
        }
    })
    .catch(error => res.status(400).json({ error: "Une erreur est survenue" }));
}