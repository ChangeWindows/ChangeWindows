import React from "react";

import { Box, Container, Stack, Typography } from "@mui/joy";

export default function Toolbar({ title, children }) {
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
          <Typography level="h2" fontSize="xl">
            {title}
          </Typography>
          <Stack direction="row" gap={1}>
            {children}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
