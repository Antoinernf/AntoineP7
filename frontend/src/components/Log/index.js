import React, { useState } from "react";
import SignInForm from "./SignInForm"; // Se connecter
import SignUpForm from "./SignUpForm"; // S'inscrire

const Log = ( props ) => { // Constante qui contient notre JSX. Sauvegarder via les props
  const [signUpModal, setSignUpModal] = useState(props.signup); // Modal d'inscription et utilisation des hooks avec useState
  const [signInModal, setSignInModal] = useState(props.signin); // Modeal de connexion (...)

  const handleModals = (e) => { // handleModal permet de décider quoi afficher comme élément
    if (e.target.id === "register") { // si e.target correspond à l'id Register alors
      setSignInModal(false); // Passe setSignInModal sur false
      setSignUpModal(true); // (...) sur true 
    } else if (e.target.id === "login") { // So e.target est égal à login
      setSignUpModal(false); // Alors passe setSignUpModal sur false
      setSignInModal(true); // (..) sur true
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li onClick={handleModals} id="register" className={signUpModal ? "active-btn" : null} > S'inscrire </li> 
          <li onClick={handleModals} id="login" className={signInModal ? "active-btn" : null} >Se connecter </li>
        </ul>
        {signUpModal && <SignUpForm />} {/* Si SignUpModal est true alors tu affiche*/}
        {signInModal && <SignInForm />} {/* Si SignInModal est true alors tu affiche*/}
      </div>
    </div>
  );
};

{/* Ligne 23 et 24 : avec Handlemodals Au clique tu m'affiche le contenu de la constante handlemodals*/}
{/* Ligne 23 et 24 : ClassName : Condition ternaire : Si SignUpModal/SignInModal est sur true alors tu met la classe active-btn sinon tu met sur nul*/}

export default Log;