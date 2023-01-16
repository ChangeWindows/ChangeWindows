import React from "react";
import { Link } from '@inertiajs/react';

import clsx from "clsx";

export default function NavItem({ children, url, active }) {
  return (
    <li className="nav-item">
      <Link className={clsx("nav-link", { active: active })} href={url}>
        {children}
      </Link>
    </li>
  );
}
