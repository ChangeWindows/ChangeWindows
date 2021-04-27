import React, { useMemo } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import PlatformIcon from '../Platforms/PlatformIcon';

export default function Launch({ platform, version, url = null }) {
    const Component = useMemo(() => (url ? InertiaLink : 'div'), ['url']);
    const mainProps = useMemo(() => ({ href: url }), ['url']);

    return (
        <Component {...mainProps} className="release text-white" style={{ background: platform.color}}>
            <div className="release-icon">
                <PlatformIcon platform={platform} />
            </div>
            <div className="release-flight">Version <span className="fw-bold">{version}</span> is now flighting</div>
            <div className="release-version">{version}</div>
        </Component>
    );
};