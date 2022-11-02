import React from "react";

import "../../../../sass/air/style.scss";
import Header from "../Layout/Header";

export default function Index({ platforms, legacyPlatforms, platform }) {
  return (
    <>
      <Header platforms={platforms} legacyPlatforms={legacyPlatforms} platform={platform} />
      <div className="container py-3 px-3 px-sm-0">
        <h2><span className="fw-bold">ChangeWindows</span> <span className="fw-light">Air</span></h2>
      </div>
    </>
  );
}
