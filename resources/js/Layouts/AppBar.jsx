import React, { useEffect, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";

import AmaranthIcon, {
  aiArrowRightFromBracket,
  aiArrowRightToBracket,
  aiCircleUser,
  aiMagnifyingGlass,
} from "@changewindows/amaranth";

import { getLocal, setLocal } from "../utils/localStorage";
import useMediaQuery from "../hooks/useMediaQuery";

export default function AppBar() {
  const { props, url } = usePage();
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
    router.post("/logout");
  }

  function handleSearch(e) {
    e.preventDefault();
    router.post(url.includes("/flags") ? "/search/flags" : "/search", { search });
  }

  return (
    <div className="grid-header">
      <nav className="navbar navbar-dark navbar-main">
        <div className="container-fluid">
          <div className="navbar-main">
            <Link className="navbar-brand" href="/">
              <img
                src={
                  props.app.preview === "preview"
                    ? "/images/logo-preview.svg"
                    : props.app.preview === "canary"
                    ? "/images/logo-canary.svg"
                    : "/images/logo.svg"
                }
                alt="ChangeWindows"
                className="app-icon"
              />
              <span className="brand-label d-none d-md-inline">
                ChangeWindows
                {props.app.preview === "canary" ? (
                  <span className="text-muted text-sm"> canary</span>
                ) : props.app.preview === "preview" ? (
                  <span className="text-muted text-sm"> preview</span>
                ) : (
                  ""
                )}
              </span>
            </Link>
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
                placeholder={url.includes('/flags') ? "Search flags..." : "Search releases..."}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search"
                aria-describedby="search"
              />
            </form>
          </div>
          <div className="navbar-actions">
            {props.auth ? (
              <>
                <Link
                  href="/profile"
                  className="btn btn-transparent btn-profile me-2"
                >
                  <AmaranthIcon icon={aiCircleUser} />
                </Link>
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
              <Link
                href="/login"
                className="btn btn-transparent btn-profile"
              >
                <AmaranthIcon icon={aiArrowRightToBracket} />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
