import React from 'react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';
import Flight from '../../Components/Timeline/Flight';
import Launch from '../../Components/Timeline/Launch';
import Pagination from '../../Components/Pagination';
import PlatformIcon from '../../Components/Platforms/PlatformIcon';
import Promotion from '../../Components/Timeline/Promotion';
import Timeline from '../../Components/Timeline/Timeline';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faNotes } from '@fortawesome/pro-regular-svg-icons';

import { format, parseISO } from 'date-fns';
import Markdown from 'markdown-to-jsx';

export default function Show(props) {
    const { can, auth, release, platform, channels, timeline, pagination } = props;

    return (
        <App can={can} auth={auth}>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Packages</span>
                </div>
            </nav>

            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12">
                        <div className="d-flex">
                            <div className="me-2">
                                <h1 className="h2"><PlatformIcon platform={platform} color /></h1>
                            </div>
                            <div>
                                <h1 className="h2 mb-0 fw-bold" style={{ color: platform.color }}>{release.name}</h1>
                            </div>
                        </div>

                        <div className="row g-2 mt-3">
                            {channels.map((channel, key) => (
                                <Channel
                                    key={key}
                                    channel={{ color: channel.color, name: channel.name }}
                                    build={channel.flight.version ?? 'None'}
                                    date={channel.flight?.date ? format(parseISO(channel.flight.date), 'd MMMM yyyy') : 'No flight'}
                                    disabled={channel.disabled}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="col-12">
                        <nav className="mt-4">
                            <div className="nav nav-lined" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-releases-tab" data-bs-toggle="tab" data-bs-target="#nav-releases" type="button" role="tab" aria-controls="nav-releases" aria-selected="true"><FontAwesomeIcon icon={faNotes} fixedWidth /> Release notes</button>
                                <button className="nav-link" id="nav-timeline-tab" data-bs-toggle="tab" data-bs-target="#nav-timeline" type="button" role="tab" aria-controls="nav-timeline" aria-selected="false"><FontAwesomeIcon icon={faBarsStaggered} fixedWidth /> Timeline</button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-releases" role="tabpanel" aria-labelledby="nav-releases-tab">
                                <div className="row">
                                    <div className="col-12 mt-4">
                                        <h2 className="h5 mb-3 fw-bold">Release notes</h2>
                                        <div className="changelog-content">
                                            {release.changelog ? <Markdown>{release.changelog}</Markdown> : null}
                                        </div>
                                    </div>
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
                                                                />
                                                            );
                                                        }

                                                        if (flight.type === 'launch') {
                                                            return (
                                                                <Launch
                                                                    key={`${flight.type}-${flight.id}`}
                                                                    platform={flight.platform}
                                                                    version={flight.version}
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
