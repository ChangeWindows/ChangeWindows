import { Fragment } from "react";

import Channel from "@/Components/Cards/Channel";
import Pagination from "@/Components/Pagination";
import PlatformNavigation from "@/Components/PlatformNavigation";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Timeline from "@/Components/Timeline/Timeline";
import App from "@/Layouts/App";

import { Head } from "@inertiajs/react";
import Amicon, { aiPatreon } from "@studio384/amaranth";
import clsx from "clsx";
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

      <div className="container grid grid-rows-[repeat(2,min_content)] gap-3 lg:grid-cols-[5fr_3fr]">
        <div>
          <h1 className="font-display my-2 text-2xl font-bold">Timeline</h1>
          {Object.keys(timeline).map((date, key) => (
            <Timeline date={parseISO(timeline[date].date)} key={key}>
              {timeline[date].flights.map((platform, _key) => (
                <PlatformTimelineCard platform={platform} />
              ))}
            </Timeline>
          ))}
          <Pagination pagination={pagination} />
        </div>
        <div className="my-4 flex flex-col gap-4">
          {channel_platforms.map((platform, key) => (
            <Fragment key={key}>
              {key === 2 && patron && (
                <a
                  href="https://www.patreon.com/changewindows"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-zinc-200 p-2 px-4 shadow-sm transition hover:shadow-lg"
                  key={key}
                >
                  <img src={patron.avatar} alt={patron.name} className="size-8 rounded-full" />
                  <div className="flex grow flex-col">
                    <span className="block truncate">
                      Join <b>{patron.name}</b>
                    </span>
                    <small className="block truncate text-zinc-500">in supporting ChangeWindows</small>
                  </div>
                  <Amicon icon={aiPatreon} />
                </a>
              )}
              <div className="flex flex-col gap-2">
                <h3 className="flex items-center gap-2 px-2 text-lg font-semibold" style={{ color: platform.color }}>
                  <PlatformIcon platform={platform} color />
                  <span>{platform.name}</span>
                  <span>{platform.channels.length}</span>
                </h3>
                <div className="grid grid-cols-6 gap-px rounded-lg border border-zinc-200 bg-zinc-200 shadow-sm contain-paint">
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
                      classNames={clsx({
                        "col-span-full": platform.channels.length === 1,
                        "col-span-3":
                          platform.channels.length === 2 ||
                          platform.channels.length === 4 ||
                          (platform.channels.length === 5 && _key > 2) ||
                          (platform.channels.length === 7 && _key <= 3),
                        "col-span-2":
                          platform.channels.length === 3 ||
                          (platform.channels.length === 5 && _key <= 2) ||
                          platform.channels.length === 6 ||
                          (platform.channels.length === 7 && _key > 3),
                      })}
                    />
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </App>
  );
}
