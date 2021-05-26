import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';
import Flight from '../../Components/Timeline/Flight';
import Launch from '../../Components/Timeline/Launch';
import LifeCycle from './_LifeCycle';
import Pagination from '../../Components/Pagination';
import PlatformIcon from '../../Components/Platforms/PlatformIcon';
import Promotion from '../../Components/Timeline/Promotion';
import Timeline from '../../Components/Timeline/Timeline';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faNotes, faArrowLeft, faChevronLeft, faChevronRight } from '@fortawesome/pro-regular-svg-icons';

import { format, parseISO } from 'date-fns';
import { Helmet } from 'react-helmet';
import Markdown from 'markdown-to-jsx';

export default function Release({ app, release, platform, channels, timeline, pagination, quick_nav }) {
    return (
        <App>
            <Helmet>
                <title>{release.name} &middot; {app.name}</title>
            </Helmet>

            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <InertiaLink href={`/platforms/${platform.slug}`} className="btn btn-transparent btn-sm me-2">
                        <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                    </InertiaLink>
                    <div className="nav nav-lined" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-timeline-tab" data-bs-toggle="tab" data-bs-target="#nav-timeline" type="button" role="tab" aria-controls="nav-timeline" aria-selected="true">
                            <FontAwesomeIcon icon={faBarsStaggered} fixedWidth /> Timeline
                        </button>
                        <button className="nav-link" id="nav-releases-tab" data-bs-toggle="tab" data-bs-target="#nav-releases" type="button" role="tab" aria-controls="nav-releases" aria-selected="false">
                            <FontAwesomeIcon icon={faNotes} fixedWidth /> Changelog
                        </button>
                    </div>
                    <div className="flex-grow-1" />
                    {quick_nav.prev &&
                        <InertiaLink href={quick_nav.prev.url} className="btn btn-transparent btn-sm">
                            <FontAwesomeIcon icon={faChevronLeft} fixedWidth /><span className="d-none d-sm-inline"> {quick_nav.prev.version}</span>
                        </InertiaLink>
                    }
                    {quick_nav.next &&
                        <InertiaLink href={quick_nav.next.url} className="btn btn-transparent btn-sm ms-2">
                            <span className="d-none d-sm-inline">{quick_nav.next.version} </span><FontAwesomeIcon icon={faChevronRight} fixedWidth />
                        </InertiaLink>
                    }
                </div>
            </nav>

            <div className="container">
                <div className="row g-1">
                    <div className="col-12 titlebar">
                        <div className="d-flex">
                            <div className="me-3">
                                <h1><PlatformIcon platform={platform} color /></h1>
                            </div>
                            <div>
                                <h1 className="m-0 fw-bold" style={{ color: platform.color }}>{release.name}</h1>
                                <h2 className="h6 m-0 text-muted">Version {release.version}, {release.codename}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-timeline" role="tabpanel" aria-labelledby="nav-timeline-tab">
                                <div className="row">
                                    <LifeCycle release={release} />
                                    <div className="col-12 mt-4">
                                        <div className="row g-1">
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
                                    <div className="col-12 mt-4">
                                        <div className="row g-1">
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
                                                                    overview
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
                                                                    overview
                                                                />
                                                            );
                                                        }

                                                        if (flight.type === 'launch') {
                                                            return (
                                                                <Launch
                                                                    key={`${flight.type}-${flight.id}`}
                                                                    platform={flight.platform}
                                                                    version={flight.version}
                                                                    overview
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
                            <div className="tab-pane fade" id="nav-releases" role="tabpanel" aria-labelledby="nav-releases-tab">
                                <div className="row">
                                    <div className="col-12 mt-3">
                                        <div className="changelog-content">
                                            {release.changelog ? <Markdown>{release.changelog}</Markdown> : null}
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
