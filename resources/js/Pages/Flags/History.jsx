import React from "react";
import { InertiaHead, InertiaLink } from "@inertiajs/inertia-react";

import App from "../../Layouts/App";
import Pagination from "../../Components/Pagination";

import Flag from "../../Components/Flag";
import FlagTimeline from "../../Components/_FlagsTimeline";

import AmaranthIcon, {
  aiCircleInfo,
  aiClockRotateLeft,
  aiStar,
  aiTrashCan,
} from "@changewindows/amaranth";

export default function History({ flagStatus, pagination }) {
  return (
    <App>
      <InertiaHead title="Flags" />
      <nav className="navbar navbar-expand navbar-light sticky-top">
        <div className="container">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <InertiaLink className="nav-link" href="/flags">
                <AmaranthIcon icon={aiStar} /> Current
              </InertiaLink>
            </li>
            <li className="nav-item">
              <InertiaLink className="nav-link active" href="/flags/history">
                <AmaranthIcon icon={aiClockRotateLeft} /> History
              </InertiaLink>
            </li>
            <li className="nav-item">
              <InertiaLink className="nav-link" href="/flags/removed">
                <AmaranthIcon icon={aiTrashCan} /> Removed
              </InertiaLink>
            </li>
          </ul>
          <ul className="navbar-nav d-flex">
            <li className="nav-item">
              <InertiaLink className="nav-link" href="/flags/about">
                <AmaranthIcon icon={aiCircleInfo} /> <span className="d-none d-md-inline-block ms-1">About</span>
              </InertiaLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <div className="row g-1">
          <div className="col-12 titlebar">
            <h1>Flags</h1>
          </div>
          {flagStatus.map((build) => (
            <FlagTimeline title={build.build} key={build.build}>
              {build.changes.map((flag) => (
                <Flag
                  flag={flag}
                  key={flag.id}
                  url={route("front.flags.show", flag.flag)}
                />
              ))}
            </FlagTimeline>
          ))}
          <Pagination pagination={pagination} />
        </div>
      </div>
    </App>
  );
}
