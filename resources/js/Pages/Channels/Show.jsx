import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';
import DropdownItem from '../../Components/Navbar/DropdownItem';
import NavItem from '../../Components/Navbar/NavItem';

import PlatformIcon from '../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons';

import { format, parseISO } from 'date-fns';
import clsx from 'clsx';

export default function Show({ can, auth, platforms, channel_order, releases }) {
    console.log(channel_order);
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
                                <InertiaLink className="nav-link" href="/channels">
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
                    {releases.map((release, key) => (
                        <div className="col-12" key={key}>
                            <div className="row g-2">
                                <div className={clsx('col-12 mb-n1', { 'mt-3': key > 0 })}>
                                    <h3 className="h6">
                                        <PlatformIcon platform={release.platform} color />
                                        <span className="fw-bold ms-2">{release.name} (version {release.version})</span>
                                    </h3>
                                </div>
                                {channel_order.map((_channel_id, _key) => {
                                    const channel = release.channels.find((_channel) => _channel.channel_id === _channel_id);
                                    console.log(channel);

                                    if (channel) {
                                        return (
                                            <Channel
                                                key={_key}
                                                disabled={!channel.supported}
                                                channel={{ color: channel.color, name: channel.name }}
                                                build={channel.flight ? channel.flight.version : ''}
                                                date={channel.flight ? format(parseISO(channel.flight.date), 'd MMMM yyyy') : ''}
                                            />
                                        );
                                    } else {
                                        return (
                                            <div className="col d-none d-xxl-flex" />
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </App>
    )
}