import React from "react";

import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Flight from "./Flight";

export default function PlatformTimelineCard({ platform }) {
  return (
    <div className="platform-event">
      <div className="platform-event-icon">
        <PlatformIcon platform={platform[0].platform} color />
      </div>
      <div className="platform-event-events">
        {platform.map((flight, _key) => (
          <Flight
            key={`${flight.type}-${flight.id}`}
            platform={flight.platform}
            build={flight.flight}
            channels={flight.release_channel}
            version={flight.release.version}
            url={route("front.platforms.releases", {
              release: flight.release,
              platform: flight.platform,
            })}
          />
        ))}
      </div>
    </div>
  );
}
