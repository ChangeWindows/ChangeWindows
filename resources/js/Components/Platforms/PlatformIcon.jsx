import React, { useMemo } from "react";
import clsx from "clsx";

import AmaranthIcon, {
  aiAzure,
  aiMicrochip,
  aiTerminal,
  aiVisualStudio,
  aiCompactDisc,
  aiSmartphoneHinge,
  aiXbox,
  aiVirtualReality,
  aiLaptop,
  aiSmartphone,
  aiServer,
  aiDisplayCam,
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
        return aiCompactDisc;
      case "gamepad-modern":
        return aiXbox;
      case "head-side-goggles":
        return aiVirtualReality;
      case "laptop":
        return aiLaptop;
      case "microchip":
        return aiMicrochip;
      case "mobile":
        return aiSmartphone;
      case "server":
        return aiServer;
      case "tablet":
        return aiSmartphoneHinge;
      case "tv":
        return aiDisplayCam;
      case "cmd":
        return aiTerminal;
      default:
        return aiWindows;
    }
  }, []);

  return (
    <AmaranthIcon
      icon={icon}
      className={clsx(className)}
      style={{ color: color ? platform.color : "inherit" }}
    />
  );
}
