import React from 'react'

export default function Timeline({ date, children }) {
    return (
        <>
            <div className="col-12 titel">
                <h3 className="h6 text-primary">{date}</h3>
            </div>
            <div className="col-12 timeline">
                {children}
            </div>
        </>
    );
};