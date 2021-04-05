import clsx from 'clsx';
import React from 'react';

import PlatformIcon from '../Platforms/PlatformIcon';

export default function Flight({ platform, build, channels, version = null, component = null }) {
    return (
        <div className="flight">
            <div className="flight-icon">
                <PlatformIcon platform={platform} color />
            </div>
            <div className="flight-build">{build}</div>
            <div className="flight-channels">
                {channels.map((channel, key) => (
                    <span key={key} className="badge me-1" style={{ backgroundColor: channel.color }}>{channel.name}</span>
                ))}
            </div>
            <div className={clsx('flight-version', { 'text-muted': component })}>{version ?? component}</div>
        </div>
    );
};