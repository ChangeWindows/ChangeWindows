import React, { useMemo } from "react";
import { Link } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import Status from "@/Components/Status";

import AmaranthIcon, { aiPlus } from "@studio384/amaranth";
import PlatformCard from "./_PlatformCard";

export default function Index({ can, releases, status }) {
  const now = new Date().getTime();

  const _releases = useMemo(() => {
    let acc = {};

    Object.keys(releases).map((platform) => {
      releases[platform].releases.map((_release) => {
        const previewStart = new Date(_release.start_preview).getTime();
        const publicStart = new Date(_release.start_public).getTime();
        const extendedStart = new Date(_release.start_extended).getTime();
        const ltsStart = new Date(_release.start_lts).getTime();
        const ltsEnd = new Date(_release.end_lts).getTime();

        if (previewStart < now && (publicStart > now || !publicStart && _release.ongoing)) {
          if (!acc?.dev) {
            acc.dev = {};
          }

          if (!acc.dev?.[platform]) {
            acc.dev[platform] = {
              releases: [],
              platform: releases[platform].platform
            };
          }

          acc.dev[platform].releases.push(_release);
        } else if (publicStart < now && (ltsStart > now || !ltsStart && _release.ongoing || extendedStart > now || !extendedStart && _release.ongoing)) {
          if (!acc?.public) {
            acc.public = {};
          }

          if (!acc.public?.[platform]) {
            acc.public[platform] = {
              releases: [],
              platform: releases[platform].platform
            };
          }

          acc.public[platform].releases.push(_release);
        } else if (ltsStart < now && (ltsEnd > now || !ltsEnd && _release.ongoing)) {
          if (!acc?.lts) {
            acc.lts = {};
          }

          if (!acc.lts?.[platform]) {
            acc.lts[platform] = {
              releases: [],
              platform: releases[platform].platform
            };
          }

          acc.lts[platform].releases.push(_release);
        } else {
          if (!acc?.legacy) {
            acc.legacy = {};
          }

          if (!acc.legacy?.[platform]) {
            acc.legacy[platform] = {
              releases: [],
              platform: releases[platform].platform
            };
          }

          acc.legacy[platform].releases.push(_release);
        }
      });
    });

    return acc;
  }, []);

  return (
    <Admin>
      <NaviBar
        actions={
          can.releases.create && (
            <Link
              href={route("admin.releases.create")}
              className="btn btn-primary btn-sm"
            >
              <AmaranthIcon icon={aiPlus} /> New
            </Link>
          )
        }
      >
        Releases
      </NaviBar>

      <div className="container">
        <Status status={status} />
        <div className="row g-1">
          <div className="col-12 titel">
            <h3 className="h6">Active development</h3>
          </div>
          <div className="col-12 timeline">
            {Object.keys(_releases.dev).map((platform) => (
              <PlatformCard
                key={platform}
                can={can}
                platform={_releases.dev[platform]}
              />
            ))}
          </div>
          <div className="col-12 titel">
            <h3 className="h6">Public</h3>
          </div>
          <div className="col-12 timeline">
            {Object.keys(_releases.public).map((platform) => (
              <PlatformCard
                key={platform}
                can={can}
                platform={_releases.public[platform]}
              />
            ))}
          </div>
          <div className="col-12 titel">
            <h3 className="h6">LTS</h3>
          </div>
          <div className="col-12 timeline">
            {Object.keys(_releases.lts).map((platform) => (
              <PlatformCard
                key={platform}
                can={can}
                platform={_releases.lts[platform]}
              />
            ))}
          </div>
          <div className="col-12 titel">
            <h3 className="h6">Legacy</h3>
          </div>
          <div className="col-12 timeline">
            {Object.keys(_releases.legacy).map((platform) => (
              <PlatformCard
                key={platform}
                can={can}
                platform={_releases.legacy[platform]}
              />
            ))}
          </div>
        </div>
      </div>
    </Admin>
  );
}
