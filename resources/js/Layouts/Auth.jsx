import React, { useEffect, useState } from 'react';

import { faArrowLeft, faSunHaze } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Auth({ children }) {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', function() {
            setWindowHeight(window.innerHeight);
        });

        () => window.removeEventListener('resize');
    });

    return (
        <div className="auth auth-flow" style={{ height: windowHeight }}>
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