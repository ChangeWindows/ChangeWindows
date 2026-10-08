import React, { useMemo } from "react";

import clsx from "clsx";
import { format, isToday, isYesterday } from "date-fns";

export default function Timeline({ date, children, className }) {
  const formatedDate = useMemo(() => {
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, "d MMMM yyyy");
    }
  }, [date]);

  return (
    <>
      <div className="titel col-12">
        <h3 className="h6 text-primary">{formatedDate}</h3>
      </div>
      <div className={clsx("timeline", className, { "col-12": !className })}>{children}</div>
    </>
  );
}
