import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';
import Pagination from '../../../Components/Pagination';

import AmaranthIcon, { aiCheck, aiPlus } from '@changewindows/amaranth';

export default function Show({ permissions, pagination, createUrl, status = null }) {
    return (
        <Admin>
            <NaviBar
                actions={
                    <InertiaLink href={createUrl} className="btn btn-primary btn-sm">
                        <AmaranthIcon icon={aiPlus}/> New
                    </InertiaLink>
                }
            >
                Permissions
            </NaviBar>
        
            <div className="container">
                {status &&
                    <div className="alert alert-success"><AmaranthIcon icon={aiCheck} /> {status}</div>
                }
                <div className="row g-1">
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