import React, { useMemo } from "react";

import { Link, usePage } from "@inertiajs/react";
import Amicon from "@studio384/amaranth";
import clsx from "clsx";

export default function NavigationItem({ title, url, icon, primary, external = false }) {
  const page = usePage();

  const Component = useMemo(() => (external ? "a" : Link), ["external"]);
  const mainProps = useMemo(() => (external ? { target: "_blank" } : {}), ["external"]);

  return (
    <Component
      {...mainProps}
      href={`${url}${primary ?? ""}`}
      className={clsx("sidebar-item", { active: page.url.includes(url) })}
    >
      <Amicon icon={icon} />
      <span className="sidebar-label">{title}</span>
    </Component>
  );
}
