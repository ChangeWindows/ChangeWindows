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
                Launches
            </NaviBar>
        
            <div className="container">
                {status &&
                    <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                }
                <div className="row g-1">
                    {Object.keys(timeline).map((date) => (
                        <Fragment key={date}>
                            <div className="col-12 titel">
                                <h3 className="h6 text-primary">{format(parseISO(timeline[date].date), 'd MMMM yyyy')}</h3>
                            </div>
                            {timeline[date].launches.map((launch, key) => (
                                <div className="col-6 col-md-4 col-xl-3 col-xxl-2" key={key}>
                                    <InertiaLink href={launch.edit_url} className="card border-0 shadow-sm h-100">
                                        <div className="card-body d-flex flex-column">
                                            <div className="d-flex flex-row">
                                                <h3 className="h6 mb-0">
                                                    <PlatformIcon platform={launch.platform} color />
                                                </h3>
                                                <div className="ms-2">
                                                    <h3 className="h6 mb-0">Version {launch.version}</h3>
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