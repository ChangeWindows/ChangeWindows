import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink, Link, usePage } from "@inertiajs/inertia-react";

import AmaranthIcon, {
  aiArrowRightFromBracket,
  aiArrowRightToBracket,
  aiCircleUser,
  aiMagnifyingGlass,
} from "@changewindows/amaranth";

import { getLocal, setLocal } from "../utils/localStorage";
import useMediaQuery from "../hooks/useMediaQuery";

export default function AppBar() {
  const { app, auth } = usePage().props;
  const matchesDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [search, setSearch] = useState("");

  useEffect(() => {
    const theme = getLocal("theme");

    if (theme === "dark" || (theme === "default" && matchesDarkMode)) {
      document.head.children["color-scheme"].content = "dark";
      document.head.children["theme-color"].content = "#202020";
    } else {
      document.head.children["color-scheme"].content = "light";
      document.head.children["theme-color"].content = "#f3f3f3";
    }
  }, [matchesDarkMode]);

  useEffect(() => {
    const theme = getLocal("theme");

    if (!theme) {
      setLocal("theme", "default");
    } else if (theme === "light") {
      document.querySelector("html").classList.add("theme-light");
      document.querySelector("html").classList.remove("theme-default");
    } else if (theme === "dark") {
      document.querySelector("html").classList.add("theme-dark");
      document.querySelector("html").classList.remove("theme-default");
    }
  });

  function handleLogout(e) {
    e.preventDefault();
    Inertia.post("/logout");
  }

  function handleSearch(e) {
    e.preventDefault();
    Inertia.post("/search", { search });
  }

  return (
    <div className="grid-header">
      <nav className="navbar navbar-dark navbar-main">
        <div className="container-fluid">
          <div className="navbar-main">
            <InertiaLink className="navbar-brand" href="/">
              <img
                src={
                  app.preview === "preview"
                    ? "/images/logo-preview.svg"
                    : app.preview === "canary"
                    ? "/images/logo-canary.svg"
                    : "/images/logo.svg"
                }
                alt="ChangeWindows"
                className="app-icon"
              />
              <span className="brand-label d-none d-md-inline">
                ChangeWindows
                {app.preview === "canary" ? (
                  <span className="text-muted text-sm"> canary</span>
                ) : app.preview === "preview" ? (
                  <span className="text-muted text-sm"> preview</span>
                ) : (
                  ""
                )}
              </span>
            </InertiaLink>
          </div>
          <div className="navbar-search">
            <form
              onSubmit={handleSearch}
              className="input-group input-group-search"
            >
              <span className="input-group-text">
                <AmaranthIcon icon={aiMagnifyingGlass} />
              </span>
              <input
                type="text"
                id="search"
                name="search"
                className="form-control"
                placeholder="Search..."
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search"
                aria-describedby="search"
              />
            </form>
          </div>
          <div className="navbar-actions">
            {auth ? (
              <>
                <InertiaLink
                  href="/profile"
                  className="btn btn-transparent btn-profile me-2"
                >
                  <AmaranthIcon icon={aiCircleUser} />
                </InertiaLink>
                <form onSubmit={handleLogout} className="d-block">
                  <button
                    type="submit"
                    className="btn btn-transparent btn-profile"
                  >
                    <AmaranthIcon icon={aiArrowRightFromBracket} />
                  </button>
                </form>
              </>
            ) : (
              <InertiaLink
                href="/login"
                className="btn btn-transparent btn-profile"
              >
                <AmaranthIcon icon={aiArrowRightToBracket} />
              </InertiaLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
