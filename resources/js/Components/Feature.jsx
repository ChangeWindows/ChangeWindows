import React, { useMemo } from "react";
import { Link } from '@inertiajs/react';

import FeatureStatus from "./_FeatureStatus";

export default function Feature({ feature, url = null, hideBuild = false }) {
  const Component = useMemo(() => (url ? Link : "div"), ["url"]);
  const mainProps = useMemo(() => ({ href: url }), ["url"]);

  return (
    <Component
      {...mainProps}
      className="flag"
    >
      <div className="flag-name">{feature.featureName}</div>
      {feature.latest.featureId !== null && (
        <div className="flag-id text-muted font-monospace">{feature.latest.featureId}</div>
      )}
      <div className="flag-status">
        {feature.latest && (
          <FeatureStatus hideBuild={hideBuild} featureStatus={feature.latest} />
        )}
      </div>
    </Component>
  );
}
