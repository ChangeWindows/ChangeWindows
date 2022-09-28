import React from "react";
import { InertiaHead } from "@inertiajs/inertia-react";

import App from "@/Layouts/App";

import ReleaseCard from "@/Components/Cards/ReleaseCard";

export default function Index({ results, query }) {
  return (
    <App>
      <InertiaHead title="Search" />

      <div className="container">
        <div className="row g-1">
          <div className="col-12 titlebar">
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
                    alts={[
                      `Version ${result.searchable.version}`,
                      result.searchable.codename,
                    ]}
                    channels={result.searchable.channels}
                    url={result.searchable.url}
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
