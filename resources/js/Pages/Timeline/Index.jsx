import React, { Fragment } from 'react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';
import Flight from '../../Components/Timeline/Flight';
import Launch from '../../Components/Timeline/Launch';
import Pagination from '../../Components/Pagination';
import PlatformIcon from '../../Components/Platforms/PlatformIcon';
import PlatformNavigation from '../../Components/PlatformNavigation';
import Promotion from '../../Components/Timeline/Promotion';
import Timeline from '../../Components/Timeline/Timeline';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSunHaze } from '@fortawesome/pro-regular-svg-icons'
import { faGithub, faPatreon } from '@fortawesome/free-brands-svg-icons';

import { format, parseISO } from 'date-fns';
import clsx from 'clsx';

export default function Index({ can, auth, timeline, pagination, platforms, channel_platforms }) {
    return (
        <App can={can} auth={auth}>
            <PlatformNavigation home all="/timeline" page="Timeline" platforms={platforms} />
        
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
                                <a href="https://changewindows.org" className="btn btn-primary btn-sm me-1"><FontAwesomeIcon icon={faArrowLeft} fixedWidth /> Back</a>
                                <a href="https://github.com/changewindows" className="btn btn-primary btn-sm me-1"><FontAwesomeIcon icon={faGithub} fixedWidth /> GitHub</a>
                                <a href="https://patreon.com/changewindows" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faPatreon} fixedWidth /> Sponsor us</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-7">
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
                    <div className="d-none d-md-block col-md-4 col-lg-5">
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
                                            url={channel.flights.length > 0 ? channel.flights[0].url : undefined}
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