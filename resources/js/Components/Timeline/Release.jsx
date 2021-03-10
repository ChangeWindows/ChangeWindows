import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCode, faCompactDisc, faDesktop, faGamepadModern, faHeadSideGoggles, faLaptop, faMicrochip, faMobile, faServer, faTablet, faTv } from '@fortawesome/pro-regular-svg-icons';

export default function Release({ platform, version  }) {
    const [name, icon] = useMemo(() => {
        switch(platform) {
            case 'pc':
                return ['PC', faLaptop];
            case 'mobile':
                return ['Mobile', faMobile];
            case 'xbox':
                return ['Xbox', faGamepadModern];
            case 'server':
                return ['Server', faServer];
            case 'iot':
                return ['IoT', faMicrochip];
            case '10x':
                return ['Holographic', faHeadSideGoggles];
            case '10x':
                return ['10X', faTablet];
            case 'team':
                return ['Team', faTv];
            case 'azure':
                return ['Azure', faCloud];
            case 'sdk':
                return ['SDK', faCode];
            case 'iso':
                return ['ISO', faCompactDisc];
            default:
                return ['Windows', faDesktop];
        }
    });

    return (
        <div className={`release text-white bg-${platform}`}>
            <div className="release-icon"><FontAwesomeIcon icon={icon} fixedWidth /></div>
            <div className="release-version">{name} <span className="fw-bold">version {version}</span> has entered public testing</div>
        </div>
    );
};