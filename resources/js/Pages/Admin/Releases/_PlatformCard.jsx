import React from "react";
import { Link } from '@inertiajs/react';

import PlatformIcon from "@/Components/Platforms/PlatformIcon";

import AmaranthIcon, { aiEye, aiNotes, aiPen } from "@studio384/amaranth";

export default function PlatformCard({ can, platform }) {
  return (
    <div className="platform-event">
      <div className="platform-event-icon">
        <PlatformIcon platform={platform.platform} color />
      </div>
      <div className="platform-event-events">
        {platform.releases.map((release, key) => (
          <div className="subevent subevent-extended" key={key}>
            <div className="subevent-build">{release.name}</div>
            <div className="subevent-tags">
              {release.channels.map((channel, _key) => (
                <span
                  key={_key}
                  className="badge me-1"
                  style={{ background: channel.color }}
                >
                  {channel.short_name}
                </span>
              ))}
            </div>
            <div className="subevent-version">{release.version}</div>

            <div className="subevent-actions">
              <Link
                href={route("admin.releases.edit", release)}
                className="btn btn-link btn-sm my-n1"
              >
                {can.releases.edit ? (
                  <>
                    <AmaranthIcon icon={aiPen} /> Edit
                  </>
                ) : (
                  <>
                    <AmaranthIcon icon={aiEye} /> View
                  </>
                )}
              </Link>
              <Link
                href={route("admin.releases.changelog.edit", release)}
                className="btn btn-link btn-sm my-n1"
              >
                <AmaranthIcon icon={aiNotes} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
