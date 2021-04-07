import { faArrowLeft, faSunHaze } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function Auth({ children }) {
    return (
        <div className="auth">
            <div className="content">
                <a href="javascript:history.back()" className="btn btn-link btn-sm text-white"><FontAwesomeIcon icon={faArrowLeft} /> Back</a>
                <div className="auth-card">
                    <h3 className="m-0 py-5 text-center">
                        <FontAwesomeIcon icon={faSunHaze} fixedWidth /> Horizon
                    </h3>
                    { children }
                </div>
            </div>
        </div>
    )
}