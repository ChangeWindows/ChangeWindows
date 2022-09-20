import React, { useMemo } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import clsx from "clsx";

import FlagStatus from "../../Components/_FlagStatus";

export default function FlagCurrent({ flag, url = null, hideBuild = false }) {
  const Component = useMemo(() => (url ? InertiaLink : "div"), ["url"]);
  const mainProps = useMemo(() => ({ href: url }), ["url"]);

  return (
    <Component {...mainProps} className={clsx("event px-2")}>
      <div className="revision">{flag.feature_name}</div>
      {flag.latest_status.feature_id !== null && (
        <div className="text-muted font-monospace">{flag.latest_status.feature_id}</div>
      )}
      <div className="flex-grow-1" />
      <FlagStatus flagStatus={flag.latest_status} hideBuild />
    </Component>
  );
}
