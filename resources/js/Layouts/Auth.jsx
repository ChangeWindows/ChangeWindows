import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";

import "../../sass/style.scss";

import AmaranthIcon, {
  aiArrowLeft,
  aiChangewindows,
} from "@studio384/amaranth";

import { getLocal, setLocal } from "../utils/localStorage";
import useMediaQuery from "../hooks/useMediaQuery";

export default function Auth({ children }) {
  const { app } = usePage().props;

  const matchesDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

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

  return (
    <div className="auth auth-flow">
      <div className="auth-card">
        <div className="auth-card-content">
          <a href="javascript:history.back()" className="btn btn-transparent" style={{ paddingTop: 7, paddingBottom: 7 }}>
            <AmaranthIcon icon={aiArrowLeft} />
          </a>

          <h1 className="m-0 py-3 pt-sm-4 pb-sm-5 d-flex font-brand fw-bold justify-content-center align-items-center" style={{ fontSize: 28 }}>
            <AmaranthIcon icon={aiChangewindows} className="me-1" />
            {app.name}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}
