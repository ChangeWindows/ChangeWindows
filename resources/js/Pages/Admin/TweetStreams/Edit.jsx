import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faFloppyDisk, faTrashCan } from '@fortawesome/pro-regular-svg-icons';

export default function Edit({ can, auth, urls, tweet_stream, status = null }) {
    const [curTweetStream, setCurTweetStream] = useState(tweet_stream);

    useEffect(() => {
        setCurTweetStream(tweet_stream);
    }, [tweet_stream]);

    function formHandler(event) {
        const { id, value, type } = event.target;
        const _tweet_stream = Object.assign({}, curTweetStream);

        switch (type) {
            default:
                _tweet_stream[id] = value;
                break;
        }

        setCurTweetStream(_tweet_stream);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.patch(urls.update_tweet_stream, curTweetStream);
    }

    function handleDelete(event) {
      event.preventDefault();
      Inertia.delete(urls.destroy_tweet_stream, curTweetStream);
    }

    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                    <div className="container">
                        <InertiaLink href="/admin/tweet_streams" className="btn btn-transparent btn-sm me-2">
                            <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
                        </InertiaLink>
                        <span className="navbar-brand">{curTweetStream.name || 'Unnamed Twitter Tweet Stream'}</span>
                        <div className="flex-grow-1" />
                        <button className="btn btn-primary btn-sm" type="submit"><FontAwesomeIcon icon={faFloppyDisk} fixedWidth/> Save</button>
                    </div>
                </nav>
            
                <div className="container my-3">
                    {status &&
                        <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                    }
                    <fieldset className="row mb-3" disabled={!can.edit_tweet_streams}>
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Identity</h4>
                            <p className="text-muted mb-0"><small>About this feed.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" value={curTweetStream.name} onChange={formHandler} />
                                                <label htmlFor="name">Name</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="account" value={curTweetStream.account} onChange={formHandler} />
                                                <label htmlFor="account">Account</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="row mb-3" disabled={!can.edit_tweet_streams}>
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Authentication</h4>
                            <p className="text-muted mb-0"><small>Connecting to the Twitter API.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="consumer_key" value={curTweetStream.consumer_key} onChange={formHandler} />
                                                <label htmlFor="consumer_key">Consumer Key</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="consumer_secret" value={curTweetStream.consumer_secret} onChange={formHandler} />
                                                <label htmlFor="consumer_secret">Consumer Secret</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="access_token" value={curTweetStream.access_token} onChange={formHandler} />
                                                <label htmlFor="access_token">Access Token</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="access_token_secret" value={curTweetStream.access_token_secret} onChange={formHandler} />
                                                <label htmlFor="access_token_secret">Access Token Secret</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </form>
            {can.delete_tweet_streams &&
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
                                                <p>Deleting a tweet stream will remove all the content associated with that tweet stream. Are you sure?</p>
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