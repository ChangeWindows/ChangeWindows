import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import Status from "@/Components/Status";

export default function Index({ users, status }) {
  return (
    <Admin>
      <NaviBar>Users</NaviBar>

      <div className="container">
        <Status status={status} />
        <div className="row g-1">
          {users.map((user) => (
            <div className="col-12 col-sm-6 col-xl-4 col-xxl-3" key={user.id}>
              <InertiaLink
                href={route("admin.users.edit", user)}
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
