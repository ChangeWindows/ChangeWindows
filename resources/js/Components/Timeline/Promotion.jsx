import React, { useMemo } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import PlatformIcon from '../Platforms/PlatformIcon';

export default function Promotion({ platform, version, channel, url  }) {
    const Component = useMemo(() => (url ? InertiaLink : 'div'), ['url']);
    const mainProps = useMemo(() => ({ href: url }), ['url']);

    return (
        <Component {...mainProps} className="promotion">
            <div className="promotion-icon">
                <PlatformIcon platform={platform} color />
            </div>
            <div className="promotion-version">{platform.name} <span className="fw-bold">version {version}</span> has been promoted to <span className="badge me-1" style={{ backgroundColor: channel.color }}>{channel.name}</span></div>
        </Component>
    )
};