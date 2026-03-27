import React, { useMemo } from "react";

import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import LifeCycle from "@/Pages/Platforms/_LifeCycle";

import { Link } from "@inertiajs/react";
import clsx from "clsx";

export default function ReleaseCard({ name, platform, channels, alts, flight, url, dates }) {
  const Component = useMemo(() => (url ? Link : "div"), ["url"]);
  const mainProps = useMemo(() => ({ href: url }), ["url"]);

  return (
    <div className="col-12">
      <Component {...mainProps} className="card release">
        <div className="d-flex flex-row">
          {platform && (
            <h3 className="h6 d-flex align-items-center mb-0">
              <PlatformIcon platform={platform} color />
            </h3>
          )}
          <div className="row ms-0 flex-grow-1">
            <div className="col-md-8 col-12">
              <div className="row">
                <div className="col-lg-8 d-flex flex-column align-items-start justify-content-center col-12">
                  <h3 className="h6 mb-0">{name}</h3>
                  {dates && (
                    <div className="mt-2 w-50">
                      <LifeCycle release={dates} small />
                    </div>
                  )}
                </div>
                <div className="col-lg-4 d-flex flex-column align-items-start justify-content-center col-12">
                  {flight && !platform?.tool && <small className="text-muted mt-lg-0 mt-1 mb-0">{flight}</small>}
                  {alts && !platform?.tool && (
                    <small
                      className={clsx("text-muted mt-lg-n1 mb-0", {
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
              <div className="col-md-4 release-channels d-flex justify-content-start justify-content-md-end mt-md-0 col-12 mt-2 gap-1">
                {channels?.map((channel, key) => (
                  <span key={key} className="badge" style={{ backgroundColor: channel.color }}>
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
