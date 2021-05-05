import React, { useEffect, useMemo, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import PlatformIcon from '../../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faFloppyDisk } from '@fortawesome/pro-regular-svg-icons';

import { format, isDate, parseISO } from 'date-fns';

export default function Create({ can, auth, urls, packages }) {
    const [curFlight, setCurFlight] = useState({
        major: '',
        minor: '',
        build: '',
        delta: '',
        packageChannels: [],
        date: format(new Date(), 'yyyy-MM-dd'),
        tweet: true
    });

    const [version, setVersion] = useState('');
    useEffect(() => {
        setCurFlight((curFlight) => ({
            ...curFlight,
            major: !isNaN(version.split('.')[0]) && !!version.split('.')[0] ? Number(version.split('.')[0]) : null,
            minor: !isNaN(version.split('.')[1]) && !!version.split('.')[1] ? Number(version.split('.')[1]) : null,
            build: !isNaN(version.split('.')[2]) && !!version.split('.')[2] ? Number(version.split('.')[2]) : null,
            delta: !isNaN(version.split('.')[3]) && !!version.split('.')[3] ? Number(version.split('.')[3]) : null
        }))
    }, [version]);

    function formHandler(event) {
        const { id, value, name } = event.target;
        const _flight = Object.assign({}, curFlight);

        switch (name) {
            case 'channel':
                if (_flight.packageChannels.find((channelId) => channelId === id)) {
                    _flight.packageChannels = _flight.packageChannels.filter((channelId) => channelId !== id);
                } else {
                    _flight.packageChannels = [..._flight.packageChannels, id];
                }
                break;
            case 'tweet':
                _flight.tweet = !_flight.tweet;
                break;
            default:
                _flight[id] = value;
                break;
        }

        setCurFlight(_flight);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.post(urls.store_package_flight, curFlight);
    }

    return (
        <Admin can={can} auth={auth}>
            <form onSubmit={handleSubmit}>
                <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                    <div className="container">
                        <InertiaLink href="/admin/flights" className="btn btn-sm me-2">
                            <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                        </InertiaLink>
                        <span className="navbar-brand">{version || 'New flight'}</span>
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
                                        <div className="col-12 col-sm-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="version" value={version} onChange={(event) => setVersion(event.target.value)} />
                                                <label htmlFor="version">Version</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="date" value={isDate(parseISO(curFlight.date)) ? format(parseISO(curFlight.date), 'yyyy-MM-dd') : curFlight.date} onChange={formHandler} />
                                                <label htmlFor="date">Date</label>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="major" value={curFlight.major ?? ''} disabled />
                                                <label htmlFor="major">Major</label>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="minor" value={curFlight.minor ?? ''} disabled />
                                                <label htmlFor="minor">Minor</label>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="build" value={curFlight.build ?? ''} disabled />
                                                <label htmlFor="build">Build</label>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="delta" value={curFlight.delta ?? ''} disabled />
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
                            <h4 className="h5 mb-0">Socials</h4>
                            <p className="text-muted mb-0"><small>Socializing, but safe of course, it's still a pandemic...</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="1"
                                                    id="tweet"
                                                    name="tweet"
                                                    checked={curFlight.tweet}
                                                    onChange={formHandler}
                                                />
                                                <label className="form-check-label" htmlFor="tweet">
                                                    <span className="fw-bold">Publish to Twitter</span>
                                                    <p className="lh-sm mt-1 mb-0"><small className="text-muted d-block mt-n1">Tweet to the platform-connected Twitter handles.</small></p>
                                                </label>
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
                                        {packages.map((pack, key) => (
                                            <div className="col-12 col-lg-6" key={key}>
                                                <div className="d-flex mb-1">
                                                    <div className="me-2">
                                                        <PlatformIcon platform={pack.platform} color />
                                                    </div>
                                                    <div className="d-flex flex-column">
                                                        <span className="fw-bold">{pack.name}</span>
                                                    </div>
                                                </div>
                                                {pack.channels.map((channel, key) => (
                                                    <div className="form-check" key={key}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value="1"
                                                            id={channel.id}
                                                            name="channel"
                                                            checked={curFlight.packageChannels.find((channelId) => channelId === channel.id)}
                                                            onChange={formHandler}
                                                        />
                                                        <label className="form-check-label" htmlFor={channel.id}>
                                                            <span style={{ color: channel.color}}>
                                                                {channel.name}
                                                            </span>
                                                            {!channel.supported &&
                                                                <small className="text-muted"> - <i>Unsupported</i></small>
                                                            }
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                        {packages.length === 0 && 
                                            <div className="col-12">
                                                <p className="mb-0">No packages available...</p>
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