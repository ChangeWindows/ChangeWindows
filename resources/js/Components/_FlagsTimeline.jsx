import React from 'react';

export default function FlagTimeline({ title, children }) {
  return (
    <>
      <div className="col-12 titel">
        <h3 className="h6 text-primary">{title}</h3>
      </div>
      <div className="col-12 timeline">
        {children}
      </div>
    </>
  );
};
