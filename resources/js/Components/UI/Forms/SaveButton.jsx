import React from "react";

import clsx from "clsx";

import AmaranthIcon, {
  aiFloppyDisk,
  aiSpinnerThird,
} from "@changewindows/amaranth";

export default function SaveButton({ className, loading, ...props }) {
  return (
    <button
      {...props}
      className={clsx("btn btn-primary btn-sm", className)}
      disabled={loading}
    >
      <AmaranthIcon
        icon={loading ? aiSpinnerThird : aiFloppyDisk}
        spin={loading}
      />{" "}
      {loading ? "Saving..." : "Save"}
    </button>
  );
}
