import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFloppyDisk } from '@fortawesome/pro-regular-svg-icons';

export default function Create({ can, auth, permissions, urls }) {
    const [curRole, setCurRole] = useState({ name: '', permissions: [] });

    function formHandler(event) {
        const { id, value, name } = event.target;
        const _role = Object.assign({}, curRole);

        switch (name) {
            case 'permission':
                if (_role.permissions.find((role) => role === id)) {
                    _role.permissions = _role.permissions.filter((role) => role !== id);
                } else {
                    _role.permissions = [..._role.permissions, id];
                }
                break;
            default:
                _role[id] = value;
                break;
        }

        setCurRole(_role);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.post(urls.store_role, curRole);
    }

    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                    <div className="container">
                        <InertiaLink href="/admin/roles" className="btn btn-transparent btn-sm me-2">
                            <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                        </InertiaLink>
                        <span className="navbar-brand">{curRole.name || 'Unnamed role'}</span>
                        <div className="flex-grow-1" />
                        <button className="btn btn-primary btn-sm" type="submit"><FontAwesomeIcon icon={faFloppyDisk} fixedWidth/> Save</button>
                    </div>
                </nav>
            
                <div className="container my-3">
                    <div className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">General</h4>
                            <p className="text-muted mb-0"><small>Basic role settings.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" value={curRole.name} onChange={formHandler} />
                                                <label htmlFor="name">Name</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Permissions</h4>
                            <p className="text-muted mb-0"><small>What this role can do.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-2">
                                        {permissions.map((permission, key) => (
                                            <div className="col-12 col-sm-6 col-md-4" key={key}>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value="1"
                                                        id={permission.name}
                                                        name="permission"
                                                        checked={curRole.permissions.filter((_permission) => _permission === permission.name).length === 1}
                                                        onChange={formHandler}
                                                    />
                                                    <label className="form-check-label" htmlFor={permission.name}>
                                                        {permission.name}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Admin>
    )
}