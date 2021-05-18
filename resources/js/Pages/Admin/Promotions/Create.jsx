import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Admin from '../../../Layouts/Admin';
import PlatformIcon from '../../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFloppyDisk } from '@fortawesome/pro-regular-svg-icons';

import { format, isDate, parseISO } from 'date-fns';

export default function Create({ urls, releases }) {
    const [curPromotion, setCurPromotion] = useState({
        channel: null,
        date: format(new Date(), 'yyyy-MM-dd')
    });

    function formHandler(event) {
        const { id, value, name } = event.target;
        const _promotion = Object.assign({}, curPromotion);

        switch (name) {
            case 'channel':
                _promotion.channel = Number(id);
                break;
            default:
                _promotion[id] = value;
                break;
        }

        setCurPromotion(_promotion);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.post(urls.store_promotion, curPromotion);
    }

    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <NaviBar
                    back="/admin/promotions"
                    actions={
                        <button className="btn btn-primary btn-sm" type="submit"><FontAwesomeIcon icon={faFloppyDisk} fixedWidth/> Save</button>
                    }
                >
                    New promotion
                </NaviBar>
            
                <div className="container my-3">
                    {status &&
                        <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                    }
                    <fieldset className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Build string</h4>
                            <p className="text-muted mb-0"><small>The build string for this flight.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="date" value={isDate(parseISO(curPromotion.date)) ? format(parseISO(curPromotion.date), 'yyyy-MM-dd') : curPromotion.date} onChange={formHandler} />
                                                <label htmlFor="date">Date</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Release channels</h4>
                            <p className="text-muted mb-0"><small>All channels without a promotion.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        {releases.filter((release) => release.channels.length !== 0).map((release, key) => (
                                            <div className="col-12 col-lg-6" key={key}>
                                                <div className="d-flex mb-1">
                                                    <div className="me-2">
                                                        <PlatformIcon platform={release.platform} color />
                                                    </div>
                                                    <div className="d-flex flex-column">
                                                        <span className="fw-bold">{release.name}</span>
                                                        <small className="text-muted mt-n1">{`${release.start_build}.${release.start_delta}`} - {`${release.end_build}.${release.end_delta}`}</small>
                                                    </div>
                                                </div>
                                                {release.channels.map((channel, key) => (
                                                    <div className="form-check" key={key}>
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            value="1"
                                                            id={channel.id}
                                                            name="channel"
                                                            checked={curPromotion.channel === channel.id}
                                                            onChange={formHandler}
                                                        />
                                                        <label className="form-check-label" htmlFor={channel.id}>
                                                            <span style={{ color: channel.color}}>
                                                                {channel.name}
                                                            </span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                        {releases.length === 0 && 
                                            <div className="col-12">
                                                {version === '10.0.' ?
                                                    <p className="mb-0">Enter a string to get started...</p>
                                                :
                                                    <p className="mb-0">This build doesn't seem to match any release...</p>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </form>
        </Admin>
    )
}