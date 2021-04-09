import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import NavigationBar from './components/NavigationBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSunHaze, faFlag, faCircleInfo, faUser, faUserUnlock, faArrowLeft, faLaptopMobile, faPlane } from '@fortawesome/pro-regular-svg-icons';

export default function AdminNavigation({ can, auth }) {
    return (
        <>
            <nav className="navbar navbar-expand-xs navbar-light sticky-top">
                <div className="container-fluid">
                    <InertiaLink className="navbar-brand" href="/">
                        <div className="app-icon"><FontAwesomeIcon icon={faSunHaze} fixedWidth /></div>
                        <span className="brand-label fw-bold">ChangeWindows</span>
                    </InertiaLink>
                </div>
            </nav>

            <NavigationBar
                auth={auth}
                items={[
                    { type: 'link', url: '/timeline', icon: faArrowLeft, title: 'Back' },
                    { type: 'divider' },
                    { type: 'link', url: '/admin/flights', icon: faPlane, title: 'Flights' },
                    { type: 'link', url: '/admin/releases', icon: faFlag, title: 'Releases' },
                    { type: 'link', url: '/admin/platforms', icon: faLaptopMobile, title: 'Platforms' },
                    { type: 'divider' },
                    { type: 'link', url: '/admin/users', icon: faUser, title: 'Users' },
                    { type: 'link', url: '/admin/roles', icon: faUserUnlock, title: 'Roles' },
                    { type: 'divider' },
                    { type: 'link', url: '/about', icon: faCircleInfo, title: 'About' }
                ]}
            />
        </>
    )
}