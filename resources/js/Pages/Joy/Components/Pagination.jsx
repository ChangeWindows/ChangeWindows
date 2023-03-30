import React from "react";
import { Link } from "@inertiajs/react";

import AmaranthIcon, { aiArrowLeft, aiArrowRight } from "@studio384/amaranth";
import { Divider, IconButton, Stack } from "@mui/joy";

export default function Pagination({ pagination }) {
  if (pagination.links.length <= 3) return;

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ pb: 7 }}>
      <Stack
        component="nav"
        direction="row"
        gap={0.25}
        sx={{
          p: 0.5,
          border: "1px solid rgba(var(--joy-palette-neutral-mainChannel) / .1)",
          backgroundColor: "var(--joy-palette-acrylic-backgroundColor)",
          backdropFilter: "var(--joy-palette-acrylic-filter)",
          m: 1,
          position: "fixed",
          bottom: 0,
          borderRadius: "md",
        }}
      >
        {pagination.links.map((link, key) => {
          if (link.label.includes("Previous")) {
            return (
              <IconButton
                component={Link}
                variant="plain"
                color="neutral"
                size="sm"
                href={link.url}
                disabled={!link.url}
                sx={{ textDecoration: "none" }}
                key={key}
              >
                <AmaranthIcon icon={aiArrowLeft} />
              </IconButton>
            );
          } else if (link.label.includes("Next")) {
            return (
              <IconButton
                component={Link}
                variant="plain"
                color="neutral"
                size="sm"
                href={link.url}
                disabled={!link.url}
                sx={{ textDecoration: "none" }}
                key={key}
              >
                <AmaranthIcon icon={aiArrowRight} />
              </IconButton>
            );
          } else if (link.label === "...") {
            return <Divider key={key} orientation="vertical" sx={{ my: 1 }} />;
          } else {
            return (
              <IconButton
                component={Link}
                href={link.url}
                disabled={!link.url}
                sx={{ textDecoration: "none" }}
                variant={link.active ? "soft" : "plain"}
                color={link.active ? "primary" : "neutral"}
                size="sm"
                key={key}
              >
                {link.label}
              </IconButton>
            );
          }
        })}
      </Stack>
    </Stack>
  );
}
