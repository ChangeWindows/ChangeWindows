import * as React from "react";
import { Box, Container, Sheet, Typography } from "@mui/joy";
import AmaranthIcon, { aiChangewindows } from "@changewindows/amaranth";

import "@changewindows/amaranth/dist/amaranth.scss";

export default function Header() {
  return (
    <Sheet
      sx={{
        alignItems: "center",
        position: "fixed",
        top: 0,
        width: 1,
        height: 52,
        zIndex: 9995,
        border: '1px solid var(--joy-palette-background-level2)'
      }}
    >
      <Container sx={{
        height: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <AmaranthIcon icon={aiChangewindows} />
          <Typography level="h1" fontSize="xl" fontWeight="md">
            ChangeWindows
          </Typography>
        </Box>
      </Container>
    </Sheet>
  );
}
