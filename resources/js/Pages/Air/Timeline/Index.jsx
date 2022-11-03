import React from "react";

import "../../../../sass/air/style.scss";
import Header from "../Layout/Header";
import { Head } from "@inertiajs/inertia-react";

export default function Index({ platforms, legacyPlatforms, platform }) {
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
      <div className="container py-3 px-3 px-sm-0">
        <h2><span className="fw-bold">ChangeWindows</span> <span className="fw-light">Air</span></h2>
      </div>
    </>
  );
}
