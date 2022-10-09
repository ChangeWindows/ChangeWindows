import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import Pagination from "@/Components/Pagination";
import Status from "@/Components/Status";
import Timeline from "@/Components/Timeline/Timeline";

import AmaranthIcon, { aiPlus } from "@changewindows/amaranth";
import { parseISO } from "date-fns";
import PlatformFlightCard from "./_PlatformFlightCard";

export default function Show({ timeline, pagination, status }) {
  return (
    <Admin>
      <NaviBar
        actions={
          <>
            <InertiaLink
              href={route("admin.flights.create")}
              className="btn btn-primary btn-sm"
            >
              <AmaranthIcon icon={aiPlus} /> Flight
            </InertiaLink>
            <InertiaLink
              href={route("admin.flights.createPackage")}
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
        <Status status={status} />
        <div className="row g-1">
          {Object.keys(timeline).map((date, key) => (
            <Timeline date={parseISO(timeline[date].date)} key={key}>
              <div
                className="card-grid"
              >
                {timeline[date].flights.map((platform, _key) => (
                  <PlatformFlightCard platform={platform} />
                ))}
              </div>
            </Timeline>
          ))}
          <Pagination pagination={pagination} />
        </div>
      </div>
    </Admin>
  );
}
