import React from 'react';
import './OffersBtn.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next'

const OffersBtn = (props) => {
    return (
        <a className={props.class}>
            {i18next.t('GetNow')} 
        </a>
    );
}

export default OffersBtn