import React, { useMemo } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

export default function NavigationItem({ title, url, icon, primary, external = false }) {
    const page = usePage();

    const Component = useMemo(() => (external ? 'a' : InertiaLink), ['external']);
    const mainProps = useMemo(() => (external ? { target: '_blank' } : {}), ['external']);

    return (
        <Component
            {...mainProps}
            href={`${url}${primary ?? ''}`}
            className={clsx('sidebar-item', { 'active': page.url.includes(url)})}
        >
            <FontAwesomeIcon icon={icon} fixedWidth /> <span className="sidebar-label">{title}</span>
        </Component>
    )
}