import React from "react";

import { Link } from "@inertiajs/react";
import Amicon, { aiArrowLeft, aiArrowRight } from "@studio384/amaranth";
import clsx from "clsx";

export default function Pagination({ pagination }) {
  if (pagination.links.length <= 3) return;

  return (
    <nav aria-label="Pagination" className="sticky bottom-0 flex justify-center">
      <ul className="pagination">
        {pagination.links.map((link, key) => {
          if (link.label.includes("Previous")) {
            return (
              <li
                className={clsx("page-item d-none d-md-inline-block", { active: link.active, disabled: !link.url })}
                key={key}
              >
                {link.url ? (
                  <Link className="page-link" href={link.url}>
                    <Amicon icon={aiArrowLeft} />
                  </Link>
                ) : (
                  <span className="page-link">
                    <Amicon icon={aiArrowLeft} />
                  </span>
                )}
              </li>
            );
          } else if (link.label.includes("Next")) {
            return (
              <li
                className={clsx("page-item d-none d-md-inline-block", { active: link.active, disabled: !link.url })}
                key={key}
              >
                {link.url ? (
                  <Link className="page-link" href={link.url}>
                    <Amicon icon={aiArrowRight} />
                  </Link>
                ) : (
                  <span className="page-link">
                    <Amicon icon={aiArrowRight} />
                  </span>
                )}
              </li>
            );
          } else if (link.label === "...") {
            return (
              <li className={clsx("page-item", { active: link.active, disabled: !link.url })} key={key}>
                <div className="pagination-divider" />
              </li>
            );
          } else {
            return (
              <li className={clsx("page-item", { active: link.active, disabled: !link.url })} key={key}>
                {link.url ? (
                  <Link className="page-link" href={link.url}>
                    {link.label}
                  </Link>
                ) : (
                  <span className="page-link">{link.label}</span>
                )}
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
}
