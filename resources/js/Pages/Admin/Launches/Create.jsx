import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import PlatformIcon from '../../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faFloppyDisk, faGameConsoleHandheld } from '@fortawesome/pro-regular-svg-icons';

import { format, isDate, parseISO } from 'date-fns';

export default function Create({ can, auth, urls, releases }) {
    const [curLaunch, setCurLaunch] = useState({
        release: null,
        date: format(new Date(), 'yyyy-MM-dd')
    });

    function formHandler(event) {
        const { id, value, name } = event.target;
        const _launch = Object.assign({}, curLaunch);

        console.log(id, value, name);

        switch (name) {
            case 'release':
                _launch.release = Number(id);
                break;
            default:
                _launch[id] = value;
                break;
        }

        setCurLaunch(_launch);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.post(urls.store_launch, curLaunch);
    }
    
    console.log(curLaunch);

    return (
        <Admin can={can} auth={auth}>
            <form onSubmit={handleSubmit}>
                <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                    <div className="container">
                        <InertiaLink href="/admin/launches" className="btn btn-sm me-2">
                            <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                        </InertiaLink>
                        <span className="navbar-brand">New launch</span>
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
                            <h4 className="h5 mb-0">Launch date</h4>
                            <p className="text-muted mb-0"><small>T minus 10 minutes.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="date" value={isDate(parseISO(curLaunch.date)) ? format(parseISO(curLaunch.date), 'yyyy-MM-dd') : curLaunch.date} onChange={formHandler} />
                                                <label htmlFor="date">Date</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Releases</h4>
                            <p className="text-muted mb-0"><small>The release that is launching.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        {releases.map((release, key) => (
                                            <div className="col-12 col-lg-6" key={key}>
                                                <div className="form-check" key={key}>
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        value="1"
                                                        id={release.id}
                                                        name="release"
                                                        checked={curLaunch.release === release.id}
                                                        onChange={formHandler}
                                                    />
                                                    <label className="form-check-label" htmlFor={release.id}>
                                                        <span className="fw-bold"><PlatformIcon platform={release.platform} color /> {release.name}</span>
                                                        <p className="lh-sm mt-1 mb-0"><small className="text-muted d-block mt-n1">Version {release.version}, {release.codename}</small></p>
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                        {releases.length === 0 && 
                                            <div className="col-12">
                                                <p className="mb-0">There are no releases without a launch.</p>
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