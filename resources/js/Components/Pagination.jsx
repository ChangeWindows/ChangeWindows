import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import clsx from 'clsx';
import AmaranthIcon, { aiArrowLeft, aiArrowRight } from '@changewindows/amaranth';

export default function Pagination(props) {
    const prev_page_url = props.pagination.prev_page_url ?? '';
    const next_page_url = props.pagination.next_page_url ?? '';

    return (
        <nav aria-label="Pagination" className="d-flex justify-content-center">
            <ul className="pagination">
                <li className={clsx('page-item', 'me-2', { 'disabled': !prev_page_url })}><InertiaLink className="page-link rounded-pill" href={prev_page_url}><AmaranthIcon icon={aiArrowLeft} /> Previous</InertiaLink></li>
                <li className={clsx('page-item', { 'disabled': !next_page_url })}><InertiaLink className="page-link rounded-pill" href={next_page_url}>Next <AmaranthIcon icon={aiArrowRight} /></InertiaLink></li>
            </ul>
        </nav>
    );
};