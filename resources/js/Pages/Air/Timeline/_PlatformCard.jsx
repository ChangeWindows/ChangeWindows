import React from "react";

import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Flight from "./_Flight";

export default function PaltformCard({ platform }) {
  return (
    <div className="platform">
      <div className="platform-icon">
        <PlatformIcon platform={platform[0].platform} color />
      </div>
      <div className="platform-flights">
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
