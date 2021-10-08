// Objectif de APP.JS : Repérer si il y a un JWT (qui veut dire que l'utilisateur est loggé). Dans ce cas repérer le userID et le stocker dans le plus haut de notre app React.
import React, {useEffect, useState} from 'react';
import { UidContext } from './components/AppContext'; // Le hook useContext permet de stocker le JWT de l'utilisateur
import Routes from "./components/Routes";
import axios from "axios";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null); // Stocker de la data via uid
  const dispatch = useDispatch();

  useEffect( () => {
    const fetchToken = async() => {
      await axios ({
        method: "get",
        url: "http://localhost:8080/api/jwid", // 1:23:00 TC
        withCredentials: true
      })
      .then((res) => 
      {
        console.log(res);
        setUid(res.data.userId) // reponse de l'API dans le chemin data. Attention doit bien contenir l'ID utilisateur avec la bonne response API
      })
      .catch((err) => console.log("No token"))
    };
    fetchToken(); // On appel la fonction asynchrone

    if (iud) dispatch(getUser(uid)) // si uid présent dispache dans un store
  }, [uid]); // Callback pour ne pas la requête à l'infini. A chaque fois que UID Evolue tu me relance useEffect
    
// UidContext.Provider : Permet de rechercher la value de UID dans notre context. (ID de notre utilisateur). 
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;