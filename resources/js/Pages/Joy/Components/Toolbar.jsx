import React from "react";

import { Box, Container, IconButton, Stack, Typography } from "@mui/joy";
import { Link } from "@inertiajs/react";
import AmaranthIcon, { aiArrowLeft } from "@studio384/amaranth";

export default function Toolbar({ title, back, children }) {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        borderBottom:
          "1px solid rgba(var(--joy-palette-neutral-mainChannel) / .1)",
        backgroundColor: "var(--joy-palette-acrylic-backgroundColor)",
        backdropFilter: "var(--joy-palette-acrylic-filter)",
        zIndex: 1300,
      }}
    >
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 1 }}
        >
          <Stack direction="row" gap={1} alignItems="center">
            {back && (
              <IconButton component={Link} href={back} color="neutral">
                <AmaranthIcon icon={aiArrowLeft} />
              </IconButton>
            )}
            <Typography level="h2" fontSize="xl">
              {title}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            {children}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
