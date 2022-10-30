import React, { useMemo } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

export default function Promotion({
  version,
  channel,
  url
}) {
  const Component = useMemo(() => (url ? InertiaLink : "div"), ["url"]);
  const mainProps = useMemo(() => ({ href: url }), ["url"]);

  return (
    <Component {...mainProps} className="subevent">
      <div className="subevent-build">
        Version <span className="fw-bold">{version}</span>
      </div>
      <div className="subevent-tags">
        <span className="badge me-1" style={{ backgroundColor: channel.color }}>
          {channel.name}
        </span>
      </div>
      <div className="subevent-version">{version ?? component}</div>
    </Component>
  );
}
