import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import App from '../../../Layouts/App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faTrashCan } from '@fortawesome/pro-regular-svg-icons';

export default function Edit({ user }) {
    const [curUser, setCurUser] = useState(user);

    useEffect(() => {
        setCurUser(user);
    }, [user]);

    function formHandler(event) {
        const { id, value } = event.target;
        const _user = Object.assign({}, curUser);

        _user[id] = value;

        setCurUser(_user);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.patch('/admin/users/edit/1', curUser);
    }

    function handleDelete(event) {
      event.preventDefault();
      Inertia.delete('/admin/users/edit/1', curUser);
    }

    return (
        <App>
            <form onSubmit={handleSubmit}>
                <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                    <div className="container">
                        <a className="navbar-brand" href="#">{user.name}</a>
                        <button className="btn btn-primary btn-sm" type="submit"><FontAwesomeIcon icon={faFloppyDisk} fixedWidth/> Save</button>
                    </div>
                </nav>
            
                <div className="container my-3">
                    <div className="row">
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Identity</h4>
                            <p className="text-muted mb-0"><small>Hello! Who are you?</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" value={curUser.name} onChange={formHandler} />
                                                <label htmlFor="name">Name</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" id="email" placeholder="name@example.com" value={curUser.email} onChange={formHandler} />
                                                <label htmlFor="email">Email address</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
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
                                            <p>Deleting a user will remove all the content associated with that user. Are you sure?</p>
                                            <button className="btn btn-danger btn-sm" type="submit"><FontAwesomeIcon icon={faTrashCan} fixedWidth /> Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </App>
    )
}