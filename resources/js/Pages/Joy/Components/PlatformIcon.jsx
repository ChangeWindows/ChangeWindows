import React, { useMemo } from "react";
import clsx from "clsx";

import AmaranthIcon, {
  aiAzure,
  aiChip,
  aiCode,
  aiDisc,
  aiVirtualReality,
  aiSmartphone,
  aiServer,
  aiDisplayCam,
  aiXbox,
  aiVisualStudio,
  aiSmartphoneHinge,
  aiWindows,
} from "@studio384/amaranth";

export default function PlatformIcon({
  platform,
  color = false,
  className = null,
}) {
  const icon = useMemo(() => {
    switch (platform.icon) {
      case "cloud":
        return aiAzure;
      case "code":
        return aiVisualStudio;
      case "compact-disc":
        return aiDisc;
      case "gamepad-modern":
        return aiXbox;
      case "head-side-goggles":
        return aiVirtualReality;
      case "laptop":
        return aiWindows;
      case "microchip":
        return aiChip;
      case "mobile":
        return aiSmartphone;
      case "server":
        return aiServer;
      case "tablet":
        return aiSmartphoneHinge;
      case "tv":
        return aiDisplayCam;
      case "cmd":
        return aiCode;
      default:
        return aiWindows;
    }
  }, []);

  return (
    <AmaranthIcon
      icon={icon}
      className={clsx(className)}
      sx={{ color: color ? platform.color : "inherit", fontSize: '1rem' }}
    />
  );
}
