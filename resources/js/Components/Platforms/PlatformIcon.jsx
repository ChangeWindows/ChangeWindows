import React, { useMemo } from 'react';
import clsx from 'clsx';

import { faCloud, faCode, faCompactDisc, faGamepadModern, faHeadSideGoggles, faLaptop, faMicrochip, faMobile, faServer, faTablet, faTv } from '@fortawesome/pro-regular-svg-icons';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PlatformIcon({ platform, color = false, className = null }) {
    const icon = useMemo(() => {
        switch (platform.icon) {
            case 'cloud':               return faCloud;
            case 'code':                return faCode;
            case 'compact-disc':        return faCompactDisc;
            case 'gamepad-modern':      return faGamepadModern;
            case 'head-side-goggles':   return faHeadSideGoggles;
            case 'laptop':              return faLaptop;
            case 'microchip':           return faMicrochip;
            case 'mobile':              return faMobile;
            case 'server':              return faServer;
            case 'tablet':              return faTablet;
            case 'tv':                  return faTv;
            default:                    return faWindows;
        }
    }, []);

    return (
        <FontAwesomeIcon icon={icon} fixedWidth className={clsx(className)} style={{ color: color ? platform.color : 'inherit' }} />
    );
};