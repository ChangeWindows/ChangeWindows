import React, { useEffect, useMemo, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faPen, faEye, faPlus, faFloppyDisk, faTrashCan } from '@fortawesome/pro-regular-svg-icons';

import { format, parseISO } from 'date-fns';

export default function Edit({ can, auth, urls, platforms, pack, channels, release_channels, status = null }) {
    const [curPack, setCurPack] = useState({
        name: '',
        description: '',
        changelog: '',
        platform_id: null
    });

    useEffect(() => {
        setCurPack(pack);
    }, [pack]);

    function formHandler(event) {
        const { id, value, type } = event.target;
        const _package = Object.assign({}, curPack);

        switch (type) {
            case 'checkbox':
                _package[id] = _package[id] === 0 ? 1 : 0;
                break;
            default:
                _package[id] = value;
                break;
        }

        setCurPack(_package);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.patch(urls.update_package, curPack);
    }

    function handleDelete(event) {
      event.preventDefault();
      Inertia.delete(urls.destroy_package, curPack);
    }

    const availablePlatformChannels = useMemo(() => channels.filter((channel) => !release_channels.find((releaseChannel) => releaseChannel.channel_id === channel.id)), [channels, release_channels]);

    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                    <div className="container">
                        <InertiaLink href="/admin/packages" className="btn btn-transparent btn-sm me-2">
                            <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                        </InertiaLink>
                        <span className="navbar-brand">{curPack.name || 'Unnamed package'}</span>
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
                            <p className="text-muted mb-0"><small>About this package.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <select className="form-select" disabled id="platform_id" aria-label="Platform" value={curPack.platform_id ?? ''} onChange={formHandler}>
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
            <div className="container my-3">
                <div className="row">
                    <div className="col-12 col-md-4 my-4 my-md-0">
                        <h4 className="h5 mb-0">Package channels</h4>
                        <p className="text-muted mb-0"><small>The channels for this package.</small></p>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="row g-3">
                            {release_channels.map((releaseChannel, key) => {
                                const releaseChannelstatus = [];

                                releaseChannelstatus.push(releaseChannel.short_name)
                                releaseChannel.supported && releaseChannelstatus.push('Supported');
                                
                                return (
                                    <div className="col-12 col-sm-6 col-xl-4" key={key}>
                                        <div className="card border-0 shadow-sm h-100">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <h3 className="h6 mb-0">
                                                        <div className="dot" style={{ backgroundColor: releaseChannel.color }} />
                                                    </h3>
                                                    <div className="ms-2">
                                                        <h3 className="h6 mb-0">{releaseChannel.name}</h3>
                                                        <p className="text-muted mb-0"><small>{releaseChannelstatus.join(', ')}</small></p>
                                                    </div>
                                                </div>
                                                <div className="flex-grox-1" />
                                            </div>
                                            <div className="card-footer">
                                                <InertiaLink href={releaseChannel.edit_url} className="btn btn-link btn-sm">
                                                    {can.edit_packages ? <><FontAwesomeIcon icon={faPen} fixedWidth /> Edit</> : <><FontAwesomeIcon icon={faEye} fixedWidth /> Show</>}
                                                </InertiaLink>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {can.edit_packages && availablePlatformChannels.length > 0 &&
                                <div className="col-12 col-sm-6 col-xl-4">
                                    <div className="dropdown h-100">
                                        <a href="#" className="card card-add dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                            <div className="card-body py-3">
                                                <h3 className="h5 fw-normal mb-2">New package channel</h3>
                                                <h5 className="mb-0"><FontAwesomeIcon icon={faPlus} fixedWidth /></h5>
                                            </div>
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            {availablePlatformChannels.map((channel, key) => (
                                                <InertiaLink key={key}  href={`${urls.create_package_channel}&channel=${channel.id}`} className="dropdown-item d-flex align-items-center">
                                                    <div className="dot" style={{ backgroundColor: channel.color, padding: 0, margin: '4px 0 0 0' }} /> <div className="ms-2">{channel.name}</div>
                                                </InertiaLink>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {can.delete_packages &&
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
                                                <p>Deleting a package will remove all the content associated with that package. Are you sure?</p>
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