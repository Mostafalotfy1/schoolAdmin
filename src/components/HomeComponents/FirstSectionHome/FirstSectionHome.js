import React from 'react';
import { Wave } from 'react-animated-text';
import lady from '../../../Assets/Images/doctor-writing-e1531897748239.png'
import HeaderIcons from '../../../Assets/Images/HeaderIcons.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './FirstSectionHome.css'
import FadeIn from 'react-fade-in';
import i18next from 'i18next'


const FirstSectionHome = () => {
    return (
        <>
            <div className="col-xs-12 col-lg-6 mb-3">
                <div className="HomeDescription ml-5 align-middle text-center animate__zoomIn">
                    <FadeIn>
                        <span className="TittleColor">
                            {i18next.t('Professional')}
                        </span>
                    <span className="TittleColor">
                        {i18next.t('ProfessionalSub')}
                    </span>
                    </FadeIn>
                    <p className="mt-4 heading-content">
                        <FadeIn>
                            {i18next.t('ProfessionalCaption')}
                        </FadeIn>
                    </p>
                    <img src={HeaderIcons}/>
                </div>
            </div>
            <div className="col-xs-12 col-lg-6  mt-5">
                <img src={lady} className="ImageWidth" />
            </div>
        </>
    );
}

export default FirstSectionHome