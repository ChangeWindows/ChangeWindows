import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faFloppyDisk, faTrashCan } from '@fortawesome/pro-regular-svg-icons';

export default function Edit({ can, urls, channel, platforms, status = null }) {
    const [curChannel, setCurChannel] = useState(channel);

    useEffect(() => {
        setCurChannel(channel);
    }, [channel]);

    function formHandler(event) {
        const { id, value, type } = event.target;
        const _channel = Object.assign({}, curChannel);

        switch (type) {
            case 'checkbox':
                _channel[id] = _channel[id] === 0 ? 1 : 0;
                break;
            default:
                _channel[id] = value;
                break;
        }

        setCurChannel(_channel);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.patch(urls.update_channel, curChannel);
    }

    function handleDelete(event) {
      event.preventDefault();
      Inertia.delete(urls.destroy_channel, curChannel);
    }

    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                    <div className="container">
                        <InertiaLink href="/admin/channels" className="btn btn-sm me-2">
                            <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                        </InertiaLink>
                        <span className="navbar-brand">{curChannel.name || 'Unnamed channel'}</span>
                        <div className="flex-grow-1" />
                        <button className="btn btn-primary btn-sm" type="submit"><FontAwesomeIcon icon={faFloppyDisk} fixedWidth/> Save</button>
                    </div>
                </nav>
            
                <div className="container my-3">
                    {status &&
                        <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                    }
                    <fieldset className="row mb-3" disabled={!can.edit_channels}>
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Identity</h4>
                            <p className="text-muted mb-0"><small>About this channel.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" value={curChannel.name} onChange={formHandler} />
                                                <label htmlFor="name">Name</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <select className="form-select" id="platform_id" aria-label="Platform" value={curChannel.platform_id} onChange={formHandler}>
                                                    <option style={{ display: 'none' }}>Select platform</option>
                                                    {platforms.map((platform, key) => (
                                                        <option value={platform.id} key={key}>{platform.name}</option>
                                                    ))}
                                                </select>
                                                <label htmlFor="platform_id">Platform</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="row mb-3" disabled={!can.edit_channels}>
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Appearance</h4>
                            <p className="text-muted mb-0"><small>The way it will look.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="number" className="form-control" id="order" value={curChannel.order} onChange={formHandler} />
                                                <label htmlFor="order">Order</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="color" value={curChannel.color} onChange={formHandler} />
                                                <label htmlFor="color">Color</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="row mb-3" disabled={!can.edit_channels}>
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Status</h4>
                            <p className="text-muted mb-0"><small>The platform's current status.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-2">
                                        <div className="col-12 col-lg-6">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="1"
                                                    id="active"
                                                    checked={curChannel.active === 1}
                                                    onChange={formHandler}
                                                />
                                                <label className="form-check-label" htmlFor="active">
                                                    Active<br />
                                                    <p className="form-text">This channel is still receiving updates.</p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </form>
            {can.delete_channels &&
                <form onSubmit={handleDelete}>
                    <div className="container my-3">
                        <div className="row">
                            <div className="col-12 col-md-4 my-4 my-md-0">
                                <h4 className="h5 mb-0 text-danger">Danger zone</h4>
                                <p className="text-muted mb-0"><small>All alone in the danger zone.</small></p>
                            </div>
                            <div className="col-12 col-md-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <p>Deleting a channel will remove all the content associated with that channel. Are you sure?</p>
                                                <button className="btn btn-danger btn-sm" type="submit"><FontAwesomeIcon icon={faTrashCan} fixedWidth /> Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            }
        </Admin>
    )
}