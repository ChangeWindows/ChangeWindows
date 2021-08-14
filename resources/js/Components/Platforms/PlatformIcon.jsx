import React, { useMemo } from 'react';
import clsx from 'clsx';

import AmaranthIcon, { aiAzure, aiChip, aiCmd, aiCode, aiDisc, aiFoldable, aiGamepad, aiHolographic, aiLaptop, aiSmartphone, aiServer, aiScreenWebcam } from '@changewindows/amaranth';

export default function PlatformIcon({ platform, color = false, className = null }) {
    const icon = useMemo(() => {
        switch (platform.icon) {
            case 'cloud':               return aiAzure;
            case 'code':                return aiCode;
            case 'compact-disc':        return aiDisc;
            case 'gamepad-modern':      return aiGamepad;
            case 'head-side-goggles':   return aiHolographic;
            case 'laptop':              return aiLaptop;
            case 'microchip':           return aiChip;
            case 'mobile':              return aiSmartphone;
            case 'server':              return aiServer;
            case 'tablet':              return aiFoldable;
            case 'tv':                  return aiScreenWebcam;
            case 'cmd':                 return aiCmd;
            default:                    return aiLaptop;
        }
    }, []);

    return (
        <AmaranthIcon icon={icon} className={clsx(className)} style={{ color: color ? platform.color : 'inherit' }} />
    );
};