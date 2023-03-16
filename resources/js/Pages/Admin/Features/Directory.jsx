import React, { Fragment } from "react";
import { Link } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import Pagination from "@/Components/Pagination";
import Status from "@/Components/Status";

import AmaranthIcon, { aiFlag, aiFolder } from "@changewindows/amaranth";

import FeatureStatus from "@/Components/_FeatureStatus";
import Feature from "@/Components/Feature";

export default function Show({ can, features, pagination, status }) {
  return (
    <Admin>
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
              <Link
                className="nav-link active"
                href="/admin/features/directory"
              >
                <AmaranthIcon icon={aiFolder} />{" "}
                <span className="d-none d-sm-inline-block ms-1">Directory</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container my-2">
        <Status status={status} />
        <div className="row g-1">
          <div className="col-12 titlebar">
            <h1>Features</h1>
          </div>
          <div className="col-12 timeline">
            {features.map((feature) => (
              <Feature
                key={feature.id}
                feature={feature}
                url={route("admin.features.edit", feature)}
              />
            ))}
          </div>
          <Pagination pagination={pagination} />
        </div>
      </div>
    </Admin>
  );
}
