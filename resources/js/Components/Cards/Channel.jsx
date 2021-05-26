import React, { useMemo } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import clsx from 'clsx';

export default function Channel({ date, build, channel, disabled = false, url = null }) {
    const Component = useMemo(() => (url ? InertiaLink : 'div'), ['url']);
    const mainProps = useMemo(() => ({ href: url }), ['url']);

    return (
        <div className="col">
            <Component {...mainProps} className={clsx('channel', 'card', { 'channel-disabled': disabled })}>
                <div className="channel-name" style={{ color: channel.color }}>{channel.name}</div>
                <div className="channel-build">{build || 'No flight'}</div>
                <div className="flex-grow-1" />
                <div className="channel-date">{date || 'No date'}</div>
            </Component>
        </div>
    );
};