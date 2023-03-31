import React from "react";
import { Head, Link } from "@inertiajs/react";

import App from "@/Layouts/App";
import Pagination from "@/Components/Pagination";

import FlagCurrent from "./_FlagCurrent";

import AmaranthIcon, {
  aiBarsStaggered,
  aiCircleInfo,
  aiStar,
  aiTrashCan,
} from "@changewindows/amaranth";

export default function Show({ flags, pagination }) {
  return (
    <App>
      <Head title="Flags" />
      <nav className="navbar navbar-expand navbar-light sticky-top">
        <div className="container">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/flags">
                <AmaranthIcon icon={aiBarsStaggered} />{" "}
                <span className="d-none d-sm-inline-block ms-1">Timeline</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/flags/active">
                <AmaranthIcon icon={aiStar} />{" "}
                <span className="d-none d-sm-inline-block ms-1">Active</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" href="/flags/removed">
                <AmaranthIcon icon={aiTrashCan} />{" "}
                <span className="d-none d-sm-inline-block ms-1">Removed</span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav d-flex">
            <li className="nav-item">
              <Link className="nav-link" href="/flags/about">
                <AmaranthIcon icon={aiCircleInfo} />{" "}
                <span className="d-none d-md-inline-block ms-1">About</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <div className="row g-1">
          <div className="col-12 titlebar">
            <h1>Flags</h1>
          </div>
          <div className="col-12 timeline">
            {flags.data.map((flag) => (
              <FlagCurrent
                flag={flag}
                key={flag.id}
                url={route("front.flags.show", flag)}
              />
            ))}
          </div>
          <Pagination pagination={pagination} />
        </div>
      </div>
    </App>
  );
}
