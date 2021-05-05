import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import NavigationBar from './components/NavigationBar';

import { faFlag, faCircleInfo, faUser, faUserUnlock, faArrowLeft, faLaptopMobile, faPlane, faUnlockKeyhole, faRocketLaunch, faAnglesUp, faCubes } from '@fortawesome/pro-regular-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function AdminNavigation({ can, auth }) {
    return (
        <>
            <nav className="navbar navbar-expand-xs navbar-light sticky-top">
                <div className="container-fluid">
                    <InertiaLink className="navbar-brand" href="/">
                        <div className="app-icon">
                            <img src="/images/logo-light.svg" width="16px" height="16px" />
                        </div>
                        <span className="brand-label fw-bold">ChangeWindows</span>
                    </InertiaLink>
                </div>
            </nav>

            <NavigationBar
                auth={auth}
                items={[
                    { type: 'link', url: '/timeline', icon: faArrowLeft, title: 'Back', ignore: true },
                    { type: 'divider' },
                    { type: 'link', url: '/admin/flights', icon: faPlane, title: 'Flights' },
                    { type: 'link', url: '/admin/promotions', icon: faAnglesUp, title: 'Promotions' },
                    { type: 'link', url: '/admin/launches', icon: faRocketLaunch, title: 'Launches' },
                    { type: 'link', url: '/admin/releases', icon: faFlag, title: 'Releases' },
                    { type: 'link', url: '/admin/packages', icon: faCubes, title: 'Packages' },
                    { type: 'link', url: '/admin/platforms', icon: faLaptopMobile, title: 'Platforms' },
                    { type: 'divider' },
                    { type: 'link', url: '/admin/tweet_streams', icon: faTwitter, title: 'Twitter' },
                    { type: 'divider' },
                    { type: 'link', url: '/admin/users', icon: faUser, title: 'Users' },
                    { type: 'link', url: '/admin/roles', icon: faUserUnlock, title: 'Roles' },
                    { type: 'link', url: '/admin/permissions', icon: faUnlockKeyhole, title: 'Permissions' },
                    { type: 'divider' },
                    { type: 'link', url: '/about', icon: faCircleInfo, title: 'About' }
                ]}
            />
        </>
    )
}