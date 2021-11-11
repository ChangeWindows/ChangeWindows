import React, { useMemo } from 'react';

import { format, isToday, isYesterday } from 'date-fns';

export default function Timeline({ date, children }) {
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
            <div className="col-12 titel">
                <h3 className="h6 text-primary">{formatedDate}</h3>
            </div>
            <div className="col-12 timeline">
                {children}
            </div>
        </>
    );
};