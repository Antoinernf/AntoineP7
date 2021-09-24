import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SignInForm from "./SignInForm";

const SignUpForm = () => {
    // Importation des useStates
    const [formSubmit, setFormSubmit] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    // Gestion du formulaire : Prendre en compte l'enregistrement de l'utilisateur
    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById("terms");
        const usernameError = document.querySelector(".username.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(
          ".password-confirm.error"
        );
        const termsError = document.querySelector(".terms.error");
    
        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";
    
        if (password !== controlPassword || !terms.checked) {
          if (password !== controlPassword)
            passwordConfirmError.innerHTML =
              "Les mots de passe ne correspondent pas";
    
          if (!terms.checked)
            termsError.innerHTML = "Veuillez valider les conditions générales";
        } else {
          await axios({
            method: "post",
            url: "http://localhost:8080/api/users/register",
            data: {
              email,
              username,
              password
            },
          })
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


      return (
        <>
          {formSubmit ? (
            <>
              <SignInForm />
              <span></span>
              <h4 className="success">
                Enregistrement réussi, veuillez-vous connecter
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
    