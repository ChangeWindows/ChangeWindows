import React, { useMemo } from "react";

import { Link } from "@inertiajs/react";
import Amicon, { aiAngleRight } from "@studio384/amaranth";

import FlagStatus from "./_FlagStatus";

export default function Flag({ flag, url = null, hideBuild = false }) {
  const Component = useMemo(() => (url ? Link : "div"), [url]);
  const mainProps = useMemo(() => ({ href: url }), [url]);

  return (
    <Component {...mainProps} className="flag">
      <div className="flag-name">{flag.flag?.feature_name}</div>
      {flag.feature_id !== null && <div className="flag-id text-muted font-monospace">{flag.feature_id}</div>}
      <div className="flag-status">
        {flag.previousStatus ? (
          <>
            {flag.previousStatus.status === flag.status ? (
              <>
                <div className="fw-bold d-inline-block lh-1 bg-purple text-dark me-2 rounded text-sm">
                  <span className="d-inline-block h-100 px-2 py-1">
                    ID<span className="d-none d-lg-inline"> changed</span>
                  </span>
                </div>
                <FlagStatus hideBuild={hideBuild} flagStatus={flag} />
              </>
            ) : (
              <>
                <FlagStatus hideBuild={hideBuild} flagStatus={flag.previousStatus} />
                <Amicon icon={aiAngleRight} />
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
