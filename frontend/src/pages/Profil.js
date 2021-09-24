import React, {useContext} from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';

const Profil = () => {

    const uid = useContext(UidContext);

    return(
        <div className="profil-page">
            {uid ? ( // A ton un uid : ID de l'utilisateur ? Si oui alors affiche ce contenu :
                <h1> CONTENU QUAND PROFIL CONNECTE </h1>
            ) : ( // Si non alors affiche ce contenu
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

export default Profil;