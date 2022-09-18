import React, { useMemo } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import clsx from "clsx";
import FlagStatus from "./_FlagStatus";

import AmaranthIcon, { aiAngleRight } from "@changewindows/amaranth";

export default function Flag({ flag, url = null }) {
  const Component = useMemo(() => (url ? InertiaLink : "div"), ["url"]);
  const mainProps = useMemo(() => ({ href: url }), ["url"]);

  return (
    <Component {...mainProps} className={clsx("event px-2")}>
      <div className="revision">{flag.flag?.feature_name}</div>
      {flag.feature_id !== null && (
        <div className="text-muted font-monospace">{flag.feature_id}</div>
      )}
      <div className="flex-grow-1" />
      {flag.previousStatus ? (
        <>
          {flag.previousStatus.status === flag.status ? (
            <>
              <div className="text-sm fw-bold d-inline-block lh-1 bg-purple text-dark rounded me-2">
                <span className="d-inline-block px-2 py-1 h-100">
                  ID changed
                </span>
              </div>
              <FlagStatus flagStatus={flag} />
            </>
          ) : (
            <>
              <FlagStatus flagStatus={flag.previousStatus} />
              <AmaranthIcon icon={aiAngleRight} />
              <FlagStatus flagStatus={flag} />
            </>
          )}
        </>
      ) : (
        <FlagStatus flagStatus={flag} />
      )}
    </Component>
  );
}
