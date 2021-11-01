import React from 'react';
import './HomeBtn.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const HomeBtn = (props) => {
    return (
        <button className="HomeBtn mt-4 mb-2">
            {props.BtnValue}
        </button>
    );
}

export default HomeBtn