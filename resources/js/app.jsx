import React from "react";
import { createRoot } from "react-dom/client";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import { createInertiaApp } from "@inertiajs/react";
import { CssVarsProvider } from "@mui/joy/styles";

import "bootstrap";
import { GlobalStyles } from "@mui/joy";
import cwTheme from "./theme";

createInertiaApp({
  title: (title) => `${title} &middot; ChangeWindows`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx")
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <CssVarsProvider theme={cwTheme} defaultMode="system">
        <GlobalStyles styles={{ body: { margin: 0 } }} />
        <App {...props} />
      </CssVarsProvider>
    );
  },
  progress: {
    color: "#0066ff",
  },
});

function appHeight() {
  const doc = document.documentElement;
  doc.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
}

window.addEventListener("resize", appHeight);
appHeight();

if (navigator.platform == "iPad") {
  window.onorientationchange = function () {
    appHeight();
  };
}
