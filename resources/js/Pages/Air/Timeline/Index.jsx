import React from "react";

import "../../../../sass/air/style.scss";
import Header from "../Layout/Header";
import { Head } from "@inertiajs/inertia-react";
import DateGroup from "./_DateGroup";
import PaltformCard from "./_PlatformCard";
import { parseISO } from "date-fns";

export default function Index({
  flights,
  platforms,
  legacyPlatforms,
  platform,
}) {
  console.log(flights);

  return (
    <>
      <Head>
        <title>CW Air</title>
      </Head>
      <Header
        platforms={platforms}
        legacyPlatforms={legacyPlatforms}
        platform={platform}
      />
      <div className="container py-3 px-3 px-sm-0 timeline">
        <h2>
          <span className="fw-bold">ChangeWindows</span>{" "}
          <span className="fw-light">Air</span>
        </h2>
        {Object.keys(flights).map((date, key) => (
          <DateGroup date={parseISO(flights[date].date)} key={key}>
            {flights[date].flights.map((platform, _key) => (
              <PaltformCard platform={platform} />
            ))}
          </DateGroup>
        ))}
      </div>
    </>
  );
}
