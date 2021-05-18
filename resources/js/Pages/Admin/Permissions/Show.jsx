import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';
import Pagination from '../../../Components/Pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/pro-regular-svg-icons';

export default function Show({ permissions, pagination, createUrl, status = null }) {
    return (
        <Admin>
            <NaviBar
                actions={
                    <InertiaLink href={createUrl} className="btn btn-primary btn-sm">
                        <FontAwesomeIcon icon={faPlus} fixedWidth/> New
                    </InertiaLink>
                }
            >
                Permissions
            </NaviBar>
        
            <div className="container my-3">
                {status &&
                    <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                }
                <div className="row g-3">
                    {permissions.map((permission) => (
                        <div className="col-6 col-xl-4 col-xxl-3" key={permission.id}>
                            <InertiaLink href={permission.editUrl}  className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h3 className="h6 mb-0">{permission.name}</h3>
                                </div>
                            </InertiaLink>
                        </div>
                    ))}
                    <Pagination pagination={pagination} />
                </div>
            </div>
        </Admin>
    )
}