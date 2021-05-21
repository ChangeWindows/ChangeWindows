import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import NavigationBar from './components/NavigationBar';

import { faBarsStaggered, faLaptopMobile, faGauge, faCodeBranch, faBullhorn } from '@fortawesome/pro-regular-svg-icons';
import { faPatreon, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Navigation() {
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
                main={[
                    { type: 'link', url: '/timeline', icon: faBarsStaggered, title: 'Timeline' },
                    { type: 'link', url: '/platforms', primary: '/pc', icon: faLaptopMobile, title: 'Platforms' },
                    { type: 'link', url: '/channels', icon: faCodeBranch, title: 'Channels' }
                ]}
                overflow={[
                    { type: 'external', url: 'https://medium.com/changewindows', icon: faBullhorn, title: 'Blog' },
                    { type: 'link', url: '/admin/flights', icon: faGauge, title: 'Backstage', permission: nav_can.access_dashboard },
                    { type: 'divider' },
                    { type: 'socials' },
                ]}
                socials={[
                    { type: 'external', url: 'https://twitter.com/changewindows', icon: faTwitter, title: 'Twitter' },
                    { type: 'external', url: 'https://patreon.com/changewindows', icon: faPatreon, title: 'Sponsor us' }
                ]}
            />
        </>
    )
}