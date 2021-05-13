import React from 'react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';

import PlatformIcon from '../../Components/Platforms/PlatformIcon';
import PlatformNavigation from '../../Components/PlatformNavigation';

import { format, parseISO } from 'date-fns';
import clsx from 'clsx';

export default function Show({ can, auth, platform, platforms, channel_order, releases }) {
    return (
        <App can={can} auth={auth}>
            <PlatformNavigation all="/channels" page="Channels" platforms={platforms} />
        
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12 mt-4">
                        <h1 className="h4 mb-2" style={{ color: platform.color }}><PlatformIcon platform={platform} color className="me-2" /> {platform.name}</h1>
                    </div>
                    {releases.map((release, key) => (
                        <div className="col-12" key={key}>
                            <div className="row g-2">
                                <div className={clsx('col-12 mb-n1', { 'mt-3': key > 0 })}>
                                    <div className="d-flex flex-row">
                                        <h3 className="h6 mb-0"><PlatformIcon platform={release.platform} color /></h3>
                                        <div className="ms-2">
                                            <h3 className="h6 mb-0">{release.name}</h3>
                                            <p className="text-muted mb-1 mt-n1"><small>Version {release.version}, {release.codename}</small></p>
                                        </div>
                                    </div>
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
                                                url={channel.flight ? channel.flight.url : undefined}
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