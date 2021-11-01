import React from 'react';
import './HomeCards.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const HomeCards = (props) => {
    return (
        <div className="col-xs-12 col-md-4 mb-3" id="CardsSpace">
            <div className={props.card} style={{backgroundColor:props.color, height: props.height}}>
                <div className="card-body">
                    
                </div>
            </div>
        </div>
    );
}

export default HomeCards