import React, { Fragment } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';
import Pagination from '../../../Components/Pagination';
import PlatformIcon from '../../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faPen, faPlus } from '@fortawesome/pro-regular-svg-icons';
import { format, parseISO } from 'date-fns';

export default function Show({ can, timeline, pagination, createUrl, createPackageUrl, status = null }) {
    return (
        <Admin>
            <NaviBar
                actions={
                    <>
                        <InertiaLink href={createUrl} className="btn btn-primary btn-sm">
                            <FontAwesomeIcon icon={faPlus} fixedWidth/> Flight
                        </InertiaLink>
                        <InertiaLink href={createPackageUrl} className="btn btn-primary btn-sm ms-1">
                            <FontAwesomeIcon icon={faPlus} fixedWidth/> Package
                        </InertiaLink>
                    </>
                }
            >
                Flights
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
                            {timeline[date].flights.map((flight, key) => (
                                <div className="col-12 col-sm-6 col-md-4 col-xl-3 col-xxl-2" key={key}>
                                    <div className="card border-0 shadow-sm h-100">
                                        <div className="card-body d-flex flex-column">
                                            <div className="d-flex flex-row">
                                                <h3 className="h6 mb-0">
                                                    <PlatformIcon platform={flight.platform} color />
                                                </h3>
                                                <div className="ms-2">
                                                    <h3 className="h6 mb-0">{flight.version}</h3>
                                                    <span key={key} className="badge me-1" style={{ background: flight.release_channel.color }}>{flight.release_channel.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <InertiaLink href={flight.edit_url} className="btn btn-link btn-sm">
                                                {can.edit_flights ? <><FontAwesomeIcon icon={faPen} fixedWidth /> Edit</> : <><FontAwesomeIcon icon={faEye} fixedWidth /> Show</>}
                                            </InertiaLink>
                                        </div>
                                    </div>
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