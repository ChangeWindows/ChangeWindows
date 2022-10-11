import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import clsx from "clsx";

export default function DropdownItem({ children, url, active }) {
  return (
    <li>
      <InertiaLink
        className={clsx("dropdown-item", { active: active })}
        href={url}
      >
        {children}
      </InertiaLink>
    </li>
  );
}
