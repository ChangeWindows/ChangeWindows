import React, { useMemo } from 'react';

import { format, isToday, isYesterday } from 'date-fns';

export default function DateGroup({ date, children }) {
  const formatedDate = useMemo(() => {
    if (isToday(date)) {
      return 'Today';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'd MMMM yyyy');
    };
  }, [date]);

  return (
    <>
      <div className="date">
        <h3>{formatedDate}</h3>
      </div>
      <div className="platforms">
        {children}
      </div>
    </>
  );
};
