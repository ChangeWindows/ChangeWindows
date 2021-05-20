import React, { useMemo } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import PlatformIcon from '../Platforms/PlatformIcon';
import clsx from 'clsx';

export default function Launch({ platform, version, url = null, overview = false }) {
    const Component = useMemo(() => (url ? InertiaLink : 'div'), ['url']);
    const mainProps = useMemo(() => ({ href: url }), ['url']);

    return (
        <Component {...mainProps} className="event text-white" style={{ background: platform.color}}>
            <div className="icon">
                <PlatformIcon platform={platform} />
            </div>
            <div className="revision">Version <span className="fw-bold">{version}</span> is now flighting</div>
            <div className={clsx('version', { 'd-none': overview, 'd-sm-block': overview })}>{version}</div>
        </Component>
    );
};