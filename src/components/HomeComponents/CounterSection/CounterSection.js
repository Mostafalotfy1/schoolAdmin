import React from 'react';
import './CounterSection.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import i18next from 'i18next'


const CounterSection = () => {
    return (
        <>
            <div className="col-sm-12 col-md-3">
                <p className="counter">
                    <CountUp end={53} redraw={true} >
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                </p>
                <div className="border-counter"></div>
                <p className="descriptionCounter mt-4">
                    {i18next.t('Certified')}
                </p>
                <p className="descriptionCounter">
                    {i18next.t('CertifiedCaption')}
                </p>
            </div>
            <div className="col-sm-12 col-md-3">
                <p className="counter">
                    <CountUp end={48} redraw={true} >
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                </p>
                <div className="border-counter"></div>
                <p className="descriptionCounter mt-4">
                    {i18next.t('Medical')}
                </p>
                <p className="descriptionCounter">
                    {i18next.t('MedicalCaption')}
                </p>
            </div>
            <div className="col-sm-12 col-md-3">
                <p className="counter">
                    <CountUp end={12} redraw={true} >
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                </p>
                <div className="border-counter"></div>
                <p className="descriptionCounter mt-4">
                    {i18next.t('Different')}
                </p>
                <p className="descriptionCounter">
                    {i18next.t('DifferentCation')}
                </p>
            </div>
            <div className="col-sm-12 col-md-3">
                <p className="counter">
                    <CountUp end={96} redraw={true} >
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                </p>
                <div className="border-counter"></div>
                <p className="descriptionCounter mt-4">
                    {i18next.t('Offered')}
                </p>
                <p className="descriptionCounter">
                    {i18next.t('OfferedCaption')}
                </p>
            </div>
        </>
    );
}

export default CounterSection