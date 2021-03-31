import React, { useEffect, useMemo, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faFloppyDisk } from '@fortawesome/pro-regular-svg-icons';
import PlatformIcon from '../../../Components/Platforms/PlatformIcon';

export default function Create({ urls, releases }) {
    const [curFlight, setCurFlight] = useState({
        major: '',
        minor: '',
        build: '',
        delta: '',
        releaseChannels: []
    });

    const [version, setVersion] = useState('10.0.');
    useEffect(() => {
        setCurFlight((curFlight) => ({
            ...curFlight,
            major: Number(version.split('.')[0]) ?? null,
            minor: Number(version.split('.')[1]) ?? null,
            build: Number(version.split('.')[2]) ?? null,
            delta: Number(version.split('.')[3]) ?? null
        }))
    }, [version]);

    console.log(releases);

    const eligibleReleases = useMemo(() => {
        return releases.filter((release) => {
            const build = Number(`${curFlight.build}${curFlight.delta ? `.${curFlight.delta}` : ''}`);
            const start = Number(`${release.start_build}.${release.start_delta}`);
            const end = Number(`${release.end_build}.${release.end_delta}`);

            if (build < start || build > end) {
                return false;
            }

            release.channels.filter((channel) => channel.supported);

            release.channels.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));

            return true;
        });
    }, [curFlight]);

    function formHandler(event) {
        const { id, value, name } = event.target;
        const _flight = Object.assign({}, curFlight);

        switch (name) {
            case 'channel':
                if (_flight.releaseChannels.find((channelId) => channelId === id)) {
                    _flight.releaseChannels = _flight.releaseChannels.filter((channelId) => channelId !== id);
                } else {
                    _flight.releaseChannels = [..._flight.releaseChannels, id];
                }
                break;
            default:
                _flight[id] = value;
                break;
        }

        setCurFlight(_flight);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.post(urls.store_flight, curFlight);
    }

    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                    <div className="container">
                        <InertiaLink href="/admin/flights" className="btn btn-sm me-2">
                            <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                        </InertiaLink>
                        <span className="navbar-brand">{curFlight.name || 'Unnamed flight'}</span>
                        <div className="flex-grow-1" />
                        <button className="btn btn-primary btn-sm" type="submit"><FontAwesomeIcon icon={faFloppyDisk} fixedWidth/> Save</button>
                    </div>
                </nav>
            
                <div className="container my-3">
                    {status &&
                        <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                    }
                    <fieldset className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Build string</h4>
                            <p className="text-muted mb-0"><small>The build string for this flight.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="version" value={version} onChange={(event) => setVersion(event.target.value)} />
                                                <label htmlFor="version">Version</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="major" value={curFlight.major} disabled />
                                                <label htmlFor="major">Major</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="minor" value={curFlight.minor} disabled />
                                                <label htmlFor="minor">Minor</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="build" value={curFlight.build} disabled />
                                                <label htmlFor="build">Build</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="delta" value={curFlight.delta} disabled />
                                                <label htmlFor="delta">Delta</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Release channels</h4>
                            <p className="text-muted mb-0"><small>All channels this flight is in.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        {eligibleReleases.map((release, key) => (
                                            <div className="col-12 col-lg-6" key={key}>
                                                <p className="fw-bold"><PlatformIcon platform={release.platform} color /> {release.name}</p>
                                                {release.channels.map((channel, key) => (
                                                    <div className="form-check" key={key}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value="1"
                                                            id={channel.id}
                                                            name="channel"
                                                            checked={curFlight.releaseChannels.find((channelId) => channelId === channel.id)}
                                                            onChange={formHandler}
                                                        />
                                                        <label className="form-check-label" htmlFor={channel.id} style={{ color: channel.color}}>
                                                            {channel.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                        {eligibleReleases.length === 0 && 
                                            <div className="col-12">
                                                <p className="mb-0">This version can't be published to any flight.</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </form>
        </Admin>
    )
}