import React from "react";
import { Link } from '@inertiajs/react';

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Status from "@/Components/Status";

import AmaranthIcon, { aiPlus } from "@changewindows/amaranth";

export default function Index({ can, platforms, status }) {
  return (
    <Admin>
      <NaviBar
        actions={can.platforms.create &&
          <Link
            href={route("admin.platforms.create")}
            className="btn btn-primary btn-sm"
          >
            <AmaranthIcon icon={aiPlus} /> New
          </Link>
        }
      >
        Platforms
      </NaviBar>

      <div className="container">
        <Status status={status} />
        <div className="row g-1">
          {platforms.map((platform) => {
            const platformStatus = [];

            platform.active && platformStatus.push("Active");
            platform.legacy && platformStatus.push("Legacy");

            return (
              <div className="col-6 col-xl-4 col-xxl-3" key={platform.id}>
                <Link
                  href={route('admin.platforms.edit', platform)}
                  className="card border-0 shadow-sm"
                >
                  <div className="card-body">
                    <div className="d-flex flex-row">
                      <h3 className="h6 mb-0">
                        <PlatformIcon platform={platform} color />
                      </h3>
                      <div className="ms-2">
                        <h3 className="h6 mb-0">{platform.name}</h3>
                        <p className="text-muted mb-0 mt-n1">
                          <small>{platformStatus.join(", ")}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Admin>
  );
}
