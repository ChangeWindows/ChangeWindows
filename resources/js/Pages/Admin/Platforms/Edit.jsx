import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import PlatformIcon from '../../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faEye, faFloppyDisk, faPen, faPlus, faTrashCan } from '@fortawesome/pro-regular-svg-icons';

export default function Edit({ can, urls, platform, platform_channels, status = null }) {
    const [curPlatform, setCurPlatform] = useState(platform);

    useEffect(() => {
        setCurPlatform(platform);
    }, [platform]);

    function formHandler(event) {
        const { id, value, type } = event.target;
        const _platform = Object.assign({}, curPlatform);

        switch (type) {
            case 'checkbox':
                _platform[id] = _platform[id] === 0 ? 1 : 0;
                break;
            default:
                _platform[id] = value;
                break;
        }

        setCurPlatform(_platform);
    }

    console.log(platform);

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.patch(urls.update_platform, curPlatform);
    }

    function handleDelete(event) {
      event.preventDefault();
      Inertia.delete(urls.destroy_platform, curPlatform);
    }

    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                    <div className="container">
                        <InertiaLink href="/admin/platforms" className="btn btn-sm me-2">
                            <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                        </InertiaLink>
                        <span className="navbar-brand"><PlatformIcon platform={curPlatform} color className="me-2" /> {curPlatform.name || 'Unnamed platform'}</span>
                        <div className="flex-grow-1" />
                        <button className="btn btn-primary btn-sm" type="submit"><FontAwesomeIcon icon={faFloppyDisk} fixedWidth/> Save</button>
                    </div>
                </nav>
            
                <div className="container my-3">
                    {status &&
                        <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                    }
                    <fieldset className="row mb-3" disabled={!can.edit_platforms}>
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Identity</h4>
                            <p className="text-muted mb-0"><small>About this platform.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" value={curPlatform.name} onChange={formHandler} />
                                                <label htmlFor="name">Name</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control" id="description" style={{ minHeight: 120 }} defaultValue={curPlatform.description} onChange={formHandler}></textarea>
                                                <label htmlFor="description">Comments</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="row mb-3" disabled={!can.edit_platforms}>
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
                                                <input type="number" className="form-control" id="position" value={curPlatform.position} onChange={formHandler} />
                                                <label htmlFor="position">Position</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="color" value={curPlatform.color} onChange={formHandler} />
                                                <label htmlFor="color">Color</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="icon" value={curPlatform.icon} onChange={formHandler} />
                                                <label htmlFor="icon">Icon</label>
                                            </div>
                                            <p className="form-text">Note that ChangeWindows only supports a limited set of icons as value here, any unsupported icon will be replaced with the Windows logo.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="row mb-3" disabled={!can.edit_platforms}>
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
                                                    checked={curPlatform.active === 1}
                                                    onChange={formHandler}
                                                />
                                                <label className="form-check-label" htmlFor="active">
                                                    Active<br />
                                                    <p className="form-text">This platform is still receiving updates.</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="1"
                                                    id="legacy"
                                                    checked={curPlatform.legacy === 1}
                                                    onChange={formHandler}
                                                />
                                                <label className="form-check-label" htmlFor="legacy">
                                                    Legacy<br />
                                                    <p className="form-text">This platform has been deprecated or is nearing deprecation.</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="1"
                                                    id="tool"
                                                    checked={curPlatform.tool === 1}
                                                    onChange={formHandler}
                                                />
                                                <label className="form-check-label" htmlFor="tool">
                                                    Tool<br />
                                                    <p className="form-text">This platform is a tool and should not be displayed beyond the timeline.</p>
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
            <div className="container my-3">
                <div className="row">
                    <div className="col-12 col-md-4 my-4 my-md-0">
                        <h4 className="h5 mb-0">Channels</h4>
                        <p className="text-muted mb-0"><small>The channels for this platform.</small></p>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="row g-3">
                            {platform_channels.map((channel) => {
                                const channelstatus = [];

                                channel.active && channelstatus.push('Active');
                                
                                return (
                                    <div className="col-12 col-sm-6 col-xl-4" key={channel.id}>
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-body">
                                                <h3 className="h5 mb-0">{channel.name}</h3>
                                                <p className="text-muted mb-0"><small>{channelstatus.join(', ')}</small></p>
                                            </div>
                                            <div className="card-footer">
                                                <InertiaLink href={channel.edit_url} className="btn btn-primary btn-sm">
                                                    {can.edit_channels ? <><FontAwesomeIcon icon={faPen} fixedWidth /> Edit</> : <><FontAwesomeIcon icon={faEye} fixedWidth /> Show</>}
                                                </InertiaLink>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {can.create_channels &&
                                <div className="col-12 col-sm-6 col-xl-4">
                                    <InertiaLink href={urls.create_channel} className="card card-add">
                                        <div className="card-body py-4">
                                            <h3 className="h5 fw-normal mb-2">New channel</h3>
                                            <h5 className="mb-0"><FontAwesomeIcon icon={faPlus} fixedWidth /></h5>
                                        </div>
                                    </InertiaLink>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {can.delete_platforms &&
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
                                                <p>Deleting a platform will remove all the content associated with that platform. Are you sure?</p>
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