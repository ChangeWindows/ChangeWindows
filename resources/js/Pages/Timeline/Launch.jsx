import React, { useMemo } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

export default function Launch({ platform, version, url = null }) {
  const Component = useMemo(() => (url ? InertiaLink : "div"), ["url"]);
  const mainProps = useMemo(() => ({ href: url }), ["url"]);

  return (
    <Component
      {...mainProps}
      className="subevent subevent-colored"
      style={{ background: platform.color }}
    >
      <div className="subevent-build">
        Version <span className="fw-bold">{version}</span> is now flighting
      </div>
      <div className="subevent-version">{version}</div>
    </Component>
  );
}
