import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

export default function NavigationItem({ title, url, icon }) {
    const page = usePage();

    return (
        <InertiaLink
            href={url}
            className={clsx('sidebar-item', { 'active': page.url.includes(url)})}
        >
            <FontAwesomeIcon icon={icon} fixedWidth /> <span className="sidebar-label">{title}</span>
        </InertiaLink>
    )
}