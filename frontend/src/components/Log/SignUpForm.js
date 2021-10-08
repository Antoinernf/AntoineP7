import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SignInForm from "./SignInForm";

const SignUpForm = () => {
    // Importation des useStates pour faire passer les valeurs des formulaires. Par defaut on met des strings vides
    const [formSubmit, setFormSubmit] = useState(false); // Est ce que le formSubmit est envoyé ? Par defaut FALSE : Non. Lien avec ligne 66 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    // Gestion du formulaire : Prendre en compte l'enregistrement de l'utilisateur
    const handleRegister = async (e) => {
        e.preventDefault();
        // Gestion des messages d'erreurs en lien avec le back
        const terms = document.getElementById("terms");
        const usernameError = document.querySelector(".username.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error"); 
        // Gestion des messages d'erreur en front
        const passwordConfirmError = document.querySelector(  
          ".password-confirm.error"
        );
        const termsError = document.querySelector(".terms.error"); 
    
        // On réinjecte des string vide à chaque relance de formulaire (permet de faire disparaitre le message d'erreur)
        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";
     
        // Vérification en front pour le password identique et conditions générales
        if (password !== controlPassword || !terms.checked) {
          if (password !== controlPassword)
            passwordConfirmError.innerHTML =
              "Les mots de passe ne correspondent pas";
    
          if (!terms.checked)
            termsError.innerHTML = "Veuillez valider les conditions générales";
        } else { // Quand tout est bon, on importe l'API pour envoyer les données en Post.
          await axios({
            method: "post",
            url: "http://localhost:8080/api/signup",
            data: {
              username,
              email,
              password
            },
          }) // On va rechercher le contenu des messages d'erreurs
            .then((res) => {
              console.log(res);
              if (res.data.errors) {
                usernameError.innerHTML = res.data.errors.username;
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
              } else {
                setFormSubmit(true);
              }
            })
            .catch((err) => console.log(err));
        }
      };

 // Condition ternaire : On arrive par default sur le formulaire. Et quand le formulaire est valide alors on envoie le contenu de réussite d'inscription avec "formSubmit" déclaré ligne 7
      return (
        <>
          {formSubmit ? (
            <>
              <SignInForm />
              <span></span>
              <h4 className="success">
                Enregistrement réussi ! Merci de vous connecter
              </h4>
            </>
          ) : (
            <form action="" onSubmit={handleRegister} id="sign-up-form">
              <label htmlFor="username">Pseudo</label>
              <br />
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <div className="username error"></div>
              <br />
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
              <div className="password error"></div>
              <br />
              <label htmlFor="password-conf">Confirmer mot de passe</label>
              <br/>
              <input
                type="password"
                name="password"
                id="password-conf"
                onChange={(e) => setControlPassword(e.target.value)}
                value={controlPassword}
              />
              <div className="password-confirm error"></div>
              <br />
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                J'accepte les{" "}
                <a href="/" target="_blank" rel="noopener noreferrer">
                  conditions générales
                </a>
              </label>
              <div className="terms error"></div>
              <br />
              <input type="submit" value="Valider inscription" />
            </form>
          )}
        </>
      );
    };
    
    export default SignUpForm;