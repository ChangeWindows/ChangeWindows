import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";

import AmaranthIcon, { aiCheck, aiPlus } from "@changewindows/amaranth";

export default function Show({ tweet_streams, status = null }) {
  return (
    <Admin>
      <NaviBar
        actions={
          <InertiaLink href={route('admin.tweet_streams.create')} className="btn btn-primary btn-sm">
            <AmaranthIcon icon={aiPlus} /> New
          </InertiaLink>
        }
      >
        Twitter Tweet Streams
      </NaviBar>

      <div className="container">
        {status && (
          <div className="alert alert-success">
            <AmaranthIcon icon={aiCheck} /> {status}
          </div>
        )}
        <div className="row g-1">
          {tweet_streams.map((tweet_stream) => (
            <div className="col-6 col-xl-4 col-xxl-3" key={tweet_stream.id}>
              <InertiaLink
                href={route('admin.tweet_streams.edit', tweet_stream)}
                className="card border-0 shadow-sm"
              >
                <div className="card-body">
                  <h3 className="h6 mb-0">{tweet_stream.name}</h3>
                  <p className="text-muted mb-0 mt-n1">
                    <small>{tweet_stream.account}</small>
                  </p>
                </div>
              </InertiaLink>
            </div>
          ))}
        </div>
      </div>
    </Admin>
  );
}
