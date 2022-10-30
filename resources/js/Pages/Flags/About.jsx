import React from "react";
import { InertiaHead, InertiaLink } from "@inertiajs/inertia-react";

import App from "@/Layouts/App";

import AmaranthIcon, {
  aiCircleInfo,
  aiClockRotateLeft,
  aiStar,
  aiTrashCan,
} from "@changewindows/amaranth";
import FlagStatus from "@/Components/_FlagStatus";

export default function About() {
  return (
    <App>
      <InertiaHead title="Flags" />
      <nav className="navbar navbar-expand navbar-light sticky-top">
        <div className="container">
          <ul className="navbar-nav me-auto d-flex">
            <li className="nav-item">
              <InertiaLink className="nav-link" href="/flags">
                <AmaranthIcon icon={aiStar} />{" "}
                <span className="d-none d-sm-inline-block ms-1">Current</span>
              </InertiaLink>
            </li>
            <li className="nav-item">
              <InertiaLink className="nav-link" href="/flags/history">
                <AmaranthIcon icon={aiClockRotateLeft} />{" "}
                <span className="d-none d-sm-inline-block ms-1">History</span>
              </InertiaLink>
            </li>
            <li className="nav-item">
              <InertiaLink className="nav-link" href="/flags/removed">
                <AmaranthIcon icon={aiTrashCan} />{" "}
                <span className="d-none d-sm-inline-block ms-1">Removed</span>
              </InertiaLink>
            </li>
          </ul>
          <ul className="navbar-nav d-flex">
            <li className="nav-item">
              <InertiaLink className="nav-link active" href="/flags/about">
                <AmaranthIcon icon={aiCircleInfo} />{" "}
                <span className="d-none d-md-inline-block ms-1">About</span>
              </InertiaLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <div className="row g-1">
          <div className="col-12 titlebar">
            <h2 className="h1">About Flags</h2>
          </div>
          <div className="col-12">
            <h3 className="h5 mt-2">About the Windows Feature Store data</h3>
            <p>
              This data is extracted through the Mach2 tool form the Windows
              Feature Store. In the most simple of terms; the Windows Feature
              Store decides which functionality users can and cannot use. While
              data can be collected from the Windows Feature Store, it isn't
              always accurate. For example: when a feature is marked as
              "Unknown" it usually means that the state of this feature isn't
              guaranteed to be correct.
            </p>
            <table className="table">
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <FlagStatus
                      flagStatus={{ status: "unknown", build: 22621 }}
                    />
                  </td>
                  <td>The status of this entry is unknown.</td>
                </tr>
                <tr>
                  <td>
                    <FlagStatus
                      flagStatus={{ status: "always-enabled", build: 22621 }}
                    />
                  </td>
                  <td>This entry is always enabled regardless of its state.</td>
                </tr>
                <tr>
                  <td>
                    <FlagStatus
                      flagStatus={{
                        status: "enabled-by-default",
                        build: 22621,
                      }}
                    />
                  </td>
                  <td>
                    This entry is enabled but can be set to another state.
                  </td>
                </tr>
                <tr>
                  <td>
                    <FlagStatus
                      flagStatus={{
                        status: "disabled-by-default",
                        build: 22621,
                      }}
                    />
                  </td>
                  <td>
                    This entry is disabled but can be set to another state.
                  </td>
                </tr>
                <tr>
                  <td>
                    <FlagStatus
                      flagStatus={{ status: "always-disabled", build: 22621 }}
                    />
                  </td>
                  <td>
                    This entry is always disabled regardless of its state.
                  </td>
                </tr>
                <tr>
                  <td>
                    <FlagStatus
                      flagStatus={{ status: "removed", build: 22621 }}
                    />
                  </td>
                  <td>This entry has been removed.</td>
                </tr>
                <tr>
                  <td>
                    <div className="text-sm fw-bold d-inline-block lh-1 bg-purple text-dark rounded me-2">
                      <span className="d-inline-block px-2 py-1 h-100">
                        ID<span className="d-none d-lg-inline"> changed</span>
                      </span>
                    </div>
                  </td>
                  <td>The feature ID for this feature was changed.</td>
                </tr>
              </tbody>
            </table>
            <p>
              Note that features can freely ignore the state you may set even if
              the status says otherwise. The Windows Feature Store is a complex
              system and the state of the various flags within it is not its
              only source of information.
            </p>
            <h3 className="h5 mt-4">Safety notice</h3>
            <p>
              The content provided here is purely to track changes in the
              Windows Feature Store as it is configured in public builds, and
              what these changes mean to end users if applicable. We strongly
              recommend against manipulating the Feature Store as it can put
              your computer in an unrecoverable state. ChangeWindows does not
              provide, nor will it link to, any tools that facilitate such
              practices.
            </p>
            <h3 className="h5 mt-4">About sources</h3>
            <p>
              The data within ChangeWindows' Flag pages is partially sourced
              from the excellent{" "}
              <a href="https://github.com/riverar/mach2">riverar/mach2</a>
              -project by Rafael Rivera and other contributors to the project
              licensed under the GPLv3 license. Data is sourced from the{" "}
              <code>features</code> folder from build 17704 and upwards when
              available and if viable. Not every build is covered, nor will
              every build be covered in the future.
            </p>
            <p>
              Editorialised content (the "readable" flag names, their
              description, etc.) is provided by ChangeWindows or has been
              submitted by contributors.
            </p>
            <p>
              ChangeWindows and any contributors are not responsible for the
              accuracy of the content and what the information provided on
              ChangeWindows.org is used for. The goal of this project is solely
              to indicate the evolution of the Windows Feature Store from one
              build to the next (for which information is available).
            </p>
          </div>
        </div>
      </div>
    </App>
  );
}
