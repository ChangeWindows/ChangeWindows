import React, { useMemo } from "react";
import { Link } from '@inertiajs/react';

import clsx from "clsx";
import { format, isToday, isYesterday, parseISO, isValid } from "date-fns";

export default function Channel({
  date,
  build,
  channel,
  disabled = false,
  url = null,
}) {
  const Component = useMemo(() => (url ? Link : "div"), ["url"]);
  const mainProps = useMemo(() => ({ href: url }), ["url"]);

  const formatedDate = useMemo(() => {
    if (isValid(date)) {
      if (isToday(date)) {
        return "Today";
      } else if (isYesterday(date)) {
        return "Yesterday";
      } else {
        return format(date, "d MMMM yyyy");
      }
    }

    return "No flight";
  }, [date]);

  return (
    <div className="col">
      <Component
        {...mainProps}
        className={clsx("channel", "card", { "channel-disabled": disabled })}
      >
        <div className="channel-name" style={{ color: channel.color }}>
          {channel.name}
        </div>
        <div className="channel-build">{build || "No flight"}</div>
        <div className="flex-grow-1" />
        <div className="channel-date">{formatedDate || "No date"}</div>
      </Component>
    </div>
  );
}
