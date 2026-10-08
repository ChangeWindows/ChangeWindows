import React from "react";

export default function FlagTimeline({ title, children }) {
  return (
    <>
      <div className="titel col-12">
        <h3 className="h6 text-primary">{title}</h3>
      </div>
      <div className="timeline col-12">{children}</div>
    </>
  );
}
