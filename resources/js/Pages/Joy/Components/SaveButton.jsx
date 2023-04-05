import React from "react";

import AmaranthIcon, { aiFloppyDisk } from "@studio384/amaranth";
import { Button } from "@mui/joy";

export default function SaveButton({ className, loading, ...props }) {
  return (
    <Button
      {...props}
      loading={loading}
      startDecorator={<AmaranthIcon icon={aiFloppyDisk} />}
      type="submit"
    >
      {loading ? "Saving..." : "Save"}
    </Button>
  );
}
