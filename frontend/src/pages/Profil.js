import React, {useContext} from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext'; // Import de UidContext pour savoir si notre utilisateur est connecté ou pas

const Profil = () => {

    const uid = useContext(UidContext); // On stock la data avec le hook useContext. Notre variable uid aura l'id de notre utilisateur seulement si il est connecté
    console.log(uid);
    return( // JSX
        <div className="profil-page">
            {uid ? ( // Conditions ternaires : A ton un uid : ID de l'utilisateur ? Si oui alors affiche ce contenu :
                <h1> CONTENU QUAND PROFIL CONNECTE </h1>
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