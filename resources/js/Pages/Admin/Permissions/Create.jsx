import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFloppyDisk } from '@fortawesome/pro-regular-svg-icons';

export default function Create({ can, auth, urls }) {
    const [curPermission, setCurPermission] = useState({ name: '', variants: [] });

    function formHandler(event) {
        const { id, value, name } = event.target;
        const _permission = Object.assign({}, curPermission);

        switch (name) {
            case 'variant':
                if (_permission.variants.find((permission) => permission === id)) {
                    _permission.variants = _permission.variants.filter((permission) => permission !== id);
                } else {
                    _permission.variants = [..._permission.variants, id];
                }
                break;
            default:
                _permission[id] = value;
                break;
        }

        setCurPermission(_permission);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.post(urls.store_permission, curPermission);
    }

    return (
        <Admin can={can} auth={auth}>
            <form onSubmit={handleSubmit}>
                <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                    <div className="container">
                        <InertiaLink href="/admin/roles" className="btn btn-sm me-2">
                            <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                        </InertiaLink>
                        <span className="navbar-brand">{curPermission.name || 'Unnamed role'}</span>
                        <div className="flex-grow-1" />
                        <button className="btn btn-primary btn-sm" type="submit"><FontAwesomeIcon icon={faFloppyDisk} fixedWidth/> Save</button>
                    </div>
                </nav>
            
                <div className="container my-3">
                    <div className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">General</h4>
                            <p className="text-muted mb-0"><small>Basic permission settings.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" value={curPermission.name} onChange={formHandler} />
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
                            <h4 className="h5 mb-0">Variants</h4>
                            <p className="text-muted mb-0"><small>Select which variants of this permission should be created.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-2">
                                        {['', '.show', '.create', '.update', '.delete'].map((variant, key) => (
                                            <div className="col-12 col-sm-6 col-md-4" key={key}>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value="1"
                                                        id={`${curPermission.name}${variant}`}
                                                        name="variant"
                                                        checked={curPermission.variants.filter((_permission) => _permission === `${curPermission.name}${variant}`).length === 1}
                                                        onChange={formHandler}
                                                    />
                                                    <label className="form-check-label" htmlFor={`${curPermission.name}${variant}`}>
                                                        {`${curPermission.name}${variant}`}
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