import React from "react";

import Amicon, { aiFloppyDisk, aiSpinnerThird } from "@studio384/amaranth";
import clsx from "clsx";

export default function SaveButton({ className, loading, ...props }) {
  return (
    <button {...props} className={clsx("btn btn-primary btn-sm", className)} disabled={loading}>
      <Amicon icon={loading ? aiSpinnerThird : aiFloppyDisk} spin={loading} /> {loading ? "Saving..." : "Save"}
    </button>
  );
}
