import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';
import PlatformIcon from '../../../Components/Platforms/PlatformIcon';

import AmaranthIcon, { aiCheck, aiFloppyDisc } from '@changewindows/amaranth';

import { parse, format, isValid, parseISO } from 'date-fns';

export default function Create({ urls, releases }) {
    const [curLaunch, setCurLaunch] = useState({
        release: null,
        date: format(new Date(), 'yyyy-MM-dd')
    });

    function formHandler(event) {
        const { id, value, name } = event.target;
        const _launch = Object.assign({}, curLaunch);

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
    
    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <NaviBar
                    back="/admin/launches"
                    actions={
                        <button className="btn btn-primary btn-sm" type="submit"><AmaranthIcon icon={aiFloppyDisc} /> Save</button>
                    }
                >
                    New launch
                </NaviBar>
            
                <div className="container my-3">
                    {status &&
                        <div className="alert alert-success"><AmaranthIcon icon={aiCheck} /> {status}</div>
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
                                                <input type="date" className="form-control" id="date" value={isValid(parse(curLaunch.date, 'P', new Date())) ? format(parseISO(curLaunch.date), 'yyyy-MM-dd') : curLaunch.date} onChange={formHandler} />
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