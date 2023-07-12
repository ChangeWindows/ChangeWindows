import React from "react";
import { Head, Link } from "@inertiajs/react";

import App from "@/Layouts/App";
import Pagination from "@/Components/Pagination";

import AmaranthIcon, {
  aiBarsStaggered,
  aiCircleInfo,
  aiFolder,
  aiStar,
  aiTrashCan,
} from "@changewindows/amaranth";
import Feature from "@/Components/Feature";

export default function Index({ features, pagination }) {
  return (
    <App>
      <Head title="Features" />
      <nav className="navbar navbar-expand navbar-light sticky-top">
        <div className="container">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/features/active">
                <AmaranthIcon icon={aiStar} />{" "}
                <span className="d-none d-sm-inline-block ms-1">Current</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" href="/features">
                <AmaranthIcon icon={aiFolder} />{" "}
                <span className="d-none d-sm-inline-block ms-1">Directory</span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav d-flex">
            <li className="nav-item">
              <Link className="nav-link" href="/features/about">
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
            <h1>Features</h1>
          </div>
          <div className="col-12 timeline">
            {features.map((feature) => (
              <Feature
                key={feature.id}
                feature={feature}
                url={route("front.features.show", feature)}
              />
            ))}
          </div>
          <Pagination pagination={pagination} />
        </div>
      </div>
    </App>
  );
}
