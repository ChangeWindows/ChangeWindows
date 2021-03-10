import React from 'react'

export default function Timeline({ date, children }) {
    return (
        <div className="col-12 timeline">
            <h3 className="h6 text-primary">{date}</h3>
            {children}
        </div>
    );
};