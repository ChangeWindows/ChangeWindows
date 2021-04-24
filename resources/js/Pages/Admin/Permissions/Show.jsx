import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import Pagination from '../../../Components/Pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faPen, faPlus } from '@fortawesome/pro-regular-svg-icons';

export default function Show({ can, auth, permissions, pagination, createUrl, status = null }) {
    return (
        <Admin can={can} auth={auth}>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Permissions</span>
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
                    {permissions.map((permission) => (
                        <div className="col-12 col-sm-6 col-xl-4 col-xxl-3" key={permission.id}>
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h3 className="h6 mb-0">{permission.name}</h3>
                                </div>
                                <div className="card-footer">
                                    <InertiaLink href={permission.editUrl} className="btn btn-link btn-sm">
                                        {can.edit_permissions ? <><FontAwesomeIcon icon={faPen} fixedWidth /> Edit</> : <><FontAwesomeIcon icon={faEye} fixedWidth /> Show</>}
                                    </InertiaLink>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Pagination pagination={pagination} />
                </div>
            </div>
        </Admin>
    )
}