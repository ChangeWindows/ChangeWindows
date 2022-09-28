import React, { useMemo } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import PlatformIcon from "@/Platforms/PlatformIcon";
import LifeCycle from "@/Pages/Platforms/_LifeCycle";
import clsx from "clsx";

export default function ReleaseCard({
  name,
  platform,
  channels,
  alts,
  flight,
  url,
  dates,
  pack = false,
}) {
  const Component = useMemo(() => (url ? InertiaLink : "div"), ["url"]);
  const mainProps = useMemo(() => ({ href: url }), ["url"]);

  return (
    <div className="col-12">
      <Component {...mainProps} className="card release">
        <div className="d-flex flex-row">
          {platform && (
            <h3 className="h6 mb-0 d-flex align-items-center">
              <PlatformIcon platform={platform} color />
            </h3>
          )}
          <div className="ms-0 row flex-grow-1">
            <div className="col-12 col-md-8">
              <div className="row">
                <div className="col-lg-8 col-12 d-flex flex-column align-items-start justify-content-center">
                  <h3 className="h6 mb-0">{name}</h3>
                  {dates && (
                    <div className="mt-2 w-50">
                      <LifeCycle release={dates} small />
                    </div>
                  )}
                </div>
                <div className="col-lg-4 col-12 d-flex flex-column align-items-start justify-content-center">
                  {!pack && flight && !platform?.tool && (
                    <small className="text-muted mb-0 mt-1 mt-lg-0">
                      {flight}
                    </small>
                  )}
                  {!pack && alts && !platform?.tool && (
                    <small
                      className={clsx("text-muted mb-0 mt-lg-n1", {
                        "mt-n1": flight,
                        "mt-1": !flight,
                      })}
                    >
                      {alts.join(", ")}
                    </small>
                  )}
                </div>
              </div>
            </div>
            {channels && (
              <div className="col-12 col-md-4 release-channels d-flex justify-content-start justify-content-md-end mt-2 mt-md-0 gap-1">
                {channels?.map((channel, key) => (
                  <span
                    key={key}
                    className="badge"
                    style={{ backgroundColor: channel.color }}
                  >
                    {channel.short_name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Component>
    </div>
  );
}
