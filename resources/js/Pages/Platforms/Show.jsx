import React, { useMemo } from "react";
import { Head } from "@inertiajs/react";

import App from "@/Layouts/App";
import Channel from "@/Components/Cards/Channel";
import ReleaseCard from "@/Components/Cards/ReleaseCard";

import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import PlatformNavigation from "@/Components/PlatformNavigation";

import { parseISO } from "date-fns";

export default function Show({ platforms, platform, channels, releases }) {
  const [currentReleases, legacyReleases] = useMemo(() => {
    const currentReleases = releases.filter(
      (release) => release.channels.length > 0
    );
    const legacyReleases = releases.filter(
      (release) => release.channels.length === 0
    );

    return [currentReleases, legacyReleases];
  }, [releases]);

  return (
    <App>
      <Head title={platform.name} />

      <PlatformNavigation
        page="Platforms"
        platforms={platforms}
        routeName="front.platforms.show"
      />

      <div className="container">
        <div className="row g-3">
          <div className="col-12 titlebar">
            <h1 style={{ color: platform.color }}>
              <PlatformIcon platform={platform} color className="me-2" />{" "}
              {platform.name}
            </h1>
            <p className="mb-0 mt-1">{platform.description}</p>
          </div>

          {channels.length >= 1 && (
            <div className="col-12">
              <h2 className="h5 mb-3 fw-bold">Channels</h2>
              <div className="row g-1">
                {channels.map((channel, key) => (
                  <Channel
                    key={key}
                    channel={{ color: channel.color, name: channel.name ?? 'No data' }}
                    build={channel.flight?.version ?? "No data"}
                    date={parseISO(channel.flight?.date) ?? "No data"}
                    url={
                      channel.release
                        ? route("front.platforms.releases", {
                            release: channel.release,
                            platform,
                          })
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          )}
          <div className="col-12">
            <div className="row">
              {currentReleases.length > 0 && (
                <div className="col-12 mt-4">
                  <h2 className="h5 mb-3 fw-bold">Current releases</h2>
                  <div className="row g-1">
                    {currentReleases.map((release, key) => (
                      <ReleaseCard
                        key={key}
                        platform={platform}
                        name={release.name}
                        alts={[`Version ${release.version}`, release.codename]}
                        flight={release.latest_flight}
                        channels={release.channels}
                        url={route("front.platforms.releases", [
                          platform,
                          release,
                        ])}
                        dates={release.dates}
                      />
                    ))}
                  </div>
                </div>
              )}
              {legacyReleases.length > 0 && (
                <div className="col-12 mt-4">
                  <h2 className="h5 mb-3 fw-bold">Unsupported releases</h2>
                  <div className="row g-1">
                    {legacyReleases.map((release, key) => (
                      <ReleaseCard
                        key={key}
                        platform={platform}
                        name={release.name}
                        alts={[`Version ${release.version}`, release.codename]}
                        flight={release.latest_flight}
                        url={route("front.platforms.releases", [
                          platform,
                          release,
                        ])}
                        dates={release.dates}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </App>
  );
}
