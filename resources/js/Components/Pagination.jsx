import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/pro-regular-svg-icons';

export default function Pagination(pagination) {
    console.log(pagination.pagination)
    const { prev_page_url, next_page_url } = pagination.pagination;

    return (
        <nav aria-label="Pagination" className="d-flex justify-content-center">
            <ul className="pagination">
                <li className={clsx('page-item', 'me-2', { 'disabled': !prev_page_url })}><InertiaLink className="page-link rounded-pill" href={prev_page_url}><FontAwesomeIcon icon={faArrowLeft} fixedWidth /> Previous</InertiaLink></li>
                <li className={clsx('page-item', { 'disabled': !next_page_url })}><InertiaLink className="page-link rounded-pill" href={next_page_url}>Next <FontAwesomeIcon icon={faArrowRight} fixedWidth /></InertiaLink></li>
            </ul>
        </nav>
    );
};