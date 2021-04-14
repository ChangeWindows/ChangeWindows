import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import clsx from 'clsx';

export default function DropdownItem({ children, url }) {
    const page = usePage();

    return (
        <li>
            <InertiaLink
                className={clsx('dropdown-item', { 'active': page.url.includes(url)})}
                href={url}
            >
                {children}
            </InertiaLink>
        </li>
    )
}