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
      data-active={!!page.url.includes(url) || undefined}
      className={clsx(
        "group relative flex items-center gap-3 rounded-lg border border-transparent px-3.5 py-2.5 transition",
        // Hover
        "hover:border-zinc-200 hover:bg-white hover:shadow-md",
        // Active
        "data-active:border-zinc-200 data-active:bg-zinc-50 data-active:shadow-sm",
        "data-active:after:content[''] data-active:after:absolute data-active:after:top-[25%] data-active:after:left-0 data-active:after:h-[calc(50%)] data-active:after:w-1 data-active:after:rounded-full data-active:after:bg-blue-600",
        // Active hover
        "data-active:hover:border-zinc-200 data-active:hover:bg-white data-active:hover:shadow-md",
      )}
    >
      <Amicon icon={icon} className="group-data-active:text-blue-600" />
      <span className="text-base/5">{title}</span>
    </Component>
  );
}
