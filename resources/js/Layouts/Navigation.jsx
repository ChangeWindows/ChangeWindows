import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSunHaze, faListTimeline, faLaptopMobile, faFlag, faCodeBranch, faCircleInfo, faArrowRightFromBracket } from '@fortawesome/pro-regular-svg-icons';

export default function Navigation() {
    function handleLogout(e) {
      e.preventDefault();
      Inertia.post('/logout');
    }

    return (
        <>
            <nav className="navbar navbar-expand-xs navbar-light sticky-top">
                <div className="container-fluid">
                    <InertiaLink className="navbar-brand" href="#">
                        <div className="app-icon"><FontAwesomeIcon icon={faSunHaze} fixedWidth /></div>
                        <span className="brand-label fw-bold">ChangeWindows</span>
                    </InertiaLink>
                </div>
            </nav>

            <div className="sidebar">
                <InertiaLink href="/timeline" className="sidebar-item ">
                    <FontAwesomeIcon icon={faListTimeline} fixedWidth /> <span className="sidebar-label">Timeline</span>
                </InertiaLink>

                <InertiaLink href="/platforms" className="sidebar-item">
                    <FontAwesomeIcon icon={faLaptopMobile} fixedWidth /> <span className="sidebar-label">Platforms</span>
                </InertiaLink>

                <InertiaLink href="/releases" className="sidebar-item">
                    <FontAwesomeIcon icon={faFlag} fixedWidth /> <span className="sidebar-label">Releases</span>
                </InertiaLink>

                <InertiaLink href="/timeline" className="sidebar-item">
                    <FontAwesomeIcon icon={faCodeBranch} fixedWidth /> <span className="sidebar-label">Channels</span>
                </InertiaLink>

                <hr />

                <InertiaLink href="/about" className="sidebar-item">
                    <FontAwesomeIcon icon={faCircleInfo} fixedWidth /> <span className="sidebar-label">About</span>
                </InertiaLink>

                <div className="flex-grow-1 d-none d-sm-block"></div>

                <form onSubmit={handleLogout} className="d-none d-sm-block">
                    <button type="submit" className="sidebar-item">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} fixedWidth /> <span className="sidebar-label">Log out</span>
                    </button>
                </form>
            </div>
        </>
    )
}