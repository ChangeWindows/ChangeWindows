import React, { useMemo } from "react";
import { Link } from '@inertiajs/react';

export default function Flight({
  platform,
  build,
  channels,
  version = null,
  url = null
}) {
  const Component = useMemo(() => (url ? Link : "div"), ["url"]);
  const mainProps = useMemo(() => ({ href: url }), ["url"]);

  return (
    <Component {...mainProps} className="subevent">
      <div className="subevent-build">{build}</div>
      <div className="subevent-tags">
        {channels.map((channel, key) => (
          <span
            key={key}
            className="badge"
            style={{ backgroundColor: channel.color }}
          >
            {channel.name}
          </span>
        ))}
      </div>
      <div className="subevent-version">
        {platform.tool ? null : version}
      </div>
    </Component>
  );
}
