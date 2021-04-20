import React, { Fragment } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';
import DropdownItem from '../../Components/Navbar/DropdownItem';
import NavItem from '../../Components/Navbar/NavItem';

import PlatformIcon from '../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons'

import { format, parseISO } from 'date-fns';
import clsx from 'clsx';

export default function Index({ can, auth, platforms, channel_platforms }) {
    return (
        <App can={can} auth={auth}>
            <nav className="navbar navbar-expand-sm navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand d-block d-sm-none d-md-block">Channels</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-page" aria-controls="navbar-page" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-page">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <InertiaLink className="nav-link active" aria-current="page" href="/channels">
                                    All
                                </InertiaLink>
                            </li>
                            {platforms.filter((platform) => !platform.legacy).map((platform, key) => (
                                <NavItem url={platform.url} key={key}>
                                    <PlatformIcon platform={platform} /> <span className="d-inline-block d-sm-none d-xxl-inline-block">{platform.name}</span>
                                </NavItem>
                            ))}
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="legacyPlatforms" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon icon={faAngleDown} /> Legacy
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="legacyPlatforms">
                                    {platforms.filter((platform) => platform.legacy).map((platform, key) => (
                                        <DropdownItem url={platform.url} key={key}>
                                            <PlatformIcon platform={platform} /> {platform.name}
                                        </DropdownItem>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        
            <div className="container my-3">
                <div className="row g-3">
                    {channel_platforms.map((platform, key) => (
                        <div className={clsx({ 'col-12': platform.channels.length >= 3, 'col-12 col-md-6': platform.channels.length <= 2 })} key={key}>
                            <div className="row g-2">
                                <div className={clsx('col-12 mb-n1', { 'mt-3': key > 0 })}>
                                    <h3 className="h6" style={{ color: platform.color }}>
                                        <PlatformIcon platform={platform} color />
                                        <span className="fw-bold ms-2">{platform.name}</span>
                                    </h3>
                                </div>
                                {platform.channels.map((channel, _key) => (
                                    <Channel
                                        key={_key}
                                        channel={{ color: channel.color, name: channel.name }}
                                        build={channel.flights.length > 0 ? channel.flights[0].version : ''}
                                        date={channel.flights.length > 0 ? format(parseISO(channel.flights[0].date), 'd MMMM yyyy') : ''}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </App>
    )
}