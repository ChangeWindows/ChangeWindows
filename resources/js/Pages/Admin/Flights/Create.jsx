import React, { useEffect, useMemo, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';
import PlatformIcon from '../../../Components/Platforms/PlatformIcon';

import AmaranthIcon, { aiCheck, aiFloppyDisc } from '@changewindows/amaranth';

import { parse, format, isValid, parseISO } from 'date-fns';

export default function Create({ urls, releases, platform }) {
    const [showAll, setShowAll] = useState(false);
    const [showEligible, setShowEligible] = useState(false);
    const [curFlight, setCurFlight] = useState({
        major: '',
        minor: '',
        build: '',
        delta: '',
        releaseChannels: [],
        date: format(new Date(), 'yyyy-MM-dd'),
        tweet: true
    });

    const [version, setVersion] = useState('10.0.');
    useEffect(() => {
        setCurFlight((curFlight) => ({
            ...curFlight,
            major: !isNaN(version.split('.')[0]) && !!version.split('.')[0] ? Number(version.split('.')[0]) : null,
            minor: !isNaN(version.split('.')[1]) && !!version.split('.')[1] ? Number(version.split('.')[1]) : null,
            build: !isNaN(version.split('.')[2]) && !!version.split('.')[2] ? Number(version.split('.')[2]) : null,
            delta: !isNaN(version.split('.')[3]) && !!version.split('.')[3] ? Number(version.split('.')[3]) : null
        }))
    }, [version]);

    const eligibleReleases = useMemo(() => {
        return releases.filter((release) => {
            if (!showAll && (
                Number(curFlight.build) < Number(release.start_build) ||
                Number(curFlight.build) === Number(release.start_build) && Number(curFlight.delta) <Number( release.start_delta) ||
                Number(curFlight.build) > Number(release.end_build) ||
                Number(curFlight.build) === Number(release.end_build) && Number(curFlight.delta) >Number( release.end_delta)
            )) {
                return false;
            }

            if (!showAll && !showEligible) {
                release.availableChannels = release.channels.filter((channel) => channel.supported).sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
            } else {
                release.availableChannels = release.channels.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
            }

            if (!showAll && release.availableChannels.length === 0) {
                return false;
            }

            return true;
        });
    }, [curFlight, showAll, showEligible]);

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
      Inertia.post(urls.store_flight, curFlight);
    }

    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <NaviBar
                    back="/admin/flights"
                    actions={
                        <button className="btn btn-primary btn-sm" type="submit"><AmaranthIcon icon={aiFloppyDisc} /> Save</button>
                    }
                >
                    {version || 'New flight'}
                </NaviBar>

                <div className="container my-3">
                    {status &&
                        <div className="alert alert-success"><AmaranthIcon icon={aiCheck} /> {status}</div>
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
                                                <input type="date" className="form-control" id="date" value={isValid(parse(curFlight.date, 'P', new Date())) ? format(parseISO(curFlight.date), 'yyyy-MM-dd') : curFlight.date} onChange={formHandler} />
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
                                <div className="card-header">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="1"
                                            id="showEligible"
                                            name="channel"
                                            checked={showEligible}
                                            onChange={() => setShowEligible(!showEligible)}
                                        />
                                        <label className="form-check-label" htmlFor="showEligible">
                                            <span className="fw-bold">Show all eligible releases and channels</span>
                                            <p className="lh-sm mt-1 mb-0"><small className="text-muted d-block mt-n1">You'll be able to select any channel within a release that accepts this build string.</small></p>
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="1"
                                            id="showAll"
                                            name="channel"
                                            checked={showAll}
                                            onChange={() => setShowAll(!showAll)}
                                        />
                                        <label className="form-check-label" htmlFor="showAll">
                                            <span className="fw-bold">Show all releases and channels</span>
                                            <p className="lh-sm mt-1 mb-0"><small className="text-muted d-block mt-n1">You'll be able to select any channel, but publishing may be blocked if the build doesn't match.</small></p>
                                        </label>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3">
                                        {eligibleReleases.map((release, key) => (
                                            <div className="col-12 col-lg-6" key={key}>
                                                <div className="d-flex mb-1">
                                                    <div className="me-2">
                                                        <PlatformIcon platform={release.platform} color />
                                                    </div>
                                                    <div className="d-flex flex-column">
                                                        <span className="fw-bold">{release.name}</span>
                                                        <small className="text-muted mt-n1">{`${release.start_build}.${release.start_delta}`} - {`${release.end_build}.${release.end_delta}`}</small>
                                                    </div>
                                                </div>
                                                {release.availableChannels.map((channel, key) => (
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
                                        {eligibleReleases.length === 0 && 
                                            <div className="col-12">
                                                {version === '10.0.' ?
                                                    <p className="mb-0">Enter a string to get started...</p>
                                                :
                                                    <p className="mb-0">This build doesn't seem to match any release...</p>
                                                }
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