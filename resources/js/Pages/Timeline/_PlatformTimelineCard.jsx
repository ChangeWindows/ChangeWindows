import React from "react";

import PlatformIcon from "@/Components/Platforms/PlatformIcon";

import Flight from "./Flight";

export default function PlatformTimelineCard({ platform }) {
  return (
    <div className="col-span-full grid grid-cols-subgrid rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="flex size-10 items-center justify-center">
        <PlatformIcon platform={platform[0].platform} color />
      </div>
      <div className="grid grid-cols-subgrid gap-x-4 divide-y divide-zinc-200 col-span-3">
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
