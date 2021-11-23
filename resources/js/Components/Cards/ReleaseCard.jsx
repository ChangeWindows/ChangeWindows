import React, { useMemo } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import PlatformIcon from '../Platforms/PlatformIcon';

export default function ReleaseCard({ name, platform, channels, alts, url, pack = false }) {
  const Component = useMemo(() => (url ? InertiaLink : 'div'), ['url']);
  const mainProps = useMemo(() => ({ href: url }), ['url']);

  return (
    <div className="col-12">
      <Component {...mainProps} className="card release">
        <div className="d-flex flex-row">
          {platform && <h3 className="h6 mb-0"><PlatformIcon platform={platform} color /></h3>}
          <div className="ms-0 row flex-grow-1">
            <div className="col-12 col-md-8">
              <div className="row">
                <div className="col-xl-8 col-12">
                  <h3 className="h6 mb-0">{name}</h3>
                </div>
                <div className="col-xl-4 col-12">
                  {!pack && alts && !platform?.tool && <p className="text-muted mb-0 mt-n1"><small>{alts.join(', ')}</small></p>}
                </div>
              </div>
            </div>
            {channels && <div className="col-12 col-md-4 release-channels d-flex flex-row justify-content-start justify-content-md-end mt-2 mt-md-0 gap-1">
              {channels.map((channel, key) => (
                <span key={key} className="badge" style={{ backgroundColor: channel.color }}>
                  {channel.short_name}
                </span>
              ))}
            </div>}
          </div>
        </div>
      </Component>
    </div>
  );
};