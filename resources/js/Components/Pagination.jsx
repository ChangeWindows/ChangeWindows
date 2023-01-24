import React from 'react';
import { Link } from '@inertiajs/react';

import clsx from 'clsx';
import AmaranthIcon, { aiArrowLeft, aiArrowRight } from '@changewindows/amaranth';

export default function Pagination({ pagination }) {
  if (pagination.links.length <= 3) return;

  return (
    <nav aria-label="Pagination" className="d-flex justify-content-center">
      <ul className="pagination">
        {pagination.links.map((link, key) => {
          if (link.label.includes('Previous')) {
            return (
              <li className={clsx('page-item d-none d-md-inline-block', { 'active': link.active, 'disabled': !link.url })} key={key}>
                <Link className="page-link" href={link.url}><AmaranthIcon icon={aiArrowLeft} /></Link>
              </li>
            );
          } else if (link.label.includes('Next')) {
            return (
              <li className={clsx('page-item d-none d-md-inline-block', { 'active': link.active, 'disabled': !link.url })} key={key}>
                <Link className="page-link" href={link.url}><AmaranthIcon icon={aiArrowRight} /></Link>
              </li>
            );
          } else if (link.label === '...') {
            return (
              <li className={clsx('page-item', { 'active': link.active, 'disabled': !link.url })} key={key}>
                <div className="pagination-divider" />
              </li>
            );
          } else {
            return (
              <li className={clsx('page-item', { 'active': link.active, 'disabled': !link.url })} key={key}>
                <Link className="page-link" href={link.url}>{link.label}</Link>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};
