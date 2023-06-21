import React from "react";

import { Typography } from "@mui/joy";

export default function ChannelChip({ channel }) {
  return (
    <Typography
      fontSize="xs"
      fontWeight="lg"
      variant="solid"
      color={
        channel.color === "#673ab7"
          ? "purple"
          : channel.color === "#e74018"
          ? "red"
          : channel.color === "#fb8009"
          ? "orange"
          : channel.color === "#ffc000"
          ? "amber"
          : channel.color === "#c0d700"
          ? "rio"
          : channel.color === "#97c800"
          ? "lime"
          : channel.color === "#46c429"
          ? "green"
          : channel.color === "#10b08f"
          ? "teal"
          : channel.color === "#0098df"
          ? "sky"
          : "primary"
      }
    >
      {channel.name}
    </Typography>
  );
}
