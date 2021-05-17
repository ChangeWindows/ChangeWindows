import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/pro-regular-svg-icons';

export default function Show({ tweet_streams, createUrl, status = null }) {
    return (
        <Admin>
            <NaviBar
                actions={
                    <InertiaLink href={createUrl} className="btn btn-primary btn-sm">
                        <FontAwesomeIcon icon={faPlus} fixedWidth/> New
                    </InertiaLink>
                }
            >
                Twitter Tweet Streams
            </NaviBar>
        
            <div className="container my-3">
                {status &&
                    <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                }
                <div className="row g-3">
                    {tweet_streams.map((tweet_stream) => (
                        <div className="col-12 col-sm-6 col-xl-4 col-xxl-3" key={tweet_stream.id}>
                            <InertiaLink href={tweet_stream.editUrl} className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h3 className="h6 mb-0">{tweet_stream.name}</h3>
                                    <p className="text-muted mb-0 mt-n1"><small>{tweet_stream.account}</small></p>
                                </div>
                            </InertiaLink>
                        </div>
                    ))}
                </div>
            </div>
        </Admin>
    )
}