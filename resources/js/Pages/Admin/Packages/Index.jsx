import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Status from "@/Components/Status";

import AmaranthIcon, {
  aiEye,
  aiNotes,
  aiPen,
  aiPlus,
} from "@changewindows/amaranth";

export default function Index({ packages, can, status }) {
  return (
    <Admin>
      <NaviBar
        actions={can.releases.create &&
          <InertiaLink
            href={route("admin.packages.create")}
            className="btn btn-primary btn-sm"
          >
            <AmaranthIcon icon={aiPlus} /> New
          </InertiaLink>
        }
      >
        Packages
      </NaviBar>

      <div className="container">
        <Status status={status} />
        <div className="row g-1">
          {packages.map((pack, key) => (
            <div className="col-12" key={key}>
              <div className="card release d-flex flex-row align-items-start align-items-md-center">
                <h3 className="h6 mb-0">
                  <PlatformIcon platform={pack.platform} color />
                </h3>
                <div className="ms-0 row flex-grow-1 h-100">
                  <div className="col-12 col-md-7 d-flex flex-row align-items-center">
                    <h3 className="h6 mb-0">{pack.name}</h3>
                  </div>
                  <div className="col-12 col-md-5 release-channels d-flex flex-row justify-content-start justify-content-md-end mt-2 mt-md-0 gap-1">
                    {pack.channels && pack.channels.length > 0 && (
                      <div className="release-channels">
                        {pack.channels.map((channel, _key) => (
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
                      href={route("admin.packages.edit", pack)}
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
                    </InertiaLink>
                    <InertiaLink
                      href={route("admin.packages.changelog.edit", pack)}
                      className="btn btn-link btn-sm my-n1"
                    >
                      <AmaranthIcon
                        icon={aiNotes}
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
