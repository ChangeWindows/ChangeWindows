import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import "bootstrap";

const legacyPage = typeof document === "undefined" ? undefined : document.getElementById("app")?.dataset.page;
const initialPage = legacyPage ? JSON.parse(legacyPage) : undefined;

createInertiaApp({
  page: initialPage,
  title: (title) => `${title} &middot; ChangeWindows`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob("./Pages/**/*.jsx")),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },
  progress: { color: "#0066ff" },
  defaults: {
    future: {
      useDataInertiaHeadAttribute: true,
    },
  },
});
