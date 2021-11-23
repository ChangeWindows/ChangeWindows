import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import clsx from 'clsx';
import AmaranthIcon, { aiArrowLeft, aiArrowRight } from '@changewindows/amaranth';

export default function Pagination({ pagination }) {
  return (
    <nav aria-label="Pagination" className="d-flex justify-content-center">
      <ul className="pagination">
        {pagination.links.map((link, key) => {
          if (link.label.includes('Previous')) {
            return (
              <li className={clsx('page-item', { 'active': link.active, 'disabled': !link.url })} key={key}>
                <InertiaLink className="page-link" href={link.url}><AmaranthIcon icon={aiArrowLeft} /></InertiaLink>
              </li>
            );
          } else if (link.label.includes('Next')) {
            return (
              <li className={clsx('page-item', { 'active': link.active, 'disabled': !link.url })} key={key}>
                <InertiaLink className="page-link" href={link.url}><AmaranthIcon icon={aiArrowRight} /></InertiaLink>
              </li>
            );
          } else {
            return (
              <li className={clsx('page-item', { 'active': link.active, 'disabled': !link.url })} key={key}>
                <InertiaLink className="page-link" href={link.url}>{link.label}</InertiaLink>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};