import React, { Fragment } from "react";

import Channel from "@/Components/Cards/Channel";
import Pagination from "@/Components/Pagination";
import PlatformNavigation from "@/Components/PlatformNavigation";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Timeline from "@/Components/Timeline/Timeline";
import App from "@/Layouts/App";

import { Head } from "@inertiajs/react";
import { parseISO } from "date-fns";

import PlatformTimelineCard from "./_PlatformTimelineCard";

export default function Show({ timeline, pagination, platform, platforms, channel_platforms }) {
  return (
    <App>
      <Head title={`${platform.name} timeline`} />

      <PlatformNavigation all="front.timeline" page="Timeline" routeName="front.timeline.show" platforms={platforms} />

      <div className="container">
        <div className="row g-1">
          <div className="titlebar col-12">
            <h1 style={{ color: platform.color }}>
              <PlatformIcon platform={platform} color className="me-2" /> {platform.name}
            </h1>
          </div>
          <div className="col">
            <div className="row g-3">
              <div className="col-md-8 col-lg-7 col-12">
                <div className="row g-1">
                  {Object.keys(timeline).map((date, key) => (
                    <Timeline date={parseISO(timeline[date].date)} key={key}>
                      {timeline[date].flights.map((_platform, _key) => (
                        <PlatformTimelineCard platform={_platform} />
                      ))}
                    </Timeline>
                  ))}
                  <Pagination pagination={pagination} />
                </div>
              </div>
              <div className="d-none d-md-block col-md-4 col-lg-5">
                <div className="row g-1">
                  {channel_platforms.map((platform, key) => (
                    <Fragment key={key}>
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
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </App>
  );
}
