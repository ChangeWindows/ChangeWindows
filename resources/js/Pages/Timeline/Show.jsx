import React, { Fragment } from 'react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';
import Flight from '../../Components/Timeline/Flight';
import Timeline from '../../Components/Timeline/Timeline';

import PlatformIcon from '../../Components/Platforms/PlatformIcon';
import PlatformNavigation from '../../Components/PlatformNavigation';

import { format, parseISO } from 'date-fns';
import clsx from 'clsx';

export default function Show({ can, auth, timeline, platforms, channel_platforms }) {
    return (
        <App can={can} auth={auth}>
            <PlatformNavigation all="/timeline" page="Timeline" platforms={platforms} />
        
            <div className="container my-3">
                <div className="row g-3">
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
                                            url={flight.url}
                                        />
                                    ))}
                                </Timeline>
                            ))}
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