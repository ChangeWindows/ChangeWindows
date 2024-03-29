import React, { Fragment, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import Pagination from "@/Components/Pagination";
import Status from "@/Components/Status";

import AmaranthIcon, {
  aiAngleRight,
  aiSpinnerThird,
  aiArrowUp,
  aiClockRotateLeft,
  aiFlag,
} from "@studio384/amaranth";

import clsx from "clsx";
import FlagStatus from "@/Components/_FlagStatus";

export default function Show({ can, flagStatus, pagination, status, errors }) {
  const { data, setData, post, processing } = useForm({
    build: "",
    file: "",
  });

  function submit(e) {
    e.preventDefault();
    post(route("admin.flags.batch"));
  }

  useEffect(() => {
    if (data.file) {
      setData(
        "build",
        data.file[0]?.name.substr(0, data.file[0].name.lastIndexOf("."))
      );
    }
  }, [data.file]);

  return (
    <Admin>
      <NaviBar>
        <nav className="navbar navbar-expand navbar-light sticky-top">
          <div className="container">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" href="/admin/flags">
                  <AmaranthIcon icon={aiFlag} />{" "}
                  <span className="d-none d-sm-inline-block ms-1">Manage</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  href="/admin/flags/history"
                >
                  <AmaranthIcon icon={aiClockRotateLeft} />{" "}
                  <span className="d-none d-sm-inline-block ms-1">History</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </NaviBar>

      <div className="container my-2">
        <Status status={status} />
        <div className="row g-1">
          {can.flags.create && (
            <>
              <div className="col-12 col-md-4 my-4 my-md-0">
                <h4 className="h5 mb-0">Upload flags</h4>
                <p className="text-muted mb-0">
                  <small>Enter a file generated by Mach2.</small>
                </p>
              </div>
              <form onSubmit={submit} className="col-12 col-md-8">
                <div className="card">
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12 col-sm-6">
                        <div className="form-floating">
                          <input
                            type="file"
                            className={clsx("form-control flex-grow-1", {
                              "is-invalid": errors.file,
                            })}
                            id="file"
                            name="file"
                            onChange={(e) => setData("file", e.target.files)}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="build"
                            value={data.build}
                            onChange={(e) => setData("build", e.target.value)}
                          />
                          <label htmlFor="build">Build</label>
                        </div>
                      </div>
                      <div className="col-12 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm"
                          disabled={processing}
                        >
                          <AmaranthIcon
                            icon={processing ? aiSpinnerThird : aiArrowUp}
                            spin={processing}
                          />{" "}
                          {processing ? "Processing..." : "Upload"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
          <h4>Flags</h4>
          {flagStatus.map((flag) => (
            <Fragment key={flag.id}>
              <div className="px-3 py-2 bg-dark rounded-2 d-flex flex-row align-items-center">
                <div className="text-muted font-monospace me-2">
                  {flag.feature_id}
                </div>
                <div>
                  {flag.flag?.feature_name} &middot;{" "}
                  {flag.flag.flag_status.length}
                </div>
                <div className="flex-grow-1" />
                {flag.flag.latest_status_change.length > 1 ? (
                  <>
                    <FlagStatus
                      flagStatus={flag.flag.latest_status_change[1]}
                    />
                    <AmaranthIcon icon={aiAngleRight} />
                    <FlagStatus
                      flagStatus={flag.flag.latest_status_change[0]}
                    />
                  </>
                ) : (
                  <FlagStatus flagStatus={flag.flag.latest_status_change[0]} />
                )}
              </div>
            </Fragment>
          ))}
          <Pagination pagination={pagination} />
        </div>
      </div>
    </Admin>
  );
}
