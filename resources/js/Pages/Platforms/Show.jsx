import React, { useMemo } from 'react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';
import DropdownItem from '../../Components/Navbar/DropdownItem';
import Flight from '../../Components/Timeline/Flight';
import NavItem from '../../Components/Navbar/NavItem';
import ReleaseCard from '../../Components/Cards/ReleaseCard';
import Timeline from '../../Components/Timeline/Timeline';

import PlatformIcon from '../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faFlag, faListTimeline } from '@fortawesome/pro-regular-svg-icons';

import { format, parseISO } from 'date-fns';

export default function Show({ platforms, platform, channels, releases, timeline }) {
    const [currentReleases, legacyReleases] = useMemo(() => {
        const currentReleases = releases.filter((release) => release.channels.length > 0);
        const legacyReleases = releases.filter((release) => release.channels.length === 0);

        return [currentReleases, legacyReleases];
    }, [releases]);

    return (
        <App>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Plaforms</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-page" aria-controls="navbar-page" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-page">
                        <ul className="navbar-nav me-auto">
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
                        <h1 className="h2"><PlatformIcon platform={platform} color /> {platform.name}</h1>
                        <p className="lead fw-bold">{platform.description}</p>

                        <div className="row g-2 mt-3">
                            {channels.map((channel, key) => (
                                <Channel
                                    key={key}
                                    channel={{ color: channel.color, class: '', name: channel.name }}
                                    build={channel.flights.length > 0 ? channel.flights[0].version : ''}
                                    date={channel.flights.length > 0 ? format(parseISO(channel.flights[0].date), 'd MMMM yyyy') : ''}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="col-12">
                        <nav className="mt-4">
                            <div className="nav nav-lined" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-releases-tab" data-bs-toggle="tab" data-bs-target="#nav-releases" type="button" role="tab" aria-controls="nav-releases" aria-selected="true"><FontAwesomeIcon icon={faFlag} fixedWidth /> Releases</button>
                                <button className="nav-link" id="nav-timeline-tab" data-bs-toggle="tab" data-bs-target="#nav-timeline" type="button" role="tab" aria-controls="nav-timeline" aria-selected="false"><FontAwesomeIcon icon={faListTimeline} fixedWidth /> Timeline</button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-releases" role="tabpanel" aria-labelledby="nav-releases-tab">
                                <div className="row">
                                    {currentReleases.length > 0 &&
                                        <div className="col-12 mt-4">
                                            <h2 className="h5 mb-3 fw-bold">Current releases</h2>
                                            <div className="row g-2">
                                                {currentReleases.map((release, key) => {
                                                    return (
                                                        <ReleaseCard
                                                            key={key}
                                                            name={release.name}
                                                            alts={[`Version ${release.version}`, release.codename]}
                                                            channels={release.channels}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    }
                                    <div className="col-12 mt-4">
                                        <h2 className="h5 mb-3 fw-bold">Packages</h2>
                                        <div className="row g-2">
                                            <ReleaseCard
                                                name="Windows Feature Experience Pack"
                                            />
                                        </div>
                                    </div>
                                    {legacyReleases.length > 0 &&
                                        <div className="col-12 mt-4">
                                            <h2 className="h5 mb-3 fw-bold">Unsupported releases</h2>
                                            <div className="row g-2">
                                                {legacyReleases.map((release, key) => {
                                                    return (
                                                        <ReleaseCard
                                                            key={key}
                                                            name={release.name}
                                                            alts={[`Version ${release.version}`, release.codename]}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav-timeline" role="tabpanel" aria-labelledby="nav-timeline-tab">
                                <div className="row">
                                    <div className="col-8 mt-4">
                                        <h2 className="h5 mb-3 fw-bold">Timeline</h2>
                                        <div className="row g-4">
                                            {Object.keys(timeline).map((date, key) => (
                                                <Timeline date={format(parseISO(timeline[date].date), 'd MMMM yyyy')} key={key}>
                                                    {timeline[date].flights.map((flight, key) => (
                                                        <Flight
                                                            key={key}
                                                            platform={flight.platform}
                                                            build={flight.flight}
                                                            channels={[flight.release_channel]}
                                                            version={flight.version}
                                                        />
                                                    ))}
                                                </Timeline>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}