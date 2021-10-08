import React from 'react'
import axios from 'axios'
import cookie from 'js-cookie'

const Logout = () => {

    const removeCookie = (key) => {
        if (window !== "undefine") {
            cookie.remove(key, {expires: 1})
        }
    }

    const logout = async () => {
    await axios({
        method: 'get',
        url: 'http://localhost:8080/api/logout',
        withCredentials: true,
    })
    .then(() => removeCookie('jwt'))
    .catch((err) => console.log(err))


    window.location = "/";
    
    }

    return (
        <li onClick={logout}>
            <img src="/img/logout.png"/>
        </li>
    )
}

export default Logout;