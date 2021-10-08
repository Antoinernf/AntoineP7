import React, { useContext } from "react";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
// import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);

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
                { uid ? (
                    <ul>
                         <li> 
                             
                         </li>

                         <li className="welcome">
                            <NavLink exact to ="/profil">
                                <h5> Bienvenu Antoine </h5>
                            </NavLink>
                         </li>

                        logo  logout

                    </ul>
                ) : ( 
                    <ul>
                        <li>
                            <NavLink exact to="/profil"> 
                                <img src="./img/login.png" alt="login"/>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar
