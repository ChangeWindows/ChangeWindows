import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faPen, faPlus } from '@fortawesome/pro-regular-svg-icons';

export default function Show({ can, releases, createUrl, status = null }) {
    return (
        <Admin>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Releases</span>
                    <div className="flex-grow-1" />
                    <InertiaLink href={createUrl} className="btn btn-primary btn-sm">
                        <FontAwesomeIcon icon={faPlus} fixedWidth/> New
                    </InertiaLink>
                </div>
            </nav>
        
            <div className="container my-3">
                {status &&
                    <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                }
                <div className="row g-3">
                    {releases.data.map((release) => {
                        return (
                            <div className="col-12 col-sm-6 col-xl-4 col-xxl-3" key={release.id}>
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex flex-row">
                                            <div className="ms-2">
                                                <h3 className="h5 mb-0">{release.name}</h3>
                                                <p className="text-muted mb-0"><small></small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <InertiaLink href={release.edit_url} className="btn btn-primary btn-sm">
                                            {can.edit_releases ? <><FontAwesomeIcon icon={faPen} fixedWidth /> Edit</> : <><FontAwesomeIcon icon={faEye} fixedWidth /> Show</>}
                                        </InertiaLink>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Admin>
    )
}