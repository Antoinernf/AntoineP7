import React, {useContext} from 'react';
import Log from '../components/Log';
import {NavLink} from "react-router-dom";
import LogoutBtn from "../components/Log/LogoutBtn";
import {checkUser} from "../components/Log/checkUser";
import {nameStorage} from "../components/Log/nameStorage";

const Profil = () => {
    console.log('checkUser', checkUser())
    console.log(nameStorage);
    
    return( // JSX
        <div className="profil-page">
            {checkUser() ? ( // Condition ternaire connecté / déconnecté
                 <div className="profil-container">
                 <div className="update-container">
                     
                 <div className="left-part">
                     <h1> Bonjour {nameStorage} </h1>
                     <img src="./img/profil.png" alt="userProfil" />
                 </div>
                 <div className="right-part">
                     <h1> Que vous voulez faire ? </h1>
                     <NavLink exact to ="/"> <button> Voir mes postes</button> </NavLink>
                     <NavLink exact to ="/"> <button> Publier un poste </button> </NavLink>
                     <LogoutBtn/>
                     <button> Supprimer mon compte </button>
                     <button> Contacter le service technique </button> 
                 </div>
                 </div>
             </div>
            ) : ( // Si non alors affiche le contenu d'un utilisateur non connecté. ici on importe les modules de signIn/SignUp
            <div className="log-container">
                <Log signin={false} signup={true} /> 
                <div className="img-container">
                    <img src="./img/log.png" alt="img" />
                </div>
            </div>
            )}
        </div>
    );
};
// Ligne 15 : Par defaut, tu m'affiche signin en false et signup en true pour demander à l'utilisateur de s'inscrire

export default Profil;