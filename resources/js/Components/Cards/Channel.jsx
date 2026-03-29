import { useMemo } from "react";

import { Link } from "@inertiajs/react";
import clsx from "clsx";
import { format, isToday, isYesterday, isValid } from "date-fns";

export default function Channel({ date, build, channel, disabled = false, url = null, classNames }) {
  const Component = useMemo(() => (url ? Link : "div"), [url]);
  const mainProps = useMemo(() => ({ href: url }), [url]);

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
    <Component
      {...mainProps}
      className={clsx(
        "flex flex-col bg-white p-2 transition hover:bg-zinc-50 hover:shadow-md rounded-lg shadow-sm border border-zinc-200",
        { "channel-disabled": disabled },
        classNames,
      )}
    >
      <span className="text-base/4 font-semibold" style={{ color: channel.color }}>
        {channel.name}
      </span>
      <span className="font-semibold tabular-nums">{build || "No flight"}</span>
      <span className="mt-3 text-xs text-zinc-600">{formatedDate || "No date"}</span>
    </Component>
  );
}
