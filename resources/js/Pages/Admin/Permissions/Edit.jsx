import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';

import AmaranthIcon, { aiCheck, aiFloppyDisk, aiTrashCan } from '@changewindows/amaranth';

export default function Edit({ can, permission, urls, status = null }) {
  const [curPermission, setCurPermission] = useState(permission);

  useEffect(() => {
    setCurPermission(permission);
  }, [permission]);

  function formHandler(event) {
    const { id, value, name } = event.target;
    const _permission = Object.assign({}, curPermission);

    switch (name) {
      default:
        _permission[id] = value;
        break;
    }

    setCurPermission(_permission);
  }

  function handleSubmit(event) {
    event.preventDefault();
    Inertia.patch(urls.update_permission, curPermission);
  }

  function handleDelete(event) {
    event.preventDefault();
    Inertia.delete(urls.destroy_permission, curPermission);
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/permissions"
          actions={
            <button className="btn btn-primary btn-sm" type="submit"><AmaranthIcon icon={aiFloppyDisk} /> Save</button>
          }
        >
          {curPermission.name || 'Unnamed permisison'}
        </NaviBar>

        <div className="container my-3">
          {status &&
            <div className="alert alert-success"><AmaranthIcon icon={aiCheck} /> {status}</div>
          }
          <fieldset className="row mb-3" disabled={!can.edit_permissions}>
            <div className="col-12 col-md-4 my-4 my-md-0">
              <h4 className="h5 mb-0">General</h4>
              <p className="text-muted mb-0"><small>Basic permission settings.</small></p>
            </div>
            <div className="col-12 col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="name" value={curPermission.name} onChange={formHandler} />
                        <label htmlFor="name">Name</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </form>
      {can.delete_permissions &&
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
                        <p>Deleting a permission will remove all the content associated with that permission. Are you sure?</p>
                        <button className="btn btn-danger btn-sm" type="submit"><AmaranthIcon icon={aiTrashCan} /> Delete</button>
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
