import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';
import PlatformIcon from '../../../Components/Platforms/PlatformIcon';

import AmaranthIcon, { aiCheck, aiPlus } from '@changewindows/amaranth';

export default function Show({ packages, createUrl, status = null }) {
    return (
        <Admin>
            <NaviBar
                actions={
                    <InertiaLink href={createUrl} className="btn btn-primary btn-sm">
                        <AmaranthIcon icon={aiPlus} fixedWidth/> New
                    </InertiaLink>
                }
            >
                Packages
            </NaviBar>
        
            <div className="container">
                {status &&
                    <div className="alert alert-success"><AmaranthIcon icon={aiCheck} fixedWidth /> {status}</div>
                }
                <div className="row g-1">
                    {packages.map((pack, key) => (
                        <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={key}>
                            <InertiaLink href={pack.edit_url} className="card border-0 shadow-sm h-100">
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
                                    {pack.channels.length > 0 && <div className="release-channels mt-3">
                                        {pack.channels.map((channel, _key) => (
                                            <span key={_key} className="badge me-1" style={{ background: channel.color }}>{channel.short_name}</span>
                                        ))}
                                    </div>}
                                </div>
                            </InertiaLink>
                        </div>
                    ))}
                </div>
            </div>
        </Admin>
    )
}