import React, {useState} from "react";

const LikeButton = () => {
    const [liked, setLiked] = useState(false);

    return (
        <div>
            <img src="./img/liked.png" alt="Like"/>
        </div>
    )
};

export default LikeButton;