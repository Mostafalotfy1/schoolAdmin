import React from 'react';
import './TittleLoginAndSignUpCards.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const TittleLoginAndSignUpCards= (props) => {
    return (
        <h1 className="signUpAndLogin-tittle m-3">
            {props.tittleValue}
        </h1>
    );
}

export default TittleLoginAndSignUpCards
