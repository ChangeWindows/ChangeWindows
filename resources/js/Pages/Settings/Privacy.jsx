import React from "react";
import { Head } from "@inertiajs/react";

import App from "@/Layouts/App";

export default function Show({ app }) {
  return (
    <App>
      <Head title="Settings" />

      <nav className="navbar navbar-expand navbar-light sticky-top">
        <div className="container">
          <span className="navbar-brand text-wrap">Privacy</span>
        </div>
      </nav>

      <div className="container">
        <fieldset className="row g-3">
          <div className="col-12 titlebar">
            <h1>Privacy Policy</h1>
            <h6 className="fw-normal">Last updated on 31 August 2021</h6>
          </div>

          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12 mt-3">
                    <h5>What we track</h5>
                    <p>
                      Nothing. ChangeWindows is a very privacy-friendly app. We
                      don't track your usage, we don't track you. All we know
                      about you is when a device requests our website.
                    </p>
                    <h5>What we store on your device</h5>
                    <p className="m-0">
                      ChangeWindows will however store information on your
                      device. These are your personal settings and is limited to
                      the options you can set in Settings (which as of this
                      writing is your theme and your channel visibility).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </App>
  );
}
