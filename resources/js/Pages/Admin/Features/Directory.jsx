import React, { Fragment } from "react";
import { Link } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import Pagination from "@/Components/Pagination";
import Status from "@/Components/Status";

import AmaranthIcon, {
  aiClockRotateLeft,
  aiFlag,
  aiFolder,
} from "@changewindows/amaranth";

import FeatureStatus from "@/Components/_FeatureStatus";

export default function Show({ can, features, pagination, status }) {
  return (
    <Admin>
      <NaviBar>
        <nav className="navbar navbar-expand navbar-light sticky-top">
          <div className="container">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" href="/admin/features">
                  <AmaranthIcon icon={aiFlag} />{" "}
                  <span className="d-none d-sm-inline-block ms-1">Manage</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" href="/admin/features/directory">
                  <AmaranthIcon icon={aiFolder} />{" "}
                  <span className="d-none d-sm-inline-block ms-1">Directory</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </NaviBar>

      <div className="container my-2">
        <Status status={status} />
        <div className="row g-1">
          <h4>Features</h4>
          {features.map((feature) => (
            <Fragment key={feature.id}>
              <div className="px-3 py-2 bg-dark rounded-2 d-flex flex-row align-items-center">
                <div className="text-muted font-monospace me-2">
                  {feature.latest.featureId}
                </div>
                <div>{feature.featureName}</div>
                <div className="flex-grow-1" />
                <FeatureStatus featureStatus={feature.latest} />
              </div>
            </Fragment>
          ))}
          <Pagination pagination={pagination} />
        </div>
      </div>
    </Admin>
  );
}
