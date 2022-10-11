import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import clsx from "clsx";

export default function NavItem({ children, url, active }) {
  return (
    <li className="nav-item">
      <InertiaLink className={clsx("nav-link", { active: active })} href={url}>
        {children}
      </InertiaLink>
    </li>
  );
}
