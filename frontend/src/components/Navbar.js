import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import {checkUser} from "../components/Log/checkUser";
const Navbar = () => {


    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to ="/">
                        <div className="logo">
                            <img src="./img/logo.png" alt="logo entreprise"/>
                        </div>
                    </NavLink>
                </div>
                { checkUser() ? (
                    <ul>

                        <li>
                            <NavLink exact to ="/">
                             Fil d'actualité
                            </NavLink>
                         </li>
                         <li> 
                            <NavLink exact to="/profil"> 
                             Page profil
                            </NavLink>
                         </li>

                        <li>
                            <Logout/>
                        </li>
                    </ul>
                ) : ( 
                    <ul>

                         <li> 
                            <NavLink exact to="/profil"> 
                             Créer un compte
                            </NavLink>
                         </li>

                        <li>
                            <NavLink exact to="/profil"> 
                                <img src="./img/login.png" alt="login"/>
                                <p> Connexion </p>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar
