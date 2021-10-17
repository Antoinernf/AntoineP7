import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState(""); // UseState avec comme valeur vide par defaut
  const [password, setPassword] = useState(""); // (...)
  const [error, setError] = useState(""); // (...)
  const handleLogin = (e) => { // Prend en charge le login avec handleLogin
    e.preventDefault(); // Pas de rechargement total de la page en React
    const errorSend = document.querySelector(".password.error"); // (...password)

    //Appel à l'API avec Axios
    axios.post("http://localhost:8080/api/login", {
        email: email,
        password: password,
      })
        .then((res) => {
          console.log('res', res);
          localStorage.setItem('userLogin', JSON.stringify(res.data))
          console.log("connexion réussite");
          console.log("Voici la réponse du LS", JSON.parse(localStorage.getItem("userLogin").token)); // Mettre les données dans le localStor
          // window.location = "/"; // Renvoyer vers la page d'accueil une fois connecté. A activer.
          return setError('conenxion réussi'); // Retrait du message d'erreur
        })

        .catch((err) => {
            console.error(err,'==>',  err);
            // Afficher l'erreur à l'écran
            return setError("Erreur lors de l'identification") // On va chercher les erreurs que renvoi l'api pour la connexion

        });
        console.log(email);

  };
  // ----------//

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
      {error && <div>{error}</div>}
    </form>
  );
};
// Ligne 34 : onSubmit : Avec HandleLogin on va pouvoir traiter les données entieres du formulaire dans React. En lien avec le boutton de  type submit du formulaire
// Ligne 41 : Onchange : Tu stock les contenu dans e.target.value à l'envoie des donneés de l'input en lien. Via les Hooks > States
// Ligne 52 : Idem ligne 41
export default SignInForm;
