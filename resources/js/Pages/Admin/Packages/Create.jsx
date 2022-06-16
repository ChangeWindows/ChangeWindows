import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';

import AmaranthIcon, { aiCheck, aiFloppyDisk } from '@changewindows/amaranth';

export default function Create({ urls, platforms }) {
    const [curPack, setCurPack] = useState({
        name: '',
        description: '',
        changelog: '',
        platform_id: ''
    });

    function formHandler(event) {
        const { id, value, type } = event.target;
        const _pack = Object.assign({}, curPack);

        switch (type) {
            case 'checkbox':
                _pack[id] = _pack[id] === 0 ? 1 : 0;
                break;
            default:
                _pack[id] = value;
                break;
        }

        setCurPack(_pack);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.post(urls.store_package, curPack);
    }

    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <NaviBar
                    back="/admin/packages"
                    actions={
                        <button className="btn btn-primary btn-sm" type="submit"><AmaranthIcon icon={aiFloppyDisk} /> Save</button>
                    }
                >
                    {curPack.name || 'Unnamed package'}
                </NaviBar>

                <div className="container my-3">
                    {status &&
                        <div className="alert alert-success"><AmaranthIcon icon={aiCheck} /> {status}</div>
                    }
                    <fieldset className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Identity</h4>
                            <p className="text-muted mb-0"><small>About this package.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <select className="form-select" id="platform_id" aria-label="Platform" value={curPack.platform_id ?? ''} onChange={formHandler}>
                                                    <option style={{ display: 'none' }}>Select platform</option>
                                                    {platforms.map((platform, key) => (
                                                        <option value={platform.id} key={key}>{platform.name}</option>
                                                    ))}
                                                </select>
                                                <label htmlFor="platform_id">Platform</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" value={curPack.name} onChange={formHandler} />
                                                <label htmlFor="name">Name</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control" id="description" style={{ minHeight: 80 }} defaultValue={curPack.description} onChange={formHandler}></textarea>
                                                <label htmlFor="description">Description</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Changelog</h4>
                            <p className="text-muted mb-0"><small>What's new?</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control" id="changelog" style={{ minHeight: 240 }} defaultValue={curPack.changelog} onChange={formHandler}></textarea>
                                                <label htmlFor="changelog">Changelog</label>
                                            </div>
                                        </div>
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
