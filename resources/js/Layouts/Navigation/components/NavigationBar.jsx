import React, { useMemo, useRef } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

/* -- Design -- */
import NavigationItem from './NavigationItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faArrowRightFromBracket } from '@fortawesome/pro-regular-svg-icons';

/* -- Utilities -- */
import useMediaQuery from '../../../hooks/useMediaQuery';
import useWidth from '../../../hooks/useWidth';
import clsx from 'clsx';

export default function NavigationBar({ items }) {
	const matchesSmUp = useMediaQuery('(min-width: 576px)');
	const ref = useRef(null);
	const width = useWidth(ref);
    const page = usePage();

	const [mainItems, overflowItems] = useMemo(() => {
		const maxVisibleItems = Math.floor(width / 80);

		if (items.length > maxVisibleItems && !matchesSmUp) {
			items = items.filter((item) => item.type !== 'divider');

			const main = items.slice(0, maxVisibleItems - 1);
			const overflow = items.slice(maxVisibleItems - 1);

			return [main, overflow];
		}

		return [items, null]
	}, [items, matchesSmUp, width]);

    function handleLogout(e) {
        e.preventDefault();
        Inertia.post('/logout');
    }

	return (
		<div className="sidebar" ref={ref}>
			{mainItems.map((item, key) => {
				if (item.type === 'link') {
					return (
						<NavigationItem url={item.url} icon={item.icon} title={item.title} key={key} />
					);
				} else if (item.type === 'divider') {
					return (<div className="my-2 border-bottom" />);
				}
			})}
			{overflowItems &&
				<>
					<a className="sidebar-item dropdown" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						<FontAwesomeIcon icon={faEllipsis} fixedWidth />
						<span className="sidebar-label">
							More
						</span>
					</a>

					<ul className="dropdown-menu">
						{overflowItems.map((item, key) => (
							<InertiaLink
								key={key}
								href={`${item.url}${item.primary ?? ''}`}
								className={clsx('sidebar-item', { 'active': page.url.includes(item.url)})}
							>
								<FontAwesomeIcon icon={item.icon} fixedWidth /> <span className="sidebar-label">{item.title}</span>
							</InertiaLink>
						))}
					</ul>
				</>
			}

			<div className="flex-grow-1 d-none d-sm-block" />

			<form onSubmit={handleLogout} className="d-none d-sm-block">
				<button type="submit" className="sidebar-item">
					<FontAwesomeIcon icon={faArrowRightFromBracket} fixedWidth /> <span className="sidebar-label">Log out</span>
				</button>
			</form>
		</div>
	);
}