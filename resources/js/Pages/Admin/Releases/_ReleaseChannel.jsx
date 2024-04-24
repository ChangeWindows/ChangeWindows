import React from "react";
import { Link, useForm } from "@inertiajs/react";

import Amicon, {
  aiCheck,
  aiSpinnerThird,
  aiXmark,
} from "@studio384/amaranth";
import clsx from "clsx";

export default function ReleaseChannel({ can, releaseChannel }) {
  const { data, patch, processing } = useForm(releaseChannel);

  function toggleSupported(e) {
    e.preventDefault();
    patch(route("admin.releasechannels.toggleSupported", data));
  }

  return (
    <div className="col-12 col-sm-6 col-xl-4">
      <Link
        href={route("admin.releasechannels.edit", releaseChannel)}
        className="card border-0 shadow-sm h-100"
      >
        <div className="card-body">
          <div className="d-flex">
            <h3 className="h6 mb-0">
              <div
                className="dot"
                style={{ backgroundColor: releaseChannel.color }}
              />
            </h3>
            <div className="ms-2">
              <h3 className="h6 mb-0">{releaseChannel.name}</h3>
              <p className="text-muted mb-0">
                <small>{releaseChannel.short_name}</small>
              </p>
            </div>
          </div>
          <div className="flex-grow-1" />
          <div className="btn-toolbar justify-content-end">
            <button
              className={clsx("btn btn-sm mt-3", {
                "btn-primary": releaseChannel.supported,
                "btn-transparent": !releaseChannel.supported,
              })}
              disabled={!can.releases.edit}
              onClick={toggleSupported}
            >
              <Amicon
                icon={
                  processing
                    ? aiSpinnerThird
                    : releaseChannel.supported
                    ? aiCheck
                    : aiXmark
                }
                spin={processing}
              />{" "}
              {processing ? "Toggling..." : "Supported"}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
