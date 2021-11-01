import React from 'react';
import './OffersCards.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import OffersBtn from'../OffersBtn/OffersBtn'
import i18next from 'i18next'

const OffersCards = (props) => {
    let id =0 ;
    return (
        <div className={props.CardClass} style={{ backgroundColor: props.bgColor, height: props.CardHeight,zIndex:props.zIndex }}>
            <div className="card-tittle">
                <h2 className="offerTittle">
                    {props.offerTittle}
                </h2>
            </div>
            <div className="card-body">
                <h2 className="offerPrice">
                {i18next.t('Price')}{props.offerPrice}
                </h2>
                <p className="treatmentNumbers">
                    {props.treatmentNumbers} {i18next.t('treatments')}
                </p>
                {props.offersArr.map((offer) => (
                    <p key={++id} className="Offers">{offer}</p>
                ))}
                <OffersBtn class={props.btnClass}/>
            </div>
        </div>
    );
}

export default OffersCards