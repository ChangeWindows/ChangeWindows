import React, { Fragment, useMemo } from "react";
import { InertiaHead } from "@inertiajs/inertia-react";

import App from "../../Layouts/App";
import Channel from "../../Components/Cards/Channel";
import Pagination from "../../Components/Pagination";
import PlatformIcon from "../../Components/Platforms/PlatformIcon";
import PlatformNavigation from "../../Components/PlatformNavigation";
import Timeline from "../../Components/Timeline/Timeline";

import PlatformTimelineCard from "./_PlatformTimelineCard";

import { parseISO } from "date-fns";
import AmaranthIcon, { aiPatreon } from "@changewindows/amaranth";

export default function Index({
  timeline,
  pagination,
  platforms,
  channel_platforms,
  patron,
}) {
  return (
    <App>
      <InertiaHead title="Timeline" />

      <PlatformNavigation
        home
        all="/timeline"
        page="Timeline"
        platforms={platforms}
      />

      <div className="container">
        <div className="row g-1">
          <div className="col-12 titlebar">
            <h1>Timeline</h1>
          </div>
          <div className="col">
            <div className="row g-3">
              <div className="col-12 col-md-8 col-lg-7">
                <div className="row g-1">
                  {Object.keys(timeline).map((date, key) => (
                    <Timeline date={parseISO(timeline[date].date)} key={key}>
                      {timeline[date].flights.map((platform, _key) => (
                        <PlatformTimelineCard platform={platform} />
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
                      {key === 2 && patron && (
                        <div className="col-12 mt-3">
                          <a
                            href="https://www.patreon.com/changewindows"
                            className="settings-card"
                            key={key}
                          >
                            <div className="settings-icon ms-1 me-2 ms-lg-0 me-lg-0">
                              <img
                                src={patron.avatar}
                                alt={patron.name}
                                style={{ width: 32, height: 32 }}
                                className="rounded-circle"
                              />
                            </div>
                            <div className="flex-grow-1 mw-0">
                              <span className="d-block text-truncate">
                                Join <b>{patron.name}</b>
                              </span>
                              <small className="d-block mt-n1 text-muted text-truncate">
                                in supporting ChangeWindows
                              </small>
                            </div>
                            <div className="ms-2 d-block d-md-none d-lg-block">
                              <AmaranthIcon icon={aiPatreon} />
                            </div>
                          </a>
                        </div>
                      )}
                      <div className="col-12 titel">
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
                          date={
                            channel.flight ? parseISO(channel.flight.date) : ""
                          }
                          url={channel.flight ? channel.flight.url : undefined}
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
