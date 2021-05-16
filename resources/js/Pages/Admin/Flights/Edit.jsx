import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import PlatformIcon from '../../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faFloppyDisk, faTrashCan } from '@fortawesome/pro-regular-svg-icons';

import { format, isDate, parseISO } from 'date-fns';

export default function Edit({ can, auth, urls, flight, date, platform, release_channel, status = null }) {
    const [curFlight, setCurFlight] = useState({
        major: '',
        minor: '',
        build: '',
        delta: '',
        date: format(new Date(), 'yyyy-MM-dd')
    });

    useEffect(() => {
        setCurFlight({ ...flight, date: format(parseISO(date.date), 'yyyy-MM-dd') });
        setVersion(`${flight.major}.${flight.minor}.${flight.build}.${flight.delta}`)
    }, [flight, date]);

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

    function formHandler(event) {
        const { id, value, type } = event.target;
        const _flight = Object.assign({}, curFlight);

        switch (type) {
            default:
                _flight[id] = value;
                break;
        }

        setCurFlight(_flight);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.patch(urls.update_flight, curFlight);
    }

    function handleDelete(event) {
      event.preventDefault();
      Inertia.delete(urls.destroy_flight, curFlight);
    }

    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                    <div className="container">
                        <InertiaLink href="/admin/flights" className="btn btn-transparent btn-sm me-2">
                            <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                        </InertiaLink>
                        <span className="navbar-brand">
                            <PlatformIcon platform={platform} color className="me-2" />
                            {version || 'Unnamed flight'}
                            <span className="badge ms-2" style={{ background: release_channel.color }}>{release_channel.name}</span>
                        </span>
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
                            <h4 className="h5 mb-0">Identity</h4>
                            <p className="text-muted mb-0"><small>The build string for this flight.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="version" value={version ?? ''} onChange={(event) => setVersion(event.target.value)} />
                                                <label htmlFor="version">Version</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="date" value={isDate(curFlight.date) ? format(parseISO(curFlight.date), 'yyyy-MM-dd') : curFlight.date} onChange={formHandler} />
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
                </div>
            </form>
            {can.delete_flights &&
                <form onSubmit={handleDelete}>
                    <div className="container my-3">
                        <div className="row">
                            <div className="col-12 col-md-4 my-4 my-md-0">
                                <h4 className="h5 mb-0 text-danger">Danger zone</h4>
                                <p className="text-muted mb-0"><small>All alone in the danger zone.</small></p>
                            </div>
                            <div className="col-12 col-md-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <p>Deleting a flight will remove all the content associated with that flight. Are you sure?</p>
                                                <button className="btn btn-danger btn-sm" type="submit"><FontAwesomeIcon icon={faTrashCan} fixedWidth /> Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            }
        </Admin>
    )
}