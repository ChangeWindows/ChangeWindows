import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import App from "@/Layouts/App";

import AmaranthIcon, {
  aiCodeBranch,
  aiGithub,
  aiPatreon,
  aiSwatchbook,
  aiTwitter,
  aiCheck,
  aiEnvelope,
  aiShieldKeyhole,
  aiSpinnerThird,
  aiPerson,
} from "@studio384/amaranth";

import { getLocal, setLocal } from "@/utils/localStorage";
import TextField from "@/Components/UI/Forms/TextField";
import NaviBar from "@/Components/NaviBar";
import Status from "@/Components/Status";

export default function Show({ app, patrons, user }) {
  // Live settings
  const [theme, setTheme] = useState(getLocal("theme"));
  const [showActiveOnly, setShowActiveOnly] = useState(
    getLocal("showActiveOnly")
  );

  function toggleTheme(mode) {
    if (mode === "default") {
      setLocal("theme", "default");
      setTheme("default");
      document.querySelector("html").classList.add("theme-default");
      document.querySelector("html").classList.remove("theme-light");
      document.querySelector("html").classList.remove("theme-dark");
    } else if (mode === "light") {
      setLocal("theme", "light");
      setTheme("light");
      document.querySelector("html").classList.add("theme-light");
      document.querySelector("html").classList.remove("theme-default");
      document.querySelector("html").classList.remove("theme-dark");
    } else {
      setLocal("theme", "dark");
      setTheme("dark");
      document.querySelector("html").classList.add("theme-dark");
      document.querySelector("html").classList.remove("theme-light");
      document.querySelector("html").classList.remove("theme-default");
    }
  }

  function toggleShowActiveOnly() {
    setLocal("showActiveOnly", showActiveOnly ? 0 : 1);
    setShowActiveOnly(showActiveOnly ? 0 : 1);
  }

  // Profile
  const { data, setData, patch, processing, errors } = useForm(user);

  function submitPatch(event) {
    event.preventDefault();
    patch(route("front.profile.update", user), {
      preserveScroll: true,
    });
  }

  return (
    <App>
      <Head title="Settings" />

      <NaviBar
        actions={
          user && (
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={processing}
              onClick={submitPatch}
            >
              <AmaranthIcon
                icon={processing ? aiSpinnerThird : aiCheck}
                spin={processing}
              />{" "}
              Save
            </button>
          )
        }
      >
        Settings
      </NaviBar>

      <form className="container" onSubmit={submitPatch}>
        <Status status={status} />
        <fieldset className="row g-3">
          <div className="col-12 col-lg-8 col-xl-9">
            <div className="row g-3">
              {user && (
                <div className="col-12 pt-3">
                  <p className="h6 mb-2">Details</p>
                  <div className="settings-card">
                    <div className="settings-icon">
                      <AmaranthIcon icon={aiPerson} className="fs-6" />
                    </div>
                    <div className="flex-grow-1">
                      <span className="d-block">Username</span>
                    </div>
                    <div>
                      <TextField
                        id="name"
                        label="Username"
                        value={data.name}
                        errors={errors.name}
                        onChange={setData}
                        disableFloating
                      />
                    </div>
                  </div>
                  <div className="settings-card">
                    <div className="settings-icon">
                      <AmaranthIcon icon={aiEnvelope} className="fs-6" />
                    </div>
                    <div className="flex-grow-1">
                      <span className="d-block">Email address</span>
                    </div>
                    <div>
                      <TextField
                        type="email"
                        id="email"
                        label="Email address"
                        value={data.email}
                        errors={errors.email}
                        onChange={setData}
                        disableFloating
                      />
                    </div>
                  </div>
                </div>
              )}

              {user && (
                <div className="col-12 pt-3">
                  <p className="h6 mb-2">Security</p>
                  <div className="settings-card">
                    <div className="settings-icon">
                      <AmaranthIcon icon={aiShieldKeyhole} className="fs-6" />
                    </div>
                    <div className="flex-grow-1">
                      <span className="d-block mb-n1">Password</span>
                      <span className="d-block text-muted text-sm">
                        Manage your password
                      </span>
                    </div>
                    <div>
                      <Link
                        href={route("front.profile.password")}
                        className="btn btn-primary btn-sm"
                      >
                        <AmaranthIcon icon={aiShieldKeyhole} /> Change password
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-12 pt-3">
                <p className="h6 mb-2">Appearance</p>
                <div className="settings-card">
                  <div className="settings-icon">
                    <AmaranthIcon icon={aiSwatchbook} className="fs-6" />
                  </div>
                  <div className="flex-grow-1">
                    <span className="d-block mb-n1">Choose your theme</span>
                    <span className="d-block text-muted text-sm">
                      Change the ChangeWindows theme.
                    </span>
                  </div>
                  <div>
                    <select
                      className="form-control"
                      onChange={(e) => toggleTheme(e.target.value)}
                      defaultValue={theme}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="default">Use system theme</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-12 pt-2">
                <p className="h6 mb-2">Channels</p>
                <div className="settings-card">
                  <div className="settings-icon">
                    <AmaranthIcon icon={aiCodeBranch} className="fs-6" />
                  </div>
                  <div className="flex-grow-1">
                    <span className="d-block mb-n1">
                      Show inactive channels
                    </span>
                    <span className="d-block text-muted text-sm">
                      Hide channels on the Channels-pages when they aren't
                      active.
                    </span>
                  </div>
                  <div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={toggleShowActiveOnly}
                        checked={!showActiveOnly}
                        id="showActiveChannelsOnly"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 pt-2">
                <p className="h6 mb-2">Patrons</p>
                {patrons.map((patron, key) => (
                  <div className="settings-card" key={key}>
                    <div className="settings-icon">
                      <img
                        src={patron.avatar}
                        alt={patron.name}
                        style={{ width: 32, height: 32 }}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <span className="d-block">{patron.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 col-xl-3">
            <p className="h6 pt-3">About ChangeWindows</p>

            <p className="text-md">
              ChangeWindows {app.preview === "preview" && "Preview"}
              {app.preview === "canary" && "Canary"} {app.version}
              <br />
              &copy; 2014-2023{" "}
              <a
                className="m-0 f-384 fw-bold"
                href="https://studio384.be"
                target="_blank"
              >
                Studio <span className="studio-384">384</span>
              </a>
              <br />
              All Right Reserved
            </p>

            <p className="text-md">
              ChangeWindows is a detailed changelog and release history for
              Windows across all platforms it appears on. With detailed and
              timely updates, as well as a clean and clear interface,
              ChangeWindows' goal is to provide a solid resource for anyone
              interested in knowing what's next for Windows.
            </p>

            <div className="d-flex gap-1 flex-wrap">
              <a
                href="https://twitter.com/changewindows"
                target="_blank"
                className="btn btn-primary btn-sm"
              >
                <AmaranthIcon icon={aiTwitter} /> Twitter
              </a>
              <a
                href="https://github.com/changewindows/horizon"
                target="_blank"
                className="btn btn-primary btn-sm"
              >
                <AmaranthIcon icon={aiGithub} /> GitHub
              </a>
              <a
                href="https://patreon.com/changewindows"
                target="_blank"
                className="btn btn-primary btn-sm"
              >
                <AmaranthIcon icon={aiPatreon} /> Patreon
              </a>
            </div>
            <div className="mt-3">
              <a
                className="h1 m-0 f-384 fw-bold"
                href="https://studio384.be"
                target="_blank"
              >
                Studio <span className="studio-384">384</span>
              </a>
            </div>
          </div>
        </fieldset>
      </form>
    </App>
  );
}
