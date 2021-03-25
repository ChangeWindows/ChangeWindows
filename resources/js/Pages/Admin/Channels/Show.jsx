import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation, faEye, faPen, faPlus } from '@fortawesome/pro-regular-svg-icons';

export default function Show({ can, channels, createUrl, status = null }) {
    return (
        <Admin>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Channels</span>
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
                <div className="col-12">
                    <div className="alert alert-warning d-flex">
                        <p className="me-2 mb-0"><FontAwesomeIcon icon={faCircleExclamation} fixedWidth /></p>
                        <p className="mb-0">This page functions as a temporary overview of all channels, it will be removed in favor of the platform settings in the future.</p>
                    </div>
                </div>
                <div className="row g-3">
                    {channels.map((channel) => {
                        const channelstatus = [];

                        channel.active && channelstatus.push('Active');
                        
                        return (
                            <div className="col-12 col-sm-6 col-xl-4 col-xxl-3" key={channel.id}>
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <h3 className="h5 mb-0">{channel.platform_id} {channel.name}</h3>
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
                </div>
            </div>
        </Admin>
    )
}