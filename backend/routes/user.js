const express = require("express");
const authRouter = express.Router(); // Crée un routeur

// Permet d'importer le controller utilisateurs
const userCtrl = require("../controllers/user");

// Permet d'exporter le router
module.exports = (app) => {
  const auth = require("../middleware/auth"); // Permet d'importer le middleware auth pour la gestion du token JWT
  const multer = require("../middleware/multer-config");

  // Routes de l'API pour les utilisateurs
  authRouter.get("/user/:id", auth, userCtrl.getUserProfile);
  authRouter.patch("/user/:id", auth, multer, userCtrl.modifyUserProfile);
  authRouter.delete("/user/:id", auth, userCtrl.deleteAccount);

  // Mettre la racine /api à toutes nos routes
  app.use("/api", authRouter);
};
