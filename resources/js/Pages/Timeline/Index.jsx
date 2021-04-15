import React, { Fragment } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';
import DropdownItem from '../../Components/Navbar/DropdownItem';
import Flight from '../../Components/Timeline/Flight';
import NavItem from '../../Components/Navbar/NavItem';
import Timeline from '../../Components/Timeline/Timeline';

import PlatformIcon from '../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faArrowLeft, faSunHaze } from '@fortawesome/pro-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { format, parseISO } from 'date-fns';
import clsx from 'clsx';

export default function Index({ can, auth, timeline, platforms, channel_platforms }) {
    return (
        <App can={can} auth={auth}>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Timeline</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-page" aria-controls="navbar-page" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-page">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <InertiaLink className="nav-link active" aria-current="page" href="/timeline">
                                    All
                                </InertiaLink>
                            </li>
                            {platforms.filter((platform) => !platform.legacy).map((platform, key) => (
                                <NavItem url={platform.url} key={key}>
                                    <PlatformIcon platform={platform} /> {platform.name}
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
                    <div className="col-12">
                        <div className="card shadow border-0 overflow-hidden d-flex flex-column flex-md-row">
                            <div className="bg-primary text-white p-3">
                                <h4 className="m-0"><FontAwesomeIcon icon={faSunHaze} fixedWidth /><span className="ms-2 d-inline d-md-none">ChangeWindows <span className="d-none d-sm-inline">Preview</span></span></h4>
                            </div>
                            <div className="card-body">
                                <h1 className="h4 d-none d-md-block">Welcome to ChangeWindows Preview</h1>
                                <p>Hey... you're not really supposed to be here. This is the ChangeWindows test site. The data on here is probably fake. But let us help you find the real ChangeWindows.</p>
                                <a href="https://changewindows.org" className="btn btn-primary btn-sm me-1"><FontAwesomeIcon icon={faArrowLeft} fixedWidth /> Back to ChangeWindows</a>
                                <a href="https://github.com/changewindows" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faGithub} fixedWidth /> GitHub</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-7">
                        <div className="row g-4">
                            {Object.keys(timeline).map((date, key) => (
                                <Timeline date={format(parseISO(timeline[date].date), 'd MMMM yyyy')} key={key}>
                                    {timeline[date].flights.map((flight, _key) => (
                                        <Flight
                                            key={_key}
                                            platform={flight.platform}
                                            build={flight.flight}
                                            channels={flight.release_channel}
                                            version={flight.version}
                                        />
                                    ))}
                                </Timeline>
                            ))}
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-5">
                        <div className="row g-2">
                            {channel_platforms.map((platform, key) => (
                                <Fragment key={key}>
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
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}