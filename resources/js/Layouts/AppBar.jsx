import { useEffect, useState } from "react";

import { Drawer } from "@base-ui/react";
import { Link, router, usePage } from "@inertiajs/react";
import Amicon, {
  aiArrowRightFromBracket,
  aiArrowRightToBracket,
  aiBars,
  aiMagnifyingGlass,
  aiXmark,
} from "@studio384/amaranth";

import Button from "../Design/Components/Button";
import useMediaQuery from "../hooks/useMediaQuery";
import { getLocal, setLocal } from "../utils/localStorage";
import Navigation from "./Navigation/Navigation";

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
    <div className="col-span-full flex h-12 items-center justify-between pe-2 max-lg:ps-2 lg:ps-4">
      <div className="flex items-center gap-2">
        <Drawer.Root swipeDirection="right">
          <Drawer.Trigger render={<Button icon />}>
            <Amicon icon={aiBars} />
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] [--backdrop-opacity:0.2] [--bleed:3rem] data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute dark:[--backdrop-opacity:0.7]" />
            <Drawer.Viewport className="fixed inset-0 flex items-stretch justify-end p-(--viewport-padding) [--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem]">
              <Drawer.Popup className="-mr-12 h-full w-92 max-w-[calc(100vw-3rem+3rem)] transform-[translateX(var(--drawer-swipe-movement-x))] touch-auto overflow-y-auto overscroll-contain bg-zinc-50 p-3 pr-18 text-zinc-900 outline-1 outline-zinc-200 transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] [--bleed:3rem] data-ending-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-swiping:select-none supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:w-[20rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-20px)] supports-[-webkit-touch-callout:none]:rounded-[10px] supports-[-webkit-touch-callout:none]:pr-6 supports-[-webkit-touch-callout:none]:[--bleed:0px] dark:outline-zinc-300">
                <Drawer.Content className="mx-auto w-full max-w-lg">
                  <Drawer.Close render={<Button icon />} className="absolute top-3 right-21 z-10">
                    <Amicon icon={aiXmark} />
                  </Drawer.Close>
                  <Drawer.Title className="font-display mb-3 flex items-center justify-start gap-2">
                    <img
                      src={
                        props.app.preview === "preview"
                          ? "/images/logo-preview.svg"
                          : props.app.preview === "canary"
                            ? "/images/logo-canary.svg"
                            : "/images/logo.svg"
                      }
                      alt="ChangeWindows"
                      className="size-5 shrink-0"
                    />
                    <span className="inline-flex items-baseline gap-1 text-lg font-semibold text-black">
                      ChangeWindows
                      {props.app.preview === "canary" ? (
                        <span className="text-sm text-zinc-500"> canary</span>
                      ) : props.app.preview === "preview" ? (
                        <span className="text-sm text-zinc-500"> preview</span>
                      ) : (
                        ""
                      )}
                    </span>
                  </Drawer.Title>
                  <Navigation />
                </Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.Root>
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
            className="size-5 shrink-0"
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
      </div>

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
