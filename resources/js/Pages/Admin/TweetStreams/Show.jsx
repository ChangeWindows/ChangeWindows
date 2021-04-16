import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faPen } from '@fortawesome/pro-regular-svg-icons';

export default function Show({ can, auth, tweet_streams, status = null }) {
    return (
        <Admin can={can} auth={auth}>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Twitter Tweet Streams</span>
                </div>
            </nav>
        
            <div className="container my-3">
                {status &&
                    <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                }
                <div className="row g-3">
                    {tweet_streams.map((tweet_stream) => (
                        <div className="col-12 col-sm-6 col-xl-4 col-xxl-3" key={tweet_stream.id}>
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h3 className="h6 mb-0">{tweet_stream.name}</h3>
                                    <p className="text-muted mb-0 mt-n1"><small>{tweet_stream.account}</small></p>
                                </div>
                                <div className="card-footer">
                                    <InertiaLink href={tweet_stream.editUrl} className="btn btn-link btn-sm">
                                        {can.edit_tweet_streams ? <><FontAwesomeIcon icon={faPen} fixedWidth /> Edit</> : <><FontAwesomeIcon icon={faEye} fixedWidth /> Show</>}
                                    </InertiaLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Admin>
    )
}