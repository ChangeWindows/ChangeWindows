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
      <h3 className="font-display mt-4 mb-1 text-base font-semibold text-blue-600 col-span-full">{formatedDate}</h3>
      <div className="gap-y-1 col-span-full grid grid-cols-subgrid">{children}</div>
    </>
  );
}
