// Objectif de APP.JS : Repérer si il y a un JWT (qui veut dire que l'utilisateur est loggé). Dans ce cas repérer le userID et le stocker dans le plus haut de notre app React.

import React, {useEffect, useState} from 'react';
import { UidContext } from './components/AppContext';
import Routes from "./components/Routes";
import axios from "axios";

const App = () => {
  const [uid, setUid] = useState(null);

  useEffect( () => {
    const fetchToken = async() => {
      await axios ({
        method: "get",
        url: "", // 1:20:00 : Pas compris comment récupurér notre jwt.
        withCredentials: true
      })
      .then((res) => 
      {
        console.log(res);
        setUid(res.data)
      })
      .catch((err) => console.log("No token"))
    };
    fetchToken();
  }, [uid]);
    


  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;