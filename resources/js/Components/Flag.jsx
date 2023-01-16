import React, { useMemo } from "react";
import { Link } from '@inertiajs/react';

import FlagStatus from "./_FlagStatus";

import AmaranthIcon, { aiAngleRight } from "@changewindows/amaranth";

export default function Flag({ flag, url = null, hideBuild = false }) {
  const Component = useMemo(() => (url ? Link : "div"), ["url"]);
  const mainProps = useMemo(() => ({ href: url }), ["url"]);

  return (
    <Component
      {...mainProps}
      className="flag"
    >
      <div className="flag-name">{flag.flag?.feature_name}</div>
      {flag.feature_id !== null && (
        <div className="flag-id text-muted font-monospace">{flag.feature_id}</div>
      )}
      <div className="flag-status">
        {flag.previousStatus ? (
          <>
            {flag.previousStatus.status === flag.status ? (
              <>
                <div className="text-sm fw-bold d-inline-block lh-1 bg-purple text-dark rounded me-2">
                  <span className="d-inline-block px-2 py-1 h-100">
                    ID<span className="d-none d-lg-inline"> changed</span>
                  </span>
                </div>
                <FlagStatus hideBuild={hideBuild} flagStatus={flag} />
              </>
            ) : (
              <>
                <FlagStatus hideBuild={hideBuild} flagStatus={flag.previousStatus} />
                <AmaranthIcon icon={aiAngleRight} />
                <FlagStatus hideBuild={hideBuild} flagStatus={flag} />
              </>
            )}
          </>
        ) : (
          <FlagStatus hideBuild={hideBuild} flagStatus={flag} />
        )}
      </div>
    </Component>
  );
}
