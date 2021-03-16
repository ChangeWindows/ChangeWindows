import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSunHaze, faCircleInfo, faArrowRightFromBracket, faUsers, faUserTag, faArrowLeft } from '@fortawesome/pro-regular-svg-icons';

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
                <InertiaLink href="/timeline" className="sidebar-item d-none d-sm-flex">
                    <FontAwesomeIcon icon={faArrowLeft} fixedWidth /> <span className="sidebar-label">Back</span>
                </InertiaLink>

                <div className="my-2 border-bottom" />

                <InertiaLink href="/admin/users" className="sidebar-item">
                    <FontAwesomeIcon icon={faUsers} fixedWidth /> <span className="sidebar-label">Users</span>
                </InertiaLink>

                <InertiaLink href="/admin/roles" className="sidebar-item">
                    <FontAwesomeIcon icon={faUserTag} fixedWidth /> <span className="sidebar-label">Roles</span>
                </InertiaLink>
                
                <div className="my-2 border-bottom" />

                <InertiaLink href="/about" className="sidebar-item">
                    <FontAwesomeIcon icon={faCircleInfo} fixedWidth /> <span className="sidebar-label">About</span>
                </InertiaLink>

                <div className="flex-grow-1 d-none d-sm-block" />

                <form onSubmit={handleLogout} className="d-none d-sm-block">
                    <button type="submit" className="sidebar-item">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} fixedWidth /> <span className="sidebar-label">Log out</span>
                    </button>
                </form>
            </div>
        </>
    )
}