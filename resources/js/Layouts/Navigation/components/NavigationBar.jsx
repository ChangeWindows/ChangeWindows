import React, { useMemo, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

/* -- Design -- */
import NavigationItem from './NavigationItem';

import AmaranthIcon, { aiArrowRightFromBracket, aiArrowRightToBracket, aiEllipsis, aiGear } from '@changewindows/amaranth';

/* -- Utilities -- */
import useMediaQuery from '../../../hooks/useMediaQuery';
import useWidth from '../../../hooks/useWidth';
import clsx from 'clsx';

export default function NavigationBar({ main, overflow, socials }) {
	const matchesSmUp = useMediaQuery('(min-width: 576px)');
	const ref = useRef(null);
	const width = useWidth(ref);
	const page = usePage();
  const { auth } = usePage().props;

	const [mainItems, overflowItems] = useMemo(() => {
		const maxVisibleItems = Math.floor(width / 65);
		let navigationItems = main.filter((item) => item.permission === true || item.permission === undefined);
		let navigationOverflowItems = overflow.filter((item) => item.permission === true || item.permission === undefined);

		if (!matchesSmUp) {
			const mainNav = navigationItems.slice(0, maxVisibleItems - 1);
			let overflowNav = [...navigationItems.slice(maxVisibleItems - 1), ...navigationOverflowItems];

			if (mainNav.length < navigationItems.length) {
				overflowNav = [...navigationItems.slice(maxVisibleItems - 1), { type: 'divider' }, ...navigationOverflowItems];
			}

			return [mainNav, overflowNav];
		}

		return [[...navigationItems, ...navigationOverflowItems], []]
	}, [main, overflow, matchesSmUp, width]);

	const overflowIsActive = useMemo(() => {
		const overflowUrls = ['/settings'];
		overflowItems.filter((item) => item.type === 'link').map((item) => overflowUrls.push(item.url));

		return !!overflowUrls.find((url) => page.url.includes(url));
	}, [overflowItems]);

	return (
		<div className="sidebar" ref={ref}>
			{mainItems.map((item, key) => {
				if (item.type === 'link') {
					return (
						<NavigationItem url={item.url} icon={item.icon} primary={item.primary} title={item.title} key={key} />
					);
				} else if (item.type === 'external') {
					return (
						<NavigationItem url={item.url} icon={item.icon} primary={item.primary} title={item.title} key={key} external />
					);
				} else if (item.type === 'divider') {
					return (<div className="sidebar-divider" key={key} />);
				}
			})}
			{!matchesSmUp &&
				<>
					<a className={clsx('sidebar-item dropdown', { 'active': overflowIsActive })} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						<AmaranthIcon icon={aiEllipsis} />
						<span className="sidebar-label">
							More
						</span>
					</a>

					<ul className="dropdown-menu">
						{overflowItems.map((item, key) => {
							const Component = item.type === 'external' ? 'a' : InertiaLink;
							const mainProps = item.type === 'external' ? { target: '_blank' } : {};

							if (item.type === 'link') {
								return (
									<Component
										{...mainProps}
										key={key}
										href={`${item.url}${item.primary ?? ''}`}
										className={clsx('dropdown-item', { 'active': page.url.includes(item.url) })}
									>
										<AmaranthIcon icon={item.icon} /> {item.title}
									</Component>
								);
							} else if (item.type === 'external') {
								return (
									<Component
										{...mainProps}
										key={key}
										href={`${item.url}${item.primary ?? ''}`}
										className={clsx('dropdown-item', { 'active': page.url.includes(item.url) })}
									>
										<AmaranthIcon icon={item.icon} /> {item.title}
									</Component>
								);
							} else if (item.type === 'divider') {
								return (<div className="dropdown-divider" key={key} />);
							}
						})}
					</ul>
				</>
			}

			{matchesSmUp &&
				<>
					<div className="flex-grow-1 d-none d-sm-block" />
					{socials.map((item, key) => (
						<NavigationItem url={item.url} icon={item.icon} primary={item.primary} title={item.title} key={key} external />
					))}
				</>
			}
		</div>
	);
}