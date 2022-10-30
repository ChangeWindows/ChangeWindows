import React from "react";
import { InertiaHead } from "@inertiajs/inertia-react";

import App from "@/Layouts/App";

import FlagStatus from "@/Components/_FlagStatus";
import clsx from "clsx";

export default function Index({ results, query }) {
  return (
    <App>
      <InertiaHead title="Search" />

      <div className="container">
        <div className="row g-1">
          <div className="col-12 titlebar">
            <h1>Searchresults for "{query}"</h1>
          </div>
          <div className="col-12 my-3 timeline">
            {results.length > 0 ? (
              <>
                {results.map((result, key) => (
                  <a
                    key={key}
                    className={clsx('flag', result.searchable.description && 'flag-descripted')}
                    href={route("front.flags.show", result.searchable.slug)}
                  >
                    <div className="flag-name">{result.title}</div>
                    {result.searchable.status.feature_id !== null && (
                      <div className="flag-id text-muted font-monospace">
                        {result.searchable.status.feature_id}
                      </div>
                    )}
                    <div className="flag-status">
                      <FlagStatus flagStatus={result.searchable.status} />
                    </div>

                    {result.searchable.description && <p className="flag-description m-0">{result.searchable.description}</p>}
                  </a>
                ))}
              </>
            ) : (
              <>
                <p>No flags found...</p>
              </>
            )}
          </div>
        </div>
      </div>
    </App>
  );
}
