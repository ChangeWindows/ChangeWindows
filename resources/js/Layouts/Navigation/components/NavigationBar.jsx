import React, { useMemo, useRef, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

/* -- Design -- */
import NavigationItem from './NavigationItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faArrowRightFromBracket, faCircleUser, faArrowRightToBracket } from '@fortawesome/pro-regular-svg-icons';

/* -- Utilities -- */
import useMediaQuery from '../../../hooks/useMediaQuery';
import useWidth from '../../../hooks/useWidth';
import clsx from 'clsx';

export default function NavigationBar({ auth, items }) {
	const matchesSmUp = useMediaQuery('(min-width: 576px)');
	const ref = useRef(null);
	const width = useWidth(ref);
    const page = usePage();

	const [showAuthOnMainBar, setShowAuthOnMainBar] = useState(true);

	const [mainItems, overflowItems] = useMemo(() => {
		const maxVisibleItems = Math.floor(width / 60);

		if (items.length > maxVisibleItems && !matchesSmUp) {
			items = items.filter((item) => item.type !== 'divider' && !item.ignore && (item.permission === true || item.permission === undefined));

			setShowAuthOnMainBar(items.length < 3);

			const main = items.slice(0, maxVisibleItems - 1);
			const overflow = items.slice(maxVisibleItems - 1);

			return [main, overflow];
		}

		return [items, []]
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
						<NavigationItem url={item.url} icon={item.icon} primary={item.primary} title={item.title} key={key} />
					);
				} else if (item.type === 'divider') {
					return (<div className="my-2 border-bottom" key={key} />);
				}
			})}
			{((overflowItems?.length >= 1 || !showAuthOnMainBar) && !matchesSmUp) &&
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
								className={clsx('dropdown-item', { 'active': page.url.includes(item.url)})}
							>
								<FontAwesomeIcon icon={item.icon} fixedWidth /> {item.title}
							</InertiaLink>
						))}
						{!showAuthOnMainBar &&
							<>
								{auth ?
									<>
										<InertiaLink href="/profile" className="dropdown-item" >
											<FontAwesomeIcon icon={faCircleUser} fixedWidth /> {auth.name}
										</InertiaLink>
										<form onSubmit={handleLogout}>
											<button type="submit" className="dropdown-item">
												<FontAwesomeIcon icon={faArrowRightFromBracket} fixedWidth /> Log out
											</button>
										</form>
									</>
								:
									<InertiaLink href="/login" className="dropdown-item" >
										<FontAwesomeIcon icon={faArrowRightToBracket} fixedWidth /> Sign-in
									</InertiaLink>
								}
							</>
						}
					</ul>
				</>
			}

			{showAuthOnMainBar &&
				<>
					<div className="flex-grow-1 d-none d-sm-block" />

					{auth ?
						<>
							<NavigationItem url="/profile" icon={faCircleUser} title={auth.name} />
							<form onSubmit={handleLogout} className="d-none d-sm-block">
								<button type="submit" className="sidebar-item">
									<FontAwesomeIcon icon={faArrowRightFromBracket} fixedWidth /> <span className="sidebar-label">Log out</span>
								</button>
							</form>
						</>
					:
						<InertiaLink href="/login" className="sidebar-item" >
							<FontAwesomeIcon icon={faArrowRightToBracket} fixedWidth /> <span className="sidebar-label">Sign-in</span>
						</InertiaLink>
					}
				</>
			}
		</div>
	);
}