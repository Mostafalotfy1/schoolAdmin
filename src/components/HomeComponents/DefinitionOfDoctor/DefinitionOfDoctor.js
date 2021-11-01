import React from 'react';
import './DefinitionOfDoctor.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeBtn from '../HomeBtn/HomeBtn';
import i18next from 'i18next'




const DefinitionOfDoctor = () => {
    const dummyData = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus orci ex, pulvinar nec finibus ut, cursus eget libero. In dictum sem"
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title DoctorName">
                    <strong className="coloredName">{i18next.t('DoctorNameHome')}</strong> {i18next.t('DoctorFatherNameHome')}
                </h4>
                <p className="card-text descriptionColor mb-5">{i18next.t('DoctorHomeTittle')}</p>
                <p className="explainSection">
                    <strong>
                        {dummyData}
                    </strong>
                </p>
                <p className="explainSection">
                    {dummyData}
                </p>
                < HomeBtn BtnValue={i18next.t('ViewAllDoctorBTN')}/>
            </div>
        </div>
    );
}

export default DefinitionOfDoctor

