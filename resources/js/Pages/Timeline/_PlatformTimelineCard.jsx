import React from "react";

import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Flight from "./Flight";
import Promotion from "./Promotion";
import Launch from "./Launch";

export default function PlatformTimelineCard({ platform }) {
  return (
    <div className="platform-event">
      <div className="platform-event-icon">
        <PlatformIcon platform={platform[0].platform} color />
      </div>
      <div className="platform-event-events">
        {platform.map((flight, _key) => {
          if (flight.type === "flight") {
            return (
              <Flight
                key={`${flight.type}-${flight.id}`}
                platform={flight.platform}
                build={flight.flight}
                channels={flight.release_channel}
                version={flight.release.version}
                pack={flight.release.package}
                url={route(flight.release.package ? 'front.platforms.packages' : 'front.platforms.releases', { release: flight.release, platform: flight.platform })}
              />
            );
          }

          if (flight.type === "promotion") {
            return (
              <Promotion
                key={`${flight.type}-${flight.id}`}
                platform={flight.platform}
                channel={flight.release_channel}
                version={flight.release.version}
                url={route(flight.release.package ? 'front.platforms.packages' : 'front.platforms.releases', { release: flight.release, platform: flight.platform })}
              />
            );
          }

          if (flight.type === "launch") {
            return (
              <Launch
                key={`${flight.type}-${flight.id}`}
                platform={flight.platform}
                version={flight.release.version}
                url={route(flight.release.package ? 'front.platforms.packages' : 'front.platforms.releases', { release: flight.release, platform: flight.platform })}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
