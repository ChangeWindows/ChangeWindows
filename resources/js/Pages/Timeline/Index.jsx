import { Fragment } from "react";

import Channel from "@/Components/Cards/Channel";
import Pagination from "@/Components/Pagination";
import PlatformNavigation from "@/Components/PlatformNavigation";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Timeline from "@/Components/Timeline/Timeline";
import App from "@/Layouts/App";

import { Head } from "@inertiajs/react";
import Amicon, { aiPatreon } from "@studio384/amaranth";
import { parseISO } from "date-fns";

import PlatformTimelineCard from "./_PlatformTimelineCard";

export default function Index({ timeline, pagination, platforms, channel_platforms, patron }) {
  return (
    <App>
      <Head title="Timeline" />

      <PlatformNavigation
        home
        all="front.timeline"
        page="Timeline"
        routeName="front.timeline.show"
        platforms={platforms}
      />

      <div className="container">
        <div className="row g-1">
          <div className="titlebar col-12">
            <h1>Timeline</h1>
          </div>
          <div className="col">
            <div className="row g-3">
              <div className="col-md-8 col-lg-7 col-12">
                <div className="row g-1">
                  {Object.keys(timeline).map((date, key) => (
                    <Timeline date={parseISO(timeline[date].date)} key={key}>
                      {timeline[date].flights.map((platform) => (
                        <PlatformTimelineCard key={platform[0].platform.id} platform={platform} />
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
                          <a href="https://www.patreon.com/changewindows" className="settings-card" key={key}>
                            <div className="settings-icon ms-lg-0 me-lg-0 ms-1 me-2">
                              <img
                                src={patron.avatar}
                                alt={patron.name}
                                style={{ width: 32, height: 32 }}
                                className="rounded-circle"
                              />
                            </div>
                            <div className="mw-0 flex-grow-1">
                              <span className="d-block text-truncate">
                                Join <b>{patron.name}</b>
                              </span>
                              <small className="d-block mt-n1 text-secondary text-truncate">
                                in supporting ChangeWindows
                              </small>
                            </div>
                            <div className="d-block d-md-none d-lg-block ms-2">
                              <Amicon icon={aiPatreon} />
                            </div>
                          </a>
                        </div>
                      )}
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
