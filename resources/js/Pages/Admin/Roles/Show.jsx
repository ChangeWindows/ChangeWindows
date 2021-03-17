import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faPlus } from '@fortawesome/pro-regular-svg-icons';

export default function Show({ roles, createUrl, status = null }) {
    return (
        <Admin>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <InertiaLink className="navbar-brand" href="/admin/roles">Roles</InertiaLink>
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
                    {roles.map((role) => (
                        <div className="col-12 col-sm-6 col-xl-4 col-xxl-3" key={role.id}>
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h3 className="h5 mb-0">{role.name}</h3>
                                </div>
                                <div className="card-footer">
                                    <InertiaLink href={role.editUrl} className="btn btn-primary btn-sm">
                                        <FontAwesomeIcon icon={faPen} fixedWidth/> Edit
                                    </InertiaLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Admin>
    )
}