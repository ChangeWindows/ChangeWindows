import React, { Fragment } from 'react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';
import DropdownItem from '../../Components/Navbar/DropdownItem';
import Flight from '../../Components/Timeline/Flight';
import NavItem from '../../Components/Navbar/NavItem';
import Promotion from '../../Components/Timeline/Promotion';
import Release from '../../Components/Timeline/Release';
import Timeline from '../../Components/Timeline/Timeline';

import PlatformIcon from '../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSunHaze } from '@fortawesome/pro-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { format, parseISO } from 'date-fns';
import clsx from 'clsx';

export default function Show({ can, platforms, channel_platforms }) {
    return (
        <App can={can}>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Timeline</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-page" aria-controls="navbar-page" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-page">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    All
                                </a>
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
                                    Legacy
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
                        <div className="card shadow border-0 overflow-hidden d-flex flex-row">
                            <div className="bg-primary text-white p-3">
                                <h3><FontAwesomeIcon icon={faSunHaze} fixedWidth /></h3>
                            </div>
                            <div className="card-body">
                                <h1 className="h3">Welcome to ChangeWindows Preview</h1>
                                <p>Hey... you're not really supposed to be here. This is the ChangeWindows test site. The data on here is probably fake. But let us help you find the real ChangeWindows.</p>
                                <a href="https://changewindows.org" className="btn btn-primary btn-sm me-1"><FontAwesomeIcon icon={faArrowLeft} fixedWidth /> Back to ChangeWindows</a>
                                <a href="https://github.com/changewindows" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faGithub} fixedWidth /> GitHub</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-7">
                        <div className="row g-4">
                            <Timeline date="25 March 2021">
                                <Flight
                                    platform="pc"
                                    build="120.2212.3530.0"
                                    channels={[
                                        { class: 'release', name: 'RP' },
                                        { class: 'beta', name: 'Beta' }
                                    ]}
                                    component="Windows Feature Experience Pack"
                                />
                            </Timeline>
                            <Timeline date="5 March 2021">
                                <Flight
                                    platform="xbox"
                                    build="21326.1019"
                                    channels={[
                                        { class: 'skip', name: 'Skip'}
                                    ]}
                                    version={2108}
                                />
                                <Flight
                                    platform="xbox"
                                    build="19041.6736"
                                    channels={[
                                        { class: 'preview', name: 'Delta' },
                                        { class: 'beta', name: 'Beta' },
                                        { class: 'dev', name: 'Alpha' }
                                    ]}
                                    version={2103}
                                />
                            </Timeline>
                            <Timeline date="4 March 2021">
                                <Flight
                                    platform="xbox"
                                    build="19041.6736"
                                    channels={[
                                        { class: 'release', name: 'Omega' }
                                    ]}
                                    version={2103}
                                />
                            </Timeline>
                            <Timeline date="3 March 2021">
                                <Flight
                                    platform="pc"
                                    build="21627.1000"
                                    channels={[
                                        { class: 'dev', name: 'Dev' }
                                    ]}
                                />
                                <Flight
                                    platform="xbox"
                                    build="21326.1000"
                                    channels={[
                                        { class: 'skip', name: 'Skip' }
                                    ]}
                                    version={2108}
                                />
                                <Flight
                                    platform="server"
                                    build="20303.1"
                                    channels={[
                                        { class: 'beta', name: 'Preview' }
                                    ]}
                                    version="21H2"
                                />
                                <Flight
                                    platform="sdk"
                                    build="20303.1"
                                    channels={[
                                        { class: 'public', name: 'Public' }
                                    ]}
                                    version="21H2"
                                />
                                <Flight
                                    platform="holographic"
                                    build="20303.1000"
                                    channels={[
                                        { class: 'beta', name: 'Slow' },
                                        { class: 'dev', name: 'Fast' }
                                    ]}
                                    version="21H1"
                                />
                                <Flight
                                    platform="xbox"
                                    build="19041.6729"
                                    channels={[
                                        { class: 'dev', name: 'Alpha' }
                                    ]}
                                    version={2103}
                                />
                            </Timeline>
                            <Timeline date="23 February 2021">
                                <Flight
                                    platform="pc"
                                    build="120.2212.3030.0"
                                    channels={[
                                        { class: 'beta', name: 'Beta' }
                                    ]}
                                    component="Windows Feature Experience Pack"
                                />
                            </Timeline>
                            <Timeline date="16 February 2021">
                                <Flight
                                    platform="azure"
                                    build="17784.1557"
                                    channels={[
                                        { class: 'beta', name: 'Beta' }
                                    ]}
                                    version="20H2"
                                />
                            </Timeline>
                            <Timeline date="4 February 2021">
                                <Flight
                                    platform="xbox"
                                    build="19041.5496"
                                    channels={[
                                        { class: 'skip', name: 'Skip' }
                                    ]}
                                    version={2109}
                                />
                                <Promotion
                                    platform="xbox"
                                    version="2109"
                                    channel={{ class: 'skip', name: 'Alpha Skip-Ahead' }}
                                />
                                <Release
                                    platform="xbox"
                                    version={2109}
                                />
                            </Timeline>
                            <Timeline date="26 January 2021">
                                <Flight
                                    platform="pc"
                                    build="120.2212.2020.0"
                                    channels={[
                                        { class: 'beta', name: 'Beta' }
                                    ]}
                                    component="Windows Feature Experience Pack"
                                />
                            </Timeline>
                            <Timeline date="20 January 2021">
                                <Flight
                                    platform="xbox"
                                    build="2011.1.2012.11004"
                                    channels={[
                                        { class: 'release', name: 'Omega' }
                                    ]}
                                    component="Xbox Shell"
                                />
                            </Timeline>
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
                                    {platform.channels.map((channel, key) => (
                                        <Channel
                                            key={key}
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