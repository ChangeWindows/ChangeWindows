import React from "react";
import { Link } from '@inertiajs/react';

import Amicon, { aiArrowLeft } from "@studio384/amaranth";

/* -- Utilities -- */

export default function Navigation({
  back = false,
  children,
  actions = false,
}) {
  return (
    <nav className="navbar navbar-expand-xl navbar-light sticky-top">
      <div className="container flex-nowrap">
        {!!back && (
          <Link
            href={back}
            className="btn btn-transparent btn-sm me-2 flex-shrink-0"
          >
            <Amicon icon={aiArrowLeft} />
          </Link>
        )}
        <span className="navbar-brand text-wrap">{children}</span>
        <div className="flex-grow-1" />
        <div className="flex-shrink-0 nav-actions d-flex flex-row">
          {actions}
        </div>
      </div>
    </nav>
  );
}
