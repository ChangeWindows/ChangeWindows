import React, { useMemo, useRef, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

/* -- Design -- */
import NavigationItem from './NavigationItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faArrowRightFromBracket, faCircleUser, faArrowRightToBracket, faGear } from '@fortawesome/pro-regular-svg-icons';

/* -- Utilities -- */
import useMediaQuery from '../../../hooks/useMediaQuery';
import useWidth from '../../../hooks/useWidth';
import clsx from 'clsx';

export default function NavigationBar({ auth, main, overflow, socials }) {
	const matchesSmUp = useMediaQuery('(min-width: 576px)');
	const ref = useRef(null);
	const width = useWidth(ref);
    const page = usePage();

	const [mainItems, overflowItems] = useMemo(() => {
		const maxVisibleItems = Math.floor(width / 65);
		let navigationItems = main.filter((item) => item.permission === true || item.permission === undefined);
		let navigationOverflowItems = overflow.filter((item) => item.permission === true || item.permission === undefined);

		if (!matchesSmUp) {
			const mainNav = navigationItems.slice(0, maxVisibleItems - 1);
			let overflowNav = [...navigationItems.slice(maxVisibleItems - 1), ...navigationOverflowItems];

			console.log(mainNav.length, navigationItems.length);

			if (mainNav.length < navigationItems.length) {
				overflowNav = [...navigationItems.slice(maxVisibleItems - 1), { type: 'divider' }, ...navigationOverflowItems];
			}

			return [mainNav, overflowNav];
		}

		return [[...navigationItems, { type: 'divider' }, ...navigationOverflowItems], []]
	}, [main, overflow, matchesSmUp, width]);

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
				} else if (item.type === 'external') {
					return (
						<NavigationItem url={item.url} icon={item.icon} primary={item.primary} title={item.title} key={key} external />
					);
				} else if (item.type === 'socials') {
					return (
						<div className="d-flex flex-row flex-sm-column flex-lg-row">
							{socials.map((social, key) => (
								<NavigationItem url={social.url} icon={social.icon} primary={social.primary} title={social.title} key={key} external small />
							))}
						</div>
					);
				} else if (item.type === 'divider') {
					return (<div className="my-2 border-bottom" key={key} />);
				}
			})}
			{(!matchesSmUp) &&
				<>
					<a className="sidebar-item dropdown" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						<FontAwesomeIcon icon={faEllipsis} fixedWidth />
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
										className={clsx('dropdown-item', { 'active': page.url.includes(item.url)})}
									>
										<FontAwesomeIcon icon={item.icon} fixedWidth /> {item.title}
									</Component>
								);
							} else if (item.type === 'external') {
								return (
									<Component
										{...mainProps}
										key={key}
										href={`${item.url}${item.primary ?? ''}`}
										className={clsx('dropdown-item', { 'active': page.url.includes(item.url)})}
									>
										<FontAwesomeIcon icon={item.icon} fixedWidth /> {item.title}
									</Component>
								);
							} else if (item.type === 'socials') {
								return socials.map((social, key) => (
									<Component
										{...mainProps}
										key={key}
										href={`${social.url}${social.primary ?? ''}`}
										className={clsx('dropdown-item', { 'active': page.url.includes(social.url)})}
									>
										<FontAwesomeIcon icon={social.icon} fixedWidth /> {social.title}
									</Component>
								));
							} else if (item.type === 'divider') {
								return (<div className="dropdown-divider" key={key} />);
							}
						})}
						<div className="dropdown-divider" />
						{auth ?
							<>
								<InertiaLink href="/settings" className="dropdown-item" >
									<FontAwesomeIcon icon={faGear} fixedWidth /> Settings
								</InertiaLink>
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
							<>
								<InertiaLink href="/settings" className="dropdown-item" >
									<FontAwesomeIcon icon={faGear} fixedWidth /> Settings
								</InertiaLink>
								<InertiaLink href="/login" className="dropdown-item" >
									<FontAwesomeIcon icon={faArrowRightToBracket} fixedWidth /> Sign-in
								</InertiaLink>
							</>
						}
					</ul>
				</>
			}
			
			<div className="flex-grow-1 d-none d-sm-block" />

			{auth ?
				<>
					<NavigationItem url="/settings" icon={faGear} title="Settings" />
					<NavigationItem url="/profile" icon={faCircleUser} title={auth.name} />
					<form onSubmit={handleLogout} className="d-none d-sm-block">
						<button type="submit" className="sidebar-item">
							<FontAwesomeIcon icon={faArrowRightFromBracket} fixedWidth /> <span className="sidebar-label">Log out</span>
						</button>
					</form>
				</>
			:
				<>
					<NavigationItem url="/settings" icon={faGear} title="Settings" />
					<InertiaLink href="/login" className="sidebar-item" >
						<FontAwesomeIcon icon={faArrowRightToBracket} fixedWidth /> <span className="sidebar-label">Sign-in</span>
					</InertiaLink>
				</>
			}
		</div>
	);
}