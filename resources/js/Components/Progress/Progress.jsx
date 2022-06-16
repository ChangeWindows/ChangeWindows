import React, { useMemo } from "react";

export default function Progress({
  children,
  title,
  startDescription = null,
  endDescription = null,
  duration = null,
  totalDuration = null,
  highestDuration = null,
  small,
}) {
  const width = useMemo(() => {
    return `${(duration / totalDuration) * 100}%`;
  }, [duration, totalDuration, highestDuration]);

  return (
    <div style={{ width }} className="progress-block d-block">
      {title && !small && (
        <p className="progress-title d-none d-lg-block">
          <small>{title}</small>
        </p>
      )}
      <div className="progress" style={small && { height: 2 }}>{children}</div>
      {(startDescription || endDescription) && !small && (
        <div className="d-none d-lg-flex">
          <p className="progress-date me-2">
            <small>{startDescription}</small>
          </p>
          <div className="flex-grow-1"></div>
          <p className="progress-date">
            <small>{endDescription}</small>
          </p>
        </div>
      )}
    </div>
  );
}
