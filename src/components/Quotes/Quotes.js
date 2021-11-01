import React from 'react';
import './Quotes.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const Quotes = (props) => {
    return (
        <div>
            <p className="footer-Quotes-Card">
                {props.Quotes} &#128147; &#127804;
            </p>
        </div>
    );
}

export default Quotes