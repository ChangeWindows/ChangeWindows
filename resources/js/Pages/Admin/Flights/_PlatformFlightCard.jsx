import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import PlatformIcon from "@/Components/Platforms/PlatformIcon";

import AmaranthIcon, { aiPen } from "@changewindows/amaranth";

export default function PlatformFlightCard({ platform }) {
  return (
    <div className="d-block">
      <div className="platform-event">
        <div className="platform-event-icon">
          <PlatformIcon platform={platform[0].platform} color />
        </div>
        <div className="platform-event-events">
          {platform.map((flight, key) => (
            <InertiaLink
              className="subevent subevent-flight"
              href={route("admin.flights.edit", flight)}
              key={key}
            >
              <div className="subevent-build">{flight.version}</div>
              <div className="subevent-tags">
                <span
                  key={key}
                  className="badge me-1"
                  style={{ background: flight.release_channel.color }}
                >
                  {flight.release_channel.name}
                </span>
              </div>
            </InertiaLink>
          ))}
        </div>
      </div>
    </div>
  );
}
