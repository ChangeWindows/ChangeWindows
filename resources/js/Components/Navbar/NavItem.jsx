import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import clsx from 'clsx';

export default function NavItem({ children, url }) {
    const page = usePage();

    console.log(page, url);

    return (
        <li className="nav-item" >
            <InertiaLink 
                className={clsx('nav-link', { 'active': page.url.includes(url)})}
                href={url}
            >
                {children}
            </InertiaLink>
        </li>
    )
}