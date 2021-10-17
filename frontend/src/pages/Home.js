import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { dateParser } from "../components/dateParser";
import LikeButton from "../components/actions/LikeButton";
import {nameStorage} from "../components/Log/nameStorage";

function Home(){

    const [posts, setPosts] = useState([])
    const errorSend = document.querySelector(".postsError");


    useEffect(() => {

        const fetchData = async () => {
          
            const result = await fetch('http://localhost:8080/api/message')
            .then(res => res.json())
            .catch((err) => {
              console.error(err,'==>',  err.response.data.error); // Récupération de l'erreur
              errorSend.innerHTML = "Publications non disponibles"; // Afficher l'erreur à l'écran
              });
            console.log(result);
                        
            setPosts(result);
        }

        fetchData();

    }, [])

        return (
            <div>

            <h1 className="titreFeed">Bonjour {nameStorage} ! Voici les publications récentes</h1>

                <div className="thread-container">

                    {posts.map((post,index) => (

                        <li key={index} className="card-container">
                            <div className="card-left">
                                <img src="./img/profil.png" alt="userProfil" />
                            </div>
                            <div className="card-right">
                                <div className="pseudo">
                                    <h3> Pseudo Utilisateurs </h3>
                                </div>
                                    <span>{dateParser(post.createdAt)}</span>     
                                <p>{post.content}</p>
                                + Element multimedia

                                <div className="card-footer">
                                    <img src="./img/share.png" alt="sharebutton" />
                                    <LikeButton />
                                    <p> {post.likes}</p>
                                </div>
                            </div>

                        </li>

                    ))}

                </div>

            </div>
        ) 
}

export default Home;