import React, { useMemo } from 'react';

import useMediaQuery from '../../hooks/useMediaQuery';

export default function Progress({ children, title, startDescription = null, endDescription = null, duration = null, totalDuration = null, highestDuration = null }) {
	const matchesMdUp = useMediaQuery('(min-width: 768px)');

    const width = useMemo(() => {
        if (isNaN(duration) || isNaN(totalDuration)) {
            return 'auto';
        }

        if (matchesMdUp) {
            return `${duration / totalDuration * 100}%`;
        }

        const longestWidth = highestDuration / totalDuration * 100;

        return `${duration / totalDuration * 100 / longestWidth * 100}%`
    }, [matchesMdUp, duration, totalDuration, highestDuration]);

    return (
        <div style={{ width }} className="progress-block d-block">
            {title && <p className="progress-title"><small>{title}</small></p>}
            <div className="progress">
                {children}
            </div>
            {(startDescription || endDescription) &&
                <div className="d-flex">
                    <p className="progress-date me-2"><small>{startDescription}</small></p>
                    <div className="flex-grow-1"></div>
                    <p className="progress-date"><small>{endDescription}</small></p>
                </div>
            }
        </div>
    );
};