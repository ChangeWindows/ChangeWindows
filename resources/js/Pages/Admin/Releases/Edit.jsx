import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faPen, faEye, faPlus, faFloppyDisk, faTrashCan } from '@fortawesome/pro-regular-svg-icons';

import { format, parseISO } from 'date-fns';

export default function Edit({ can, urls, platforms, release, release_channels, status = null }) {
    const [curRelease, setCurRelease] = useState(release);

    useEffect(() => {
        setCurRelease(release);
    }, [release]);

    function formHandler(event) {
        const { id, value, type } = event.target;
        const _release = Object.assign({}, curRelease);

        switch (type) {
            case 'checkbox':
                _release[id] = _release[id] === 0 ? 1 : 0;
                break;
            default:
                _release[id] = value;
                break;
        }

        setCurRelease(_release);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.patch(urls.update_release, curRelease);
    }

    function handleDelete(event) {
      event.preventDefault();
      Inertia.delete(urls.destroy_release, curRelease);
    }

    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                    <div className="container">
                        <InertiaLink href="/admin/releases" className="btn btn-sm me-2">
                            <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                        </InertiaLink>
                        <span className="navbar-brand">{curRelease.name || 'Unnamed release'}</span>
                        <div className="flex-grow-1" />
                        <button className="btn btn-primary btn-sm" type="submit"><FontAwesomeIcon icon={faFloppyDisk} fixedWidth/> Save</button>
                    </div>
                </nav>
            
                <div className="container my-3">
                    {status &&
                        <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                    }
                    <fieldset className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Identity</h4>
                            <p className="text-muted mb-0"><small>About this release.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <select className="form-select" disabled id="platform_id" aria-label="Platform" value={curRelease.platform_id} onChange={formHandler}>
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
                                                <input type="text" className="form-control" id="name" value={curRelease.name} onChange={formHandler} />
                                                <label htmlFor="name">Name</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="version" value={curRelease.version} onChange={formHandler} />
                                                <label htmlFor="version">Version</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="canonical_version" value={curRelease.canonical_version} onChange={formHandler} />
                                                <label htmlFor="canonical_version">Canonical version</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="codename" value={curRelease.codename} onChange={formHandler} />
                                                <label htmlFor="codename">Codename</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control" id="description" style={{ minHeight: 80 }} defaultValue={curRelease.description} onChange={formHandler}></textarea>
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
                                                <textarea className="form-control" id="changelog" style={{ minHeight: 240 }} defaultValue={curRelease.changelog} onChange={formHandler}></textarea>
                                                <label htmlFor="changelog">Changelog</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Life cycle</h4>
                            <p className="text-muted mb-0"><small>Dates related to the life cycle of the release.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="start_preview" value={format(parseISO(curRelease.start_preview), 'y-MM-dd')} onChange={formHandler} />
                                                <label htmlFor="start_preview">Start preview</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="start_public" value={format(parseISO(curRelease.start_public), 'y-MM-dd')} onChange={formHandler} />
                                                <label htmlFor="start_public">Start public</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="start_extended" value={format(parseISO(curRelease.start_extended), 'y-MM-dd')} onChange={formHandler} />
                                                <label htmlFor="start_extended">Start extended</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="start_lts" value={format(parseISO(curRelease.start_lts), 'y-MM-dd')} onChange={formHandler} />
                                                <label htmlFor="start_lts">Start LTS</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="end_lts" value={format(parseISO(curRelease.end_lts), 'y-MM-dd')} onChange={formHandler} />
                                                <label htmlFor="end_lts">End LTS</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Flight range</h4>
                            <p className="text-muted mb-0"><small>The range within all flights of this release fall.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-2">
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="number" className="form-control" id="start_build" value={curRelease.start_build} onChange={formHandler} />
                                                <label htmlFor="start_build">Start build</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="number" className="form-control" id="start_delta" value={curRelease.start_delta} onChange={formHandler} />
                                                <label htmlFor="start_delta">Start delta</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="number" className="form-control" id="end_build" value={curRelease.end_build} onChange={formHandler} />
                                                <label htmlFor="end_build">End build</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="number" className="form-control" id="end_delta" value={curRelease.end_delta} onChange={formHandler} />
                                                <label htmlFor="end_delta">End delta</label>
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
                        <h4 className="h5 mb-0">Release channels</h4>
                        <p className="text-muted mb-0"><small>The channels for this release.</small></p>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="row g-3">
                            {release_channels.map((releaseChannel) => {
                                const releaseChannelstatus = [];

                                releaseChannel.active && releaseChannelstatus.push('Active');
                                
                                return (
                                    <div className="col-12 col-sm-6 col-xl-4" key={releaseChannel.id}>
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-body">
                                                <h3 className="h5 mb-0">{releaseChannel.name}</h3>
                                                <p className="text-muted mb-0"><small>{releaseChannelstatus.join(', ')}</small></p>
                                            </div>
                                            <div className="card-footer">
                                                <InertiaLink href={releaseChannel.edit_url} className="btn btn-primary btn-sm">
                                                    {can.edit_releases ? <><FontAwesomeIcon icon={faPen} fixedWidth /> Edit</> : <><FontAwesomeIcon icon={faEye} fixedWidth /> Show</>}
                                                </InertiaLink>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {can.edit_releases &&
                                <div className="col-12 col-sm-6 col-xl-4">
                                    <InertiaLink href={urls.create_release_channel} className="card card-add">
                                        <div className="card-body py-4">
                                            <h3 className="h5 fw-normal mb-2">New release channel</h3>
                                            <h5 className="mb-0"><FontAwesomeIcon icon={faPlus} fixedWidth /></h5>
                                        </div>
                                    </InertiaLink>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {can.delete_releases &&
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
                                                <p>Deleting a release will remove all the content associated with that release. Are you sure?</p>
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