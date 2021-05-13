import React, { useMemo } from 'react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';
import Flight from '../../Components/Timeline/Flight';
import Launch from '../../Components/Timeline/Launch';
import Promotion from '../../Components/Timeline/Promotion';
import ReleaseCard from '../../Components/Cards/ReleaseCard';
import Timeline from '../../Components/Timeline/Timeline';

import PlatformIcon from '../../Components/Platforms/PlatformIcon';
import PlatformNavigation from '../../Components/PlatformNavigation';
import Pagination from '../../Components/Pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faBarsStaggered } from '@fortawesome/pro-regular-svg-icons';

import { format, parseISO } from 'date-fns';

export default function Show({ can, auth, platforms, platform, channels, releases, packages, timeline, pagination }) {
    const [currentReleases, legacyReleases] = useMemo(() => {
        const currentReleases = releases.filter((release) => release.channels.length > 0);
        const legacyReleases = releases.filter((release) => release.channels.length === 0);

        return [currentReleases, legacyReleases];
    }, [releases]);

    return (
        <App can={can} auth={auth}>
            <PlatformNavigation page="Platforms" platforms={platforms} />
        
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12 mt-4">
                        <h1 className="h4 mb-2" style={{ color: platform.color }}><PlatformIcon platform={platform} color className="me-2" /> {platform.name}</h1>
                        <p>{platform.description}</p>

                        <div className="row g-2 mt-3">
                            {channels.map((channel, key) => (
                                <Channel
                                    key={key}
                                    channel={{ color: channel.color, name: channel.name }}
                                    build={channel.flights.length > 0 ? channel.flights[0].version : ''}
                                    date={channel.flights.length > 0 ? format(parseISO(channel.flights[0].date), 'd MMMM yyyy') : ''}
                                    url={channel.flights.length > 0 ? channel.flights[0].url : undefined}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="col-12">
                        <nav className="mt-4">
                            <div className="nav nav-lined" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-releases-tab" data-bs-toggle="tab" data-bs-target="#nav-releases" type="button" role="tab" aria-controls="nav-releases" aria-selected="true"><FontAwesomeIcon icon={faFlag} fixedWidth /> Releases</button>
                                <button className="nav-link" id="nav-timeline-tab" data-bs-toggle="tab" data-bs-target="#nav-timeline" type="button" role="tab" aria-controls="nav-timeline" aria-selected="false"><FontAwesomeIcon icon={faBarsStaggered} fixedWidth /> Timeline</button>
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
                                                            url={release.url}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    }
                                    {packages.length > 0 &&
                                        <div className="col-12 mt-4">
                                            <h2 className="h5 mb-3 fw-bold">Packages</h2>
                                            <div className="row g-2">
                                                {packages.map((pack, key) => {
                                                    return (
                                                        <ReleaseCard
                                                            key={key}
                                                            pack
                                                            name={pack.name}
                                                            alts={[`Version ${pack.version}`, pack.codename]}
                                                            channels={pack.channels}
                                                            url={pack.url}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    }
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
                                                            url={release.url}
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
                                    <div className="col-12 mt-4">
                                        <h2 className="h5 mb-3 fw-bold">Timeline</h2>
                                        <div className="row g-4">
                                            {Object.keys(timeline).map((date, key) => (
                                                <Timeline date={format(parseISO(timeline[date].date), 'd MMMM yyyy')} key={key}>
                                                    {timeline[date].flights.map((flight, _key) => {
                                                        if (flight.type === 'flight') {
                                                            return (
                                                                <Flight
                                                                    key={`${flight.type}-${flight.id}`}
                                                                    platform={flight.platform}
                                                                    build={flight.flight}
                                                                    channels={flight.release_channel}
                                                                    version={flight.version}
                                                                    pack={flight.package}
                                                                    url={flight.url}
                                                                />
                                                            );
                                                        }
                
                                                        if (flight.type === 'promotion') {
                                                            return (
                                                                <Promotion
                                                                    key={`${flight.type}-${flight.id}`}
                                                                    platform={flight.platform}
                                                                    channel={flight.release_channel}
                                                                    version={flight.version}
                                                                    url={flight.url}
                                                                />
                                                            );
                                                        }
                
                                                        if (flight.type === 'launch') {
                                                            return (
                                                                <Launch
                                                                    key={`${flight.type}-${flight.id}`}
                                                                    platform={flight.platform}
                                                                    version={flight.version}
                                                                    url={flight.url}
                                                                />
                                                            );
                                                        }
                                                    })}
                                                </Timeline>
                                            ))}
                                            <Pagination pagination={pagination} />
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