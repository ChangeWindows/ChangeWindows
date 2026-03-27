import React from "react";

import NaviBar from "@/Components/NaviBar";
import Status from "@/Components/Status";
import Admin from "@/Layouts/Admin";

import { Link } from "@inertiajs/react";
import Amicon, { aiPlus } from "@studio384/amaranth";

export default function Show({ can, roles, status }) {
  return (
    <Admin>
      <NaviBar
        actions={
          can.roles.create && (
            <Link href={route("admin.roles.create")} className="btn btn-primary btn-sm">
              <Amicon icon={aiPlus} /> New
            </Link>
          )
        }
      >
        Roles
      </NaviBar>

      <div className="container">
        <Status status={status} />
        <div className="row g-1">
          {roles.map((role) => (
            <div className="col-xl-4 col-xxl-3 col-6" key={role.id}>
              <Link href={route("admin.roles.edit", role)} className="card border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="h6 mb-0">{role.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Admin>
  );
}
