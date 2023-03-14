import React, { Fragment } from "react";
import { Link } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import Pagination from "@/Components/Pagination";
import Status from "@/Components/Status";

import AmaranthIcon, { aiFlag, aiFolder } from "@changewindows/amaranth";

import FeatureStatus from "@/Components/_FeatureStatus";

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
          <h4>Features</h4>
          {features.map((feature) => (
            <Fragment key={feature.id}>
              <a href={route('admin.features.edit', feature)} className="px-3 py-2 bg-dark rounded-2 d-flex flex-row align-items-center text-decoration-none">
                <div style={{ color: 'inherit' }}>{feature.featureName}</div>
                <div className="text-muted font-monospace ms-2">
                  {feature.latest.featureId}
                </div>
                <div className="flex-grow-1" />
                <FeatureStatus featureStatus={feature.latest} />
              </a>
            </Fragment>
          ))}
          <Pagination pagination={pagination} />
        </div>
      </div>
    </Admin>
  );
}
