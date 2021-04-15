import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import NavigationBar from './components/NavigationBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSunHaze, faListTimeline, faLaptopMobile, faFlag, faCircleInfo, faGauge } from '@fortawesome/pro-regular-svg-icons';

export default function Navigation({ can, auth }) {
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
                    { type: 'link', url: '/timeline', icon: faListTimeline, title: 'Timeline' },
                    { type: 'link', url: '/platforms', primary: '/pc', icon: faLaptopMobile, title: 'Platforms' },
                    { type: 'link', url: '/releases', icon: faFlag, title: 'Releases' },
                    { type: 'divider', permission: can.access_dashboard },
                    { type: 'link', url: '/admin/flights', icon: faGauge, title: 'Backstage', permission: can.access_dashboard },
                    { type: 'divider' },
                    { type: 'link', url: '/about', icon: faCircleInfo, title: 'About' }
                ]}
            />
        </>
    )
}