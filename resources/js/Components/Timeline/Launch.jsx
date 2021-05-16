import React, { useMemo } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import PlatformIcon from '../Platforms/PlatformIcon';
import clsx from 'clsx';

export default function Launch({ platform, version, url = null, overview = false }) {
    const Component = useMemo(() => (url ? InertiaLink : 'div'), ['url']);
    const mainProps = useMemo(() => ({ href: url }), ['url']);

    return (
        <Component {...mainProps} className="release text-white" style={{ background: platform.color}}>
            <div className="release-icon">
                <PlatformIcon platform={platform} />
            </div>
            <div className="release-flight">Version <span className="fw-bold">{version}</span> is now flighting</div>
            <div className={clsx('release-version', 'text-muted', { 'd-none': overview, 'd-sm-block': overview })}>{version}</div>
        </Component>
    );
};