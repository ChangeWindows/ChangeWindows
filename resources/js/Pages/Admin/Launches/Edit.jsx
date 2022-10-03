import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Status from "@/Components/Status";

import AmaranthIcon, {
  aiFloppyDisk,
  aiTrashCan,
} from "@changewindows/amaranth";

import { parse, format, isValid, parseISO } from "date-fns";

export default function Edit({ can, launch, release, platform, status }) {
  const [curLaunch, setCurLaunch] = useState({
    date: format(parseISO(launch.date), "yyyy-MM-dd"),
  });

  function formHandler(event) {
    const { id, value, type } = event.target;
    const _launch = Object.assign({}, curLaunch);

    switch (type) {
      default:
        _launch[id] = value;
        break;
    }

    setCurLaunch(_launch);
  }

  function handleSubmit(event) {
    event.preventDefault();
    Inertia.patch(route("admin.launches.update", launch), curLaunch);
  }

  function handleDelete(event) {
    event.preventDefault();
    Inertia.delete(route("admin.launches.destroy", launch), curLaunch);
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back={route("admin.launches")}
          actions={
            <button className="btn btn-primary btn-sm" type="submit">
              <AmaranthIcon icon={aiFloppyDisk} /> Save
            </button>
          }
        >
          <PlatformIcon platform={platform} color className="me-2" />
          Version {release.version || "Unnamed launch"}
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <fieldset className="row mb-3">
            <div className="col-12 col-md-4 my-4 my-md-0">
              <h4 className="h5 mb-0">Identity</h4>
              <p className="text-muted mb-0">
                <small>The date for this launch.</small>
              </p>
            </div>
            <div className="col-12 col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <div className="form-floating">
                        <input
                          type="date"
                          className="form-control"
                          id="date"
                          value={
                            isValid(parse(curLaunch.date, "P", new Date()))
                              ? format(parseISO(curLaunch.date), "yyyy-MM-dd")
                              : curLaunch.date
                          }
                          onChange={formHandler}
                        />
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
      {can.delete_launches && (
        <form onSubmit={handleDelete}>
          <div className="container my-3">
            <div className="row">
              <div className="col-12 col-md-4 my-4 my-md-0">
                <h4 className="h5 mb-0 text-danger">Danger zone</h4>
                <p className="text-muted mb-0">
                  <small>All alone in the danger zone.</small>
                </p>
              </div>
              <div className="col-12 col-md-8">
                <div className="card">
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <p>
                          Deleting a launch will remove all the content
                          associated with that launch. Are you sure?
                        </p>
                        <button className="btn btn-danger btn-sm" type="submit">
                          <AmaranthIcon icon={aiTrashCan} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Admin>
  );
}
