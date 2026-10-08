import React from "react";

import NaviBar from "@/Components/NaviBar";
import Status from "@/Components/Status";
import Admin from "@/Layouts/Admin";

import { Link } from "@inertiajs/react";

export default function Index({ users, status }) {
  return (
    <Admin>
      <NaviBar>Users</NaviBar>

      <div className="container">
        <Status status={status} />
        <div className="row g-1">
          {users.map((user) => (
            <div className="col-sm-6 col-xl-4 col-xxl-3 col-12" key={user.id}>
              <Link href={route("admin.users.edit", user)} className="card border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="h6 mb-0">{user.name}</h3>
                  <p className="text-muted mt-n1 mb-0">
                    <small>{user.email}</small>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Admin>
  );
}
