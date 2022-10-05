import React, { useMemo } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Status from "@/Components/Status";

import { isAfter, isBefore, parseISO } from "date-fns";
import AmaranthIcon, {
  aiEye,
  aiNotes,
  aiPen,
  aiPlus,
} from "@changewindows/amaranth";

export default function Index({ can, releases, status }) {
  const [currentReleases, legacyReleases] = useMemo(() => {
    const currentReleases = releases.filter(
      (release) => release.channels.length !== 0
    );
    const legacyReleases = releases.filter(
      (release) => release.channels.length === 0
    );

    return [currentReleases, legacyReleases];
  }, [releases]);

  return (
    <Admin>
      <NaviBar
        actions={
          <InertiaLink
            href={route("admin.releases.create")}
            className="btn btn-primary btn-sm"
          >
            <AmaranthIcon icon={aiPlus} /> New
          </InertiaLink>
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
          {currentReleases.map((release, key) => (
            <div className="col-12" key={key}>
              <div className="card release d-flex flex-row align-items-start align-items-md-center">
                <h3 className="h6 mb-0">
                  <PlatformIcon platform={release.platform} color />
                </h3>
                <div className="ms-0 row flex-grow-1 h-100">
                  <div className="col-12 col-md-7">
                    <div className="row h-100">
                      <div className="col-xl-8 col-12 d-flex flex-row align-items-center">
                        <h3 className="h6 mb-0">{release.name}</h3>
                      </div>
                      <div className="col-xl-4 col-12 d-flex flex-row align-items-center">
                        <small>Version {release.version}</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-5 release-channels d-flex flex-row justify-content-start justify-content-md-end mt-2 mt-md-0 gap-1">
                    {release.channels && release.channels.length > 0 && (
                      <div className="release-channels">
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
                    )}
                    <div className="flex-grow-1 flex-grow-md-0" />
                    <InertiaLink
                      href={route("admin.releases.edit", release)}
                      className="btn btn-link btn-sm my-n1"
                    >
                      {can.edit_releases ? (
                        <>
                          <AmaranthIcon icon={aiPen} /> Edit
                        </>
                      ) : (
                        <>
                          <AmaranthIcon icon={aiEye} /> Show
                        </>
                      )}
                    </InertiaLink>
                    <InertiaLink
                      href={route("admin.releases.changelog.edit", release)}
                      className="btn btn-link btn-sm my-n1"
                    >
                      <AmaranthIcon
                        icon={can.edit_releases ? aiNotes : aiEye}
                      />
                    </InertiaLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-12 titel">
            <h3 className="h6">Legacy</h3>
          </div>
          {legacyReleases.map((release, key) => (
            <div className="col-12" key={key}>
              <div className="card release d-flex flex-row align-items-start align-items-md-center">
                <h3 className="h6 mb-0">
                  <PlatformIcon platform={release.platform} color />
                </h3>
                <div className="ms-0 row flex-grow-1 h-100">
                  <div className="col-12 col-md-7">
                    <div className="row h-100">
                      <div className="col-xl-8 col-12 d-flex flex-row align-items-center">
                        <h3 className="h6 mb-0">{release.name}</h3>
                      </div>
                      <div className="col-xl-4 col-12 d-flex flex-row align-items-center">
                        <small>Version {release.version}</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-5 release-channels d-flex flex-row justify-content-start justify-content-md-end mt-2 mt-md-0 gap-1">
                    {release.channels && release.channels.length > 0 && (
                      <div className="release-channels">
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
                    )}
                    <div className="flex-grow-1 flex-grow-md-0" />
                    <InertiaLink
                      href={route("admin.releases.edit", release)}
                      className="btn btn-link btn-sm my-n1"
                    >
                      {can.edit_releases ? (
                        <>
                          <AmaranthIcon icon={aiPen} /> Edit
                        </>
                      ) : (
                        <>
                          <AmaranthIcon icon={aiEye} /> Show
                        </>
                      )}
                    </InertiaLink>
                    <InertiaLink
                      href={release.edit_changelog_url}
                      className="btn btn-link btn-sm my-n1"
                    >
                      <AmaranthIcon
                        icon={can.edit_releases ? aiNotes : aiEye}
                      />
                    </InertiaLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Admin>
  );
}
