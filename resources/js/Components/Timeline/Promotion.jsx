import React, { useMemo } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCode, faCompactDisc, faDesktop, faGamepadModern, faHeadSideGoggles, faLaptop, faMobile, faServer, faTablet, faTv } from '@fortawesome/pro-regular-svg-icons';

export default function Promotion({ platform, version, channel  }) {
    const [icon] = useMemo(() => {
        switch(platform) {
            case 'pc':
                return [faLaptop];
            case 'mobile':
                return [faMobile];
            case 'xbox':
                return [faGamepadModern];
            case 'server':
                return [faServer];
            case 'holographic':
                return [faHeadSideGoggles];
            case '10x':
                return [faTablet];
            case 'team':
                return [faTv];
            case 'azure':
                return [faCloud];
            case 'sdk':
                return [faCode];
            case 'iso':
                return [faCompactDisc];
            default:
                return [faDesktop];
        }
    });

    return (
        <div className="promotion">
            <div className={`promotion-icon color-${platform}`}>
                <FontAwesomeIcon icon={icon} fixedWidth />
            </div>
            <div className="promotion-version">Version {version} has been promoted to <span className={clsx('badge', `bg-${channel.class}`)}>{channel.name}</span></div>
        </div>
    )
};