import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';
import PlatformIcon from '../../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFloppyDisk, faTrashCan } from '@fortawesome/pro-regular-svg-icons';

import { parse, format, isValid, parseISO } from 'date-fns';

export default function Edit({ can, urls, promotion, release, platform, release_channel, status = null }) {
    const [curPromotion, setCurPromotion] = useState({
        date: format(parseISO(promotion.date), 'yyyy-MM-dd')
    });

    function formHandler(event) {
        const { id, value, type } = event.target;
        const _promotion = Object.assign({}, curPromotion);

        switch (type) {
            default:
                _promotion[id] = value;
                break;
        }

        setCurPromotion(_promotion);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.patch(urls.update_promotion, curPromotion);
    }

    function handleDelete(event) {
      event.preventDefault();
      Inertia.delete(urls.destroy_promotion, curPromotion);
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
                    <PlatformIcon platform={platform} color className="me-2" />
                    Version {release.version || 'Unnamed promotion'}
                    <span className="badge ms-2" style={{ background: release_channel.color }}>{release_channel.name}</span>
                </NaviBar>
            
                <div className="container my-3">
                    {status &&
                        <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                    }
                    <fieldset className="row mb-3">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Identity</h4>
                            <p className="text-muted mb-0"><small>The date for this promotion.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="date" value={isValid(parse(curPromotion.date, 'P', new Date())) ? format(parseISO(curPromotion.date), 'yyyy-MM-dd') : curPromotion.date} onChange={formHandler} />
                                                <label htmlFor="date">Date</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </form>
            {can.delete_promotions &&
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
                                                <p>Deleting a promotion will remove all the content associated with that promotion. Are you sure?</p>
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