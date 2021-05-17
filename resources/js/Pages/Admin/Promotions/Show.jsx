import React, { Fragment } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';
import PlatformIcon from '../../../Components/Platforms/PlatformIcon';
import Pagination from '../../../Components/Pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/pro-regular-svg-icons';
import { format, parseISO } from 'date-fns';

export default function Show({ timeline, pagination, createUrl, status = null }) {
    return (
        <Admin>
            <NaviBar
                actions={
                    <InertiaLink href={createUrl} className="btn btn-primary btn-sm">
                        <FontAwesomeIcon icon={faPlus} fixedWidth/> New
                    </InertiaLink>
                }
            >
                Promotions
            </NaviBar>
        
            <div className="container my-3">
                {status &&
                    <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                }
                <div className="row g-3">
                    {Object.keys(timeline).map((date) => (
                        <Fragment key={date}>
                            <div className="col-12">
                                <h6 className="m-0">{format(parseISO(timeline[date].date), 'd MMMM yyyy')}</h6>
                            </div>
                            {timeline[date].promotions.map((promotion, key) => (
                                <div className="col-12 col-sm-6 col-md-4 col-xl-3 col-xxl-2" key={key}>
                                    <InertiaLink href={promotion.edit_url} className="card border-0 shadow-sm h-100">
                                        <div className="card-body d-flex flex-column">
                                            <div className="d-flex flex-row">
                                                <h3 className="h6 mb-0">
                                                    <PlatformIcon platform={promotion.platform} color />
                                                </h3>
                                                <div className="ms-2">
                                                    <h3 className="h6 mb-1">Version {promotion.version}</h3>
                                                    <span key={key} className="badge me-1" style={{ background: promotion.release_channel.color }}>{promotion.release_channel.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </InertiaLink>
                                </div>
                            ))}
                        </Fragment>
                    ))}
                    <Pagination pagination={pagination} />
                </div>
            </div>
        </Admin>
    )
}