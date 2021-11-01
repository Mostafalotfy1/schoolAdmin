import React from 'react';
import './OurServices.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const OurServices = (props) => {
    const dummyDesecration = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend, orci sed egestas faucibus, leo sapien laoreet massa, feugiat"
    return (
        <div className="card servicesCard">
            <img className="card-img-top servicesImage" src={props.image} alt="Card image" />
            <div className="card-body">
                <h4 className="card-title ourServicesCardTittle">{props.tittle}</h4>
                <p className="card-text ourServicesCardDescription">{dummyDesecration}</p>
            </div>
        </div>
    );
}

export default OurServices