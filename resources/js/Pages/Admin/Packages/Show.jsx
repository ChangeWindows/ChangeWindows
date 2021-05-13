import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import PlatformIcon from '../../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faNotes, faPen, faPlus } from '@fortawesome/pro-regular-svg-icons';

export default function Show({ can, auth, packages, createUrl, status = null }) {
    return (
        <Admin>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Packages</span>
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
                    {packages.map((pack, key) => {
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={key}>
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex flex-row">
                                            <h3 className="h6 mb-0">
                                                <PlatformIcon platform={pack.platform} color />
                                            </h3>
                                            <div className="ms-2">
                                                <h3 className="h6 mb-0">{pack.name}</h3>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1" />
                                        {pack.channels && <div className="release-channels mt-3">
                                            {pack.channels.filter((channel) => channel.supported).map((channel, _key) => (
                                                <span key={_key} className="badge me-1" style={{ background: channel.color }}>{channel.short_name}</span>
                                            ))}
                                        </div>}
                                    </div>
                                    <div className="card-footer">
                                        <InertiaLink href={pack.edit_url} className="btn btn-link btn-sm">
                                            {can.edit_packages ? <><FontAwesomeIcon icon={faPen} fixedWidth /> Edit</> : <><FontAwesomeIcon icon={faEye} fixedWidth /> Show</>}
                                        </InertiaLink>
                                        <InertiaLink href={pack.edit_changelog_url} className="btn btn-link btn-sm">
                                            {can.edit_packages ? <><FontAwesomeIcon icon={faNotes} fixedWidth /> Changelog</> : <><FontAwesomeIcon icon={faEye} fixedWidth /> Changelog</>}
                                        </InertiaLink>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Admin>
    )
}