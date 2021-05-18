import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';

/* -- Utilities -- */

export default function Navigation({ back = false, children, actions = false }) {
    return (
        <nav className="navbar navbar-expand-xl navbar-light sticky-top">
            <div className="container flex-nowrap">
                {!!back &&
                    <InertiaLink href={back} className="btn btn-transparent btn-sm me-2 flex-shrink-0">
                        <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                    </InertiaLink>
                }
                <span className="navbar-brand text-wrap">
                    {children}
                </span>
                <div className="flex-grow-1" />
                <div className="flex-shrink-0 nav-actions d-flex flex-row">
                    {actions}
                </div>
            </div>
        </nav>
    )
}