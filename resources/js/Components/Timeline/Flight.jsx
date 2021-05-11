import React, { useMemo } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import PlatformIcon from '../Platforms/PlatformIcon';

export default function Flight({ platform, build, channels, version = null, pack = null, url = null }) {
    const Component = useMemo(() => (url ? InertiaLink : 'div'), ['url']);
    const mainProps = useMemo(() => ({ href: url }), ['url']);

    return (
        <Component {...mainProps} className="flight">
            <div className="flight-icon">
                <PlatformIcon platform={platform} color />
            </div>
            <div className="flight-build">{build}</div>
            <div className="flight-channels">
                {channels.map((channel, key) => (
                    <span key={key} className="badge me-1" style={{ backgroundColor: channel.color }}>{channel.name}</span>
                ))}
            </div>
            <div className="flight-version text-muted">{platform.tool ? null : version ?? pack}</div>
        </Component>
    );
};