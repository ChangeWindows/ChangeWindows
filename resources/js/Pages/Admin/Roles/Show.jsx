import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";

import AmaranthIcon, { aiCheck, aiPlus } from "@changewindows/amaranth";

export default function Show({ roles, createUrl, status = null }) {
  return (
    <Admin>
      <NaviBar
        actions={
          <InertiaLink href={route('admin.roles.create')} className="btn btn-primary btn-sm">
            <AmaranthIcon icon={aiPlus} /> New
          </InertiaLink>
        }
      >
        Roles
      </NaviBar>

      <div className="container">
        {status && (
          <div className="alert alert-success">
            <AmaranthIcon icon={aiCheck} /> {status}
          </div>
        )}
        <div className="row g-1">
          {roles.map((role) => (
            <div className="col-6 col-xl-4 col-xxl-3" key={role.id}>
              <InertiaLink
                href={route('admin.roles.edit', role)}
                className="card border-0 shadow-sm"
              >
                <div className="card-body">
                  <h3 className="h6 mb-0">{role.name}</h3>
                </div>
              </InertiaLink>
            </div>
          ))}
        </div>
      </div>
    </Admin>
  );
}
