import React, { useMemo } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import clsx from "clsx";

export default function Flight({
  platform,
  build,
  channels,
  version = null,
  pack = null,
  url = null
}) {
  const Component = useMemo(() => (url ? InertiaLink : "div"), ["url"]);
  const mainProps = useMemo(() => ({ href: url }), ["url"]);

  return (
    <Component {...mainProps} className="subevent">
      <div className="subevent-build">{build}</div>
      <div className="subevent-tags">
        {channels.map((channel, key) => (
          <span
            key={key}
            className="badge me-1"
            style={{ backgroundColor: channel.color }}
          >
            {channel.name}
          </span>
        ))}
      </div>
      <div className="subevent-version">
        {platform.tool ? null : version ?? pack}
      </div>
    </Component>
  );
}
