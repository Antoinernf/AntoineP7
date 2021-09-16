import React, {useEffect} from 'react';

const SignUpForm = () => {

    
    useEffect(() => {
            fetch('http://localhost:8080/api/messages')
            //fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => {
                console.log(response);
                return response.json();
            })
    }, [])


    return(
        <div>
            <p> S'inscrire </p> 
        </div>
    );
};

export default SignUpForm;