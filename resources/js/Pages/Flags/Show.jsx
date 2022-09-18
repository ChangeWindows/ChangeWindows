import React from "react";
import { InertiaHead } from "@inertiajs/inertia-react";

import App from "../../Layouts/App";
import FlagStatus from "../../Components/_FlagStatus";

export default function Show({ flag }) {
  return (
    <App>
      <InertiaHead title="Flags" />

      <div className="container">
        <div className="row g-1">
          <div className="col-12 titlebar">
            <h2 className="h1 mb-1">{flag.name}</h2>
            <h3 className="h5 fw-normal mb-3">{flag.feature_name} {flag.flag_status[0].feature_id && <small className="font-monospace text-muted">{flag.flag_status[0].feature_id}</small>}</h3>
          </div>
          <div className="col-12">
            <p className="">{flag.description || <i className="text-muted">This feature flag doesn't have a description yet.</i>}</p>
          </div>
          <div className="col-12 titlebar">
            <p className="h5 fw-bold">Flag history</p>
          </div>
          <div className="col-12 timeline">
            {flag.flag_status.map((status) => (
              <div className="event px-2" key={status.id}>
                <div className="revision">{status.build}</div>
                {status.feature_id !== null && (
                  <div className="text-muted font-monospace">
                    {status.feature_id}
                  </div>
                )}
                <div className="flex-grow-1" />
                <FlagStatus flagStatus={status} hideBuild />
              </div>
            ))}
          </div>
        </div>
      </div>
    </App>
  );
}
