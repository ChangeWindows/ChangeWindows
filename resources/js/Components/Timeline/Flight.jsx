import clsx from 'clsx';
import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCode, faCompactDisc, faDesktop, faGamepadModern, faHeadSideGoggles, faLaptop, faMobile, faServer, faTablet, faTv } from '@fortawesome/pro-regular-svg-icons';

export default function Flight({ platform, build, channels, version = null, component = null }) {
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
        <div className="flight">
            <div className={`flight-icon text-${platform}`}>
                <FontAwesomeIcon icon={icon} fixedWidth />
            </div>
            <div className="flight-build">{build}</div>
            <div className="flight-channels">
                {channels.map((channel, key) => (
                    <span key={key} className={clsx('badge me-1', `bg-${channel.class}`)}>{channel.name}</span>
                ))}
            </div>
            <div className={clsx('flight-version', { 'text-muted': component })}>{version ?? component}</div>
        </div>
    );
};