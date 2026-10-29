import PlatformIcon from "@/Components/Platforms/PlatformIcon";

import { Link } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
export default function PlatformFlightCard({ platform }) {
  const route = useRoute();
  return (
    <div className="d-block">
      <div className="platform-event">
        <div className="platform-event-icon">
          <PlatformIcon platform={platform[0].platform} color />
        </div>
        <div className="platform-event-events">
          {platform.map((flight, key) => (
            <Link className="subevent subevent-flight" href={route("admin.flights.edit", flight)} key={key}>
              <div className="subevent-build">{flight.version}</div>
              <div className="subevent-tags">
                <span key={key} className="badge" style={{ background: flight.release_channel.color }}>
                  {flight.release_channel.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
