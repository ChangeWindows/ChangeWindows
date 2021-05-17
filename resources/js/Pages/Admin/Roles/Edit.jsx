import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFloppyDisk, faTrashCan } from '@fortawesome/pro-regular-svg-icons';

export default function Edit({ can, role, permissions, urls, status = null }) {
    const [curRole, setCurRole] = useState(role);

    useEffect(() => {
        setCurRole(role);
    }, [role]);

    function formHandler(event) {
        const { id, value, name } = event.target;
        const _role = Object.assign({}, curRole);

        switch (name) {
            case 'permission':
                if (_role.permissions.find((role) => role === id)) {
                    _role.permissions = _role.permissions.filter((role) => role !== id);
                } else {
                    _role.permissions = [..._role.permissions, id];
                }
                break;
            default:
                _role[id] = value;
                break;
        }

        setCurRole(_role);
    }

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.patch(urls.update_role, curRole);
    }

    function handleDelete(event) {
      event.preventDefault();
      Inertia.delete(urls.delete_role, curRole);
    }

    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <NaviBar
                    back="/admin/roles"
                    actions={
                        <button className="btn btn-primary btn-sm" type="submit"><FontAwesomeIcon icon={faFloppyDisk} fixedWidth/> Save</button>
                    }
                >
                    {curRole.name || 'Unnamed role'}
                </NaviBar>
            
                <div className="container my-3">
                    {status &&
                        <div className="alert alert-success"><FontAwesomeIcon icon={faCheck} fixedWidth /> {status}</div>
                    }
                    <fieldset className="row mb-3" disabled={!can.edit_roles}>
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">General</h4>
                            <p className="text-muted mb-0"><small>Basic role settings.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" value={curRole.name} onChange={formHandler} />
                                                <label htmlFor="name">Name</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="row mb-3" disabled={!can.edit_roles}>
                        <div className="col-12 col-md-4 my-4 my-md-0">
                            <h4 className="h5 mb-0">Permissions</h4>
                            <p className="text-muted mb-0"><small>What this role can do.</small></p>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row g-2">
                                        {permissions.map((permission, key) => (
                                            <div className="col-12 col-sm-6 col-md-4" key={key}>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value="1"
                                                        id={permission.name}
                                                        name="permission"
                                                        checked={curRole.permissions.filter((_permission) => _permission === permission.name).length === 1}
                                                        onChange={formHandler}
                                                        disabled={curRole.permissions.find((_permission) => _permission === permission.name.substr(0, permission.name.indexOf('.')))}
                                                    />
                                                    <label className="form-check-label" htmlFor={permission.name}>
                                                        {permission.name}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </form>
            {can.delete_roles &&
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
            }
        </Admin>
    )
}