import React from 'react'

export default function Progress({ children, title, startDescription = null, endDescription = null, width = 'auto' }) {
    return (
        <div style={{ width: isNaN(width) ? width : `${width}%` }}>
            {title && <p className="text-muted text-center mb-1"><small>{title}</small></p>}
            <div className="progress">
                {children}
            </div>
            {(startDescription || endDescription) &&
                <div className="d-flex">
                    {startDescription && <p className="text-muted text-nowrap text-left mb-0"><small>{startDescription}</small></p>}
                    <div className="flex-grow-1"></div>
                    {endDescription && <p className="text-muted text-nowrap text-left mb-0"><small>{endDescription}</small></p>}
                </div>
            }
        </div>
    );
};