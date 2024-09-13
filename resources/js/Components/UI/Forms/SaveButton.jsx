import React from "react";

import clsx from "clsx";

import Amicon, {
  aiFloppyDisk,
  aiSpinnerThird,
} from "@studio384/amaranth";

export default function SaveButton({ className, loading, ...props }) {
  return (
    <button
      {...props}
      className={clsx("btn btn-primary btn-sm", className)}
      disabled={loading}
    >
      <Amicon
        icon={loading ? aiSpinnerThird : aiFloppyDisk}
        spin={loading}
      />{" "}
      {loading ? "Saving..." : "Save"}
    </button>
  );
}
