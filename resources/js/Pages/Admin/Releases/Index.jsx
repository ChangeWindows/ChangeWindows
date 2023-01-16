import React, { useMemo } from "react";
import { Link } from '@inertiajs/react';

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import Status from "@/Components/Status";

import AmaranthIcon, { aiPlus } from "@changewindows/amaranth";
import PlatformCard from "./_PlatformCard";

export default function Index({ can, releases, status }) {
  const releasesActive = useMemo(() => {
    const _releases = JSON.parse(JSON.stringify(releases));

    Object.keys(_releases).map((platform) => {
      _releases[platform].releases = _releases[
        platform
      ].releases.filter((release) => release.channels.length !== 0);

      if (_releases[platform].releases.length === 0) {
        delete _releases[platform];
      }
    });

    return _releases;
  }, [releases]);

  const releasesInactive = useMemo(() => {
    const _releases = JSON.parse(JSON.stringify(releases));

    Object.keys(_releases).map((platform) => {
      _releases[platform].releases = _releases[
        platform
      ].releases.filter((release) => release.channels.length === 0);

      if (_releases[platform].releases.length === 0) {
        delete _releases[platform];
      }
    });

    return _releases;
  }, [releases]);

  return (
    <Admin>
      <NaviBar
        actions={can.releases.create &&
          <Link
            href={route("admin.releases.create")}
            className="btn btn-primary btn-sm"
          >
            <AmaranthIcon icon={aiPlus} /> New
          </Link>
        }
      >
        Releases
      </NaviBar>

      <div className="container">
        <Status status={status} />
        <div className="row g-1">
          <div className="col-12 titel">
            <h3 className="h6">Active</h3>
          </div>
          <div className="col-12 timeline">
            {Object.keys(releasesActive).map((platform) => (
              <PlatformCard
                key={platform}
                can={can}
                platform={releasesActive[platform]}
              />
            ))}
          </div>
          <div className="col-12 titel">
            <h3 className="h6">Legacy</h3>
          </div>
          <div className="col-12 timeline">
            {Object.keys(releasesInactive).map((platform) => (
              <PlatformCard
                key={platform}
                can={can}
                platform={releasesInactive[platform]}
              />
            ))}
          </div>
        </div>
      </div>
    </Admin>
  );
}
