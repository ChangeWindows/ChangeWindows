import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'

import NavigationBar from './components/NavigationBar';

import { faFlag, faCircleInfo, faUser, faUserUnlock, faArrowLeft, faLaptopMobile, faPlane, faUnlockKeyhole, faRocketLaunch, faAnglesUp, faCubes } from '@fortawesome/pro-regular-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function AdminNavigation() {
    const { auth, nav_can, app } = usePage().props;

    return (
        <>
            <nav className="navbar navbar-expand-xs navbar-light sticky-top">
                <div className="container-fluid">
                    <InertiaLink className="navbar-brand" href="/">
                        <div className="app-icon">
                            <img src={app.preview ? '/images/logo-preview-light.svg' : '/images/logo-light.svg'} width="16px" height="16px" />
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
                    { type: 'link', url: '/admin/flights', icon: faPlane, title: 'Flights', permission: nav_can.show_flights },
                    { type: 'link', url: '/admin/promotions', icon: faAnglesUp, title: 'Promotions', permission: nav_can.show_flights },
                    { type: 'link', url: '/admin/launches', icon: faRocketLaunch, title: 'Launches', permission: nav_can.show_flights },
                    { type: 'link', url: '/admin/releases', icon: faFlag, title: 'Releases', permission: nav_can.show_releases },
                    { type: 'link', url: '/admin/packages', icon: faCubes, title: 'Packages', permission: nav_can.show_releases },
                    { type: 'link', url: '/admin/platforms', icon: faLaptopMobile, title: 'Platforms', permission: nav_can.show_platforms },
                    { type: 'divider' },
                    { type: 'link', url: '/admin/tweet_streams', icon: faTwitter, title: 'Twitter', permission: nav_can.show_tweet_streams },
                    { type: 'divider' },
                    { type: 'link', url: '/admin/users', icon: faUser, title: 'Users', permission: nav_can.show_users },
                    { type: 'link', url: '/admin/roles', icon: faUserUnlock, title: 'Roles', permission: nav_can.show_roles },
                    { type: 'link', url: '/admin/permissions', icon: faUnlockKeyhole, title: 'Permissions', permission: nav_can.show_permissions },
                    { type: 'divider' },
                    { type: 'link', url: '/about', icon: faCircleInfo, title: 'About' }
                ]}
            />
        </>
    )
}