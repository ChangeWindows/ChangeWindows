import React from "react";
import { Link } from '@inertiajs/react';

import clsx from "clsx";

export default function DropdownItem({ children, url, active }) {
  return (
    <li>
      <Link
        className={clsx("dropdown-item", { active: active })}
        href={url}
      >
        {children}
      </Link>
    </li>
  );
}
