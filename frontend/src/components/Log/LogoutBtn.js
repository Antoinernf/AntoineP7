import React from 'react'
import { NavLink } from "react-router-dom";

const LogoutBtn = () => {

    const clearLocalStorage = () => {
        JSON.parse(localStorage.removeItem("userLogin"))
    }

    return (
        <li onClick={clearLocalStorage}>
            <NavLink exact to ="/">
                <button> Deconnexion </button>
            </NavLink>
        </li>
    )
}

export default LogoutBtn;