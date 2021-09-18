# PROJET GROUPOMANIA - ANTOINE ERNOUF - © 2021 #


⇢ Présentation :
<br> Groupomania est un réseau social d'entreprise.

⇢ Technologies utilisées :
<br>▹ HTML
<br>▹ CSS
<br>▹ JavaScript
<br>▹ React.js
<br>▹ Node.js
<br>▹ Express.js
<br>▹ MySQL Workbench
<br>▹ SQL

⇢ Prérequis :
<br> Vous devrez avoir Node et MySQL installés localement.

⇢ Installation :
<br>Backend :
<br>▹ Clonez ce repository ;
<br>▹ Copiez le fichier .env.example en remplaçant les valeurs par défaut pour accéder à la base de données ;
<br>▹ A partir du dossier backend, exécutez `npm install` puis `nodemon server` ;
<br>▹ Le serveur doit fonctionner sur `localhost` avec le port par défaut `3000` ;
<br> Modules utilisé :
<br> `Installer le framework Express`
`Installer Nodemon`
`Installer Sequelize `
`Installer MySQL`
`Installer Jason Web Token`
`Installer Bcrypt`
`Installer Async`
`Installer Helmet`
`Installer Express-rate-limit`

<br>Base de données :
<br> ▹ Exécutez `sequelize model:create --attributes "username:string email:string password:string" --name User` pour créer la table des utilisateurs et reproduire la même procédure pour chaque table;
<br> ▹ Exécutez `sequelize db:migrate` pour intégrer les modèles créés dans la base de données ;
<br> ▹ Lancer le backend avec `Nodemon start`

<br>Frontend :
<br>▹ A partir du dossier frontend et du sous-dossier vue-groupomania, exécutez `npm start` ;
<br>▹ Le frontend de l'application doit fonctionner sur `localhost` avec le port par défaut `8080`.