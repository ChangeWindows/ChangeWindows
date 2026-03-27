import React from "react";

import Channel from "@/Components/Cards/Channel";
import PlatformNavigation from "@/Components/PlatformNavigation";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import App from "@/Layouts/App";

import { Head } from "@inertiajs/react";
import clsx from "clsx";
import { parseISO } from "date-fns";

export default function Index({ platforms, channel_platforms }) {
  return (
    <App>
      <Head title="Channels" />

      <PlatformNavigation
        home
        all="front.channels"
        page="Channels"
        routeName="front.channels.show"
        platforms={platforms}
      />

      <div className="container">
        <div className="row g-1">
          <div className="titlebar col-12">
            <h1>Channels</h1>
          </div>
          {channel_platforms.map((platform, key) => (
            <div
              className={clsx({
                "col-12": platform.channels.length >= 3,
                "col-md-6 col-12": platform.channels.length <= 2,
              })}
              key={key}
            >
              <div className="row g-1">
                <div className="titel col-12">
                  <h3 className="h6" style={{ color: platform.color }}>
                    <PlatformIcon platform={platform} color />
                    <span className="fw-bold ms-2">{platform.name}</span>
                  </h3>
                </div>
                {platform.channels.map((channel, _key) => (
                  <Channel
                    key={_key}
                    channel={{ color: channel.color, name: channel.name }}
                    build={channel.flight ? channel.flight.version : ""}
                    date={channel.flight ? parseISO(channel.flight.date) : ""}
                    url={
                      channel.flight
                        ? route("front.platforms.releases", { release: channel.release, platform })
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </App>
  );
}
