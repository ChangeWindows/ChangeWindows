import React from "react";
import { Link } from '@inertiajs/react';

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import Pagination from "@/Components/Pagination";
import Status from "@/Components/Status";

import AmaranthIcon, { aiPlus } from "@changewindows/amaranth";

export default function Show({ can, permissions, pagination, status }) {
  return (
    <Admin>
      <NaviBar
        actions={can.permissions.create &&
          <Link
            href={route("admin.permissions.create")}
            className="btn btn-primary btn-sm"
          >
            <AmaranthIcon icon={aiPlus} /> New
          </Link>
        }
      >
        Permissions
      </NaviBar>

      <div className="container">
        <Status status={status} />
        <div className="row g-1">
          {permissions.map((permission) => (
            <div className="col-6 col-xl-4 col-xxl-3" key={permission.id}>
              <Link
                href={route("admin.permissions.edit", permission)}
                className="card border-0 shadow-sm"
              >
                <div className="card-body">
                  <h3 className="h6 mb-0">{permission.name}</h3>
                </div>
              </Link>
            </div>
          ))}
          <Pagination pagination={pagination} />
        </div>
      </div>
    </Admin>
  );
}
