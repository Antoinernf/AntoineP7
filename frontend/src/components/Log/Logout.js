import React from 'react'
import { NavLink } from "react-router-dom";

const Logout = () => {

    const clearLocalStorage = () => {
        JSON.parse(localStorage.removeItem("userLogin"))
    }

    return (
        <li onClick={clearLocalStorage}>
            <NavLink exact to ="/">
                <img src="./img/logout.png" alt="login"/>
                <p> Deconnexion </p>
            </NavLink>
        </li>
    )
}

export default Logout;