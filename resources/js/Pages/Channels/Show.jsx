import React from 'react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';

import PlatformIcon from '../../Components/Platforms/PlatformIcon';
import PlatformNavigation from '../../Components/PlatformNavigation';

import { format, parseISO } from 'date-fns';
import clsx from 'clsx';

export default function Show({ can, auth, platforms, channel_order, releases }) {
    return (
        <App can={can} auth={auth}>
            <PlatformNavigation all="/channels" page="Channels" platforms={platforms} />
        
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