import React from "react";

import PlatformIcon from "../../Components/Platforms/PlatformIcon";
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
                version={flight.version}
                pack={flight.package}
                url={flight.url}
              />
            );
          }

          if (flight.type === "promotion") {
            return (
              <Promotion
                key={`${flight.type}-${flight.id}`}
                platform={flight.platform}
                channel={flight.release_channel}
                version={flight.version}
                url={flight.url}
              />
            );
          }

          if (flight.type === "launch") {
            return (
              <Launch
                key={`${flight.type}-${flight.id}`}
                platform={flight.platform}
                version={flight.version}
                url={flight.url}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
