import React, { useMemo } from 'react';
import clsx from 'clsx';

import AmaranthIcon, { aiCloud, aiMicrochip, aiCli, aiCode, aiDisc, aiFoldable, aiGamepad, aiVirtualReality, aiLaptop, aiMobile, aiServer, aiTelevision } from '@changewindows/amaranth';

export default function PlatformIcon({ platform, color = false, className = null }) {
    const icon = useMemo(() => {
        switch (platform.icon) {
            case 'cloud':               return aiCloud;
            case 'code':                return aiCode;
            case 'compact-disc':        return aiDisc;
            case 'gamepad-modern':      return aiGamepad;
            case 'head-side-goggles':   return aiVirtualReality;
            case 'laptop':              return aiLaptop;
            case 'microchip':           return aiMicrochip;
            case 'mobile':              return aiMobile;
            case 'server':              return aiServer;
            case 'tablet':              return aiFoldable;
            case 'tv':                  return aiTelevision;
            case 'cmd':                 return aiCli;
            default:                    return aiLaptop;
        }
    }, []);

    return (
        <AmaranthIcon icon={icon} className={clsx(className)} style={{ color: color ? platform.color : 'inherit' }} />
    );
};