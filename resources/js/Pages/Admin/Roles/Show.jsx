import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/pro-regular-svg-icons';

export default function Show({ roles, createUrl, status = null }) {
    return (
        <Admin>
            <NaviBar
                actions={
                    <InertiaLink href={createUrl} className="btn btn-primary btn-sm">
                        <FontAwesomeIcon icon={faPlus} fixedWidth/> New
                    </InertiaLink>
                }
            >
                Roles
            </NaviBar>
        
            <div className="container my-3">
                {status &&
                    <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                }
                <div className="row g-3">
                    {roles.map((role) => (
                        <div className="col-6 col-xl-4 col-xxl-3" key={role.id}>
                            <InertiaLink href={role.editUrl} className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h3 className="h6 mb-0">{role.name}</h3>
                                </div>
                            </InertiaLink>
                        </div>
                    ))}
                </div>
            </div>
        </Admin>
    )
}