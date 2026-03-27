import { useEffect, useState } from "react";

import { Link, router, usePage } from "@inertiajs/react";
import Amicon, { aiArrowRightFromBracket, aiArrowRightToBracket, aiMagnifyingGlass } from "@studio384/amaranth";

import Button from "../Design/Components/Button";
import useMediaQuery from "../hooks/useMediaQuery";
import { getLocal, setLocal } from "../utils/localStorage";

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
    router.post(url.includes("/flags") ? "/search/flags" : "/search", {
      search,
    });
  }

  return (
    <div className="col-span-full flex h-12 items-center justify-between ps-4 pe-2">
      <Link className="font-display flex items-center justify-center gap-2" href="/">
        <img
          src={
            props.app.preview === "preview"
              ? "/images/logo-preview.svg"
              : props.app.preview === "canary"
                ? "/images/logo-canary.svg"
                : "/images/logo.svg"
          }
          alt="ChangeWindows"
          className="size-5"
        />
        <span className="hidden items-baseline gap-1 text-lg font-semibold text-black md:inline-flex">
          ChangeWindows
          {props.app.preview === "canary" ? (
            <span className="text-sm text-zinc-500"> canary</span>
          ) : props.app.preview === "preview" ? (
            <span className="text-sm text-zinc-500"> preview</span>
          ) : (
            ""
          )}
        </span>
      </Link>

      <form
        onSubmit={handleSearch}
        className="mx-4 flex w-full max-w-md items-center justify-center rounded-full border border-zinc-300 bg-white shadow-sm transition focus-within:shadow-lg focus-within:ring-2 focus-within:ring-blue-600"
      >
        <label className="flex size-9 shrink-0 items-center justify-center text-zinc-500">
          <Amicon icon={aiMagnifyingGlass} /> <span className="sr-only">Search</span>
        </label>
        <input
          type="text"
          id="search"
          name="search"
          className="h-9 w-full focus:outline-0"
          placeholder={url.includes("/flags") ? "Search flags..." : "Search releases..."}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search"
          aria-describedby="search"
        />
      </form>

      <div className="flex flex-row items-center justify-end gap-1">
        {props.auth ? (
          <form onSubmit={handleLogout} className="flex flex-row">
            <Button type="submit" icon>
              <Amicon icon={aiArrowRightFromBracket} />
            </Button>
          </form>
        ) : (
          <Link
            href="/login"
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700"
          >
            <Amicon icon={aiArrowRightToBracket} />
          </Link>
        )}
      </div>
    </div>
  );
}
