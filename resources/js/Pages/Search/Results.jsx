import React from "react";

import ReleaseCard from "@/Components/Cards/ReleaseCard";
import App from "@/Layouts/App";

import { Head } from "@inertiajs/react";

export default function Index({ results, query }) {
  return (
    <App>
      <Head title="Search" />

      <div className="container">
        <div className="row g-1">
          <div className="titlebar col-12">
            <h1>Searchresults for "{query}"</h1>
          </div>
          <div className="col-12 my-3">
            {results.length > 0 ? (
              <div className="row g-1">
                {results.map((result, key) => (
                  <ReleaseCard
                    key={key}
                    platform={result.searchable.platform}
                    name={result.searchable.name}
                    alts={[`Version ${result.searchable.version}`, result.searchable.codename]}
                    channels={result.searchable.channels}
                    url={route("front.platforms.releases", {
                      platform: result.searchable.platform,
                      release: result.searchable,
                    })}
                  />
                ))}
              </div>
            ) : (
              <>
                <p>No search results found...</p>
              </>
            )}
          </div>
        </div>
      </div>
    </App>
  );
}
