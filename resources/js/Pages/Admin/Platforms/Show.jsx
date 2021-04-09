import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';

import PlatformIcon from '../../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faPen, faPlus } from '@fortawesome/pro-regular-svg-icons';

export default function Show({ can, auth, platforms, createUrl, status = null }) {
    return (
        <Admin can={can} auth={auth}>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Platforms</span>
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
                    {platforms.data.map((platform) => {
                        const platformStatus = [];

                        platform.active && platformStatus.push('Active');
                        platform.legacy && platformStatus.push('Legacy');
                        
                        return (
                            <div className="col-12 col-sm-6 col-xl-4 col-xxl-3" key={platform.id}>
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex flex-row">
                                            <h3 className="h6 mb-0"><PlatformIcon platform={platform} color /></h3>
                                            <div className="ms-2">
                                                <h3 className="h6 mb-0">{platform.name}</h3>
                                                <p className="text-muted mb-0 mt-n1"><small>{platformStatus.join(', ')}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <InertiaLink href={platform.edit_url} className="btn btn-link btn-sm">
                                            {can.edit_platforms ? <><FontAwesomeIcon icon={faPen} fixedWidth /> Edit</> : <><FontAwesomeIcon icon={faEye} fixedWidth /> Show</>}
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