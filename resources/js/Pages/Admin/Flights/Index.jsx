import React from "react";
import { Link } from '@inertiajs/react';

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import Pagination from "@/Components/Pagination";
import Status from "@/Components/Status";
import Timeline from "@/Components/Timeline/Timeline";

import AmaranthIcon, { aiPlus } from "@changewindows/amaranth";
import { parseISO } from "date-fns";
import PlatformFlightCard from "./_PlatformFlightCard";

export default function Index({ can, timeline, pagination, status }) {
  return (
    <Admin>
      <NaviBar
        actions={
          can.flights.create && (
            <Link
              href={route("admin.flights.create")}
              className="btn btn-primary btn-sm"
            >
              <AmaranthIcon icon={aiPlus} /> Add
            </Link>
          )
        }
      >
        Flights
      </NaviBar>

      <div className="container">
        <Status status={status} />
        <div className="row g-1">
          {Object.keys(timeline).map((date, key) => (
            <Timeline date={parseISO(timeline[date].date)} key={key}>
              <div className="card-grid">
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
