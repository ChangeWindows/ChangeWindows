import clsx from "clsx";

import "../../css/app.css";
import AppBar from "./AppBar";
import Navigation from "./Navigation/Navigation";

export default function App({ children, background = false }) {
  return (
    <div className="grid h-dvh grid-cols-[240px_auto] grid-rows-[min-content_auto] bg-zinc-100 text-black">
      <AppBar />
      <header className="px-2 max-lg:hidden">
        <Navigation />
      </header>
      <main
        className={clsx(
          "relative me-2 mb-2 overflow-auto rounded-lg border border-zinc-200 bg-zinc-50 shadow-md max-lg:col-span-full max-lg:ms-2",
          {
            auth: background,
          },
        )}
      >
        {children}
      </main>
    </div>
  );
}
