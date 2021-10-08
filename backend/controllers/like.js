const db = require("../models/index");
const Sequelize = require('sequelize');

exports.getCountLike = (req, res, next) => {
    db.Like.findAll({
        where: { isLike: true, messageId: req.params.postId },
        attributes: [[Sequelize.fn('count', Sequelize.col('isLike')), 'count']],
      })
      .then(count => {
        res.status(200).json({ msg: "OK", result: count[0], res: count['count'] })
    })
    .catch(error => res.status(404).json({ error: "BAD REQUEST" }));
};

exports.setLike = (req, res, next) => {
    db.Like.findOne({
         where: { messageId: req.body.postId,
                  userId: req.body.userId
                 }, // Récupération de l'id du message
     })
     .then(like => {
            db.Like.update({
                isLike: !like.isLike
            },{where: { messageId: like.messageId,
                userId: like.userId
               },})
            .then(success => {
                res.status(200).json({ msg: "OK" })
            })
            .catch(error => res.status(404).json({ error: "BAD REQUEST" }));
        })
    .catch(error => {
        db.Like.create({ 
            messageId: req.body.postId, 
            userId: req.body.userId,
            isLike: true
        })
        .then(success => {
            res.status(200).json({ msg: "OK" })
        })
        .catch(error => res.status(404).json({ error: "BAD REQUEST" }));
    })  
}
