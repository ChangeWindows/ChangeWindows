import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";

import AmaranthIcon, { aiCheck } from "@changewindows/amaranth";

export default function Show({ users, status = null }) {
  return (
    <Admin>
      <NaviBar>Users</NaviBar>

      <div className="container">
        {status && (
          <div className="alert alert-success">
            <AmaranthIcon icon={aiCheck} /> {status}
          </div>
        )}
        <div className="row g-1">
          {users.map((user) => (
            <div className="col-12 col-sm-6 col-xl-4 col-xxl-3" key={user.id}>
              <InertiaLink
                href={route('admin.users.edit', user)}
                className="card border-0 shadow-sm"
              >
                <div className="card-body">
                  <h3 className="h6 mb-0">{user.name}</h3>
                  <p className="text-muted mb-0 mt-n1">
                    <small>{user.email}</small>
                  </p>
                </div>
              </InertiaLink>
            </div>
          ))}
        </div>
      </div>
    </Admin>
  );
}
