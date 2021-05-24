import React, { useEffect, useMemo, useState } from 'react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';

import PlatformIcon from '../../Components/Platforms/PlatformIcon';
import PlatformNavigation from '../../Components/PlatformNavigation';

import { format, parseISO } from 'date-fns';
import { getLocal, setLocal } from '../../utils/localStorage';
import { Helmet } from 'react-helmet';

export default function Show({ app, platform, platforms, channel_order, releases }) {
    const [showActiveOnly, setShowActiveOnly] = useState(getLocal('showActiveOnly'));
    const [hideChannelSetting, setHideChannelSetting] = useState(getLocal('hideChannelSetting'));

    function disableShowChannelSetting() {
        setLocal('hideChannelSetting', 1);
        setHideChannelSetting(1);
    };

    const releaseList = useMemo(() => {
        if (showActiveOnly) {
            return releases.map((release) => {
                const cleanedRelease = {
                    ...release,
                    channels: release.channels.filter((channel) => channel.supported)
                };
    
                if (cleanedRelease.channels.length > 0) {
                    return cleanedRelease;
                }
    
                return null;
            }).filter((releases) => releases !== null);
        }

        return releases;
    }, [releases, showActiveOnly]);
    
    function toggleShowActiveOnly() {
        setLocal('showActiveOnly', showActiveOnly ? 0 : 1);
        setShowActiveOnly(!showActiveOnly);
    }
    
    return (
        <App>
            <Helmet>
                <title>{platform.name} Channels &middot; {app.name}</title>
            </Helmet>

            <PlatformNavigation all="/channels" page="Channels" platforms={platforms} />
        
            <div className="container">
                <div className="row g-3">
                    <div className="col-12 titlebar">
                        <h1 style={{ color: platform.color }}><PlatformIcon platform={platform} color className="me-2" /> {platform.name}</h1>
                    </div>
                    {!hideChannelSetting &&
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body d-flex flex-row">
                                    <div className="flex-grow-1">
                                        <h6 className="m-0">Hide inactive channels &middot; <btn onClick={disableShowChannelSetting} className="btn-link">Close</btn></h6>
                                        <p className="m-0 text-muted">You can now opt to only show the active channels, you can find this option in your Settings in the future.</p>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="form-check form-switch">
                                            <input className="form-check-input shadow" type="checkbox" onChange={toggleShowActiveOnly} checked={showActiveOnly} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {releaseList.map((release, key) => (
                        <div className="col-12" key={key}>
                            <div className="row g-1">
                                <div className="col-12 titel">
                                    <div className="d-flex flex-row">
                                        <h3 className="h6 mb-0"><PlatformIcon platform={release.platform} color /></h3>
                                        <div className="ms-2">
                                            <h3 className="h6 mb-0">{release.name}</h3>
                                            <p className="text-muted mb-1 mt-n1"><small>Version {release.version}, {release.codename}</small></p>
                                        </div>
                                    </div>
                                </div>
                                {channel_order.filter((_co) => showActiveOnly ? _co.active : true).map((_channel, _key) => {
                                    const channel = release.channels.find((__channel) => __channel.channel_id === _channel.id);

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
                                            <div className="col d-none d-xxl-flex" key={_key} />
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