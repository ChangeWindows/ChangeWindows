import React from "react";
import { InertiaHead, InertiaLink } from "@inertiajs/inertia-react";

import App from "../../Layouts/App";

import AmaranthIcon, {
  aiCircleInfo,
  aiClockRotateLeft,
  aiStar,
  aiTrashCan,
} from "@changewindows/amaranth";

export default function About() {
  return (
    <App>
      <InertiaHead title="Flags" />
      <nav className="navbar navbar-expand navbar-light sticky-top">
        <div className="container">
          <ul className="navbar-nav me-auto d-flex">
            <li className="nav-item">
              <InertiaLink className="nav-link" href="/flags">
                <AmaranthIcon icon={aiStar} /> Current
              </InertiaLink>
            </li>
            <li className="nav-item">
              <InertiaLink className="nav-link" href="/flags/history">
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
            <h3 className="h5 mt-2">About sources</h3>
            <p>
              The data within ChangeWindows' Flag pages is partially sourced
              from the excellent{" "}
              <a href="https://github.com/riverar/mach2">riverar/mach2</a>
              -project by Rafael Rivera and other contributors to the project.
              Data is sourced from the <code>features</code> folder from build
              17704 and upwards, excluding build 20170. Not every build is
              covered, nor will every build be covered in the future.
            </p>
            <p>
              Editorial content (the "readable" flag names and their
              description) is provided by ChangeWindows, unless stated
              otherwise.
            </p>
            <p>
              ChangeWindows and any sources listed are not responsible for the
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
