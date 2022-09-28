import React, { Fragment } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import Pagination from "@/Components/Pagination";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";

import AmaranthIcon, { aiCheck, aiPlus } from "@changewindows/amaranth";
import { format, parseISO } from "date-fns";

export default function Show({
  timeline,
  pagination,
  createUrl,
  createPackageUrl,
  status = null,
}) {
  return (
    <Admin>
      <NaviBar
        actions={
          <>
            <InertiaLink href={createUrl} className="btn btn-primary btn-sm">
              <AmaranthIcon icon={aiPlus} /> Flight
            </InertiaLink>
            <InertiaLink
              href={createPackageUrl}
              className="btn btn-primary btn-sm ms-1"
            >
              <AmaranthIcon icon={aiPlus} /> Package
            </InertiaLink>
          </>
        }
      >
        Flights
      </NaviBar>

      <div className="container">
        {status && (
          <div className="alert alert-success">
            <AmaranthIcon icon={aiCheck} /> {status}
          </div>
        )}
        <div className="row g-1">
          {Object.keys(timeline).map((date) => (
            <Fragment key={date}>
              <div className="col-12 titel">
                <h3 className="h6 text-primary">
                  {format(parseISO(timeline[date].date), "d MMMM yyyy")}
                </h3>
              </div>
              {timeline[date].flights.map((flight, key) => (
                <div className="col-6 col-md-4 col-xl-3 col-xxl-2" key={key}>
                  <InertiaLink
                    href={flight.edit_url}
                    className="card border-0 shadow-sm h-100"
                  >
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex flex-row">
                        <h3 className="h6 mb-0">
                          <PlatformIcon platform={flight.platform} color />
                        </h3>
                        <div className="ms-2">
                          <h3 className="h6 mb-1">{flight.version}</h3>
                          <span
                            key={key}
                            className="badge me-1"
                            style={{ background: flight.release_channel.color }}
                          >
                            {flight.release_channel.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </InertiaLink>
                </div>
              ))}
            </Fragment>
          ))}
          <Pagination pagination={pagination} />
        </div>
      </div>
    </Admin>
  );
}
