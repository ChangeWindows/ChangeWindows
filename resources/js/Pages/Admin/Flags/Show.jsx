import React, { Fragment, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";

import Admin from "../../../Layouts/Admin";
import NaviBar from "../../../Components/NaviBar";
import Pagination from "../../../Components/Pagination";

import AmaranthIcon, {
  aiCheck,
  aiAngleRight,
  aiSpinnerThird,
  aiArrowUp,
} from "@changewindows/amaranth";

import clsx from "clsx";
import FlagStatus from "../../../Components/_FlagStatus";

export default function Show({
  flagStatus,
  pagination,
  status = null,
  errors,
}) {
  const { data, setData, post, progress } = useForm({
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
      <NaviBar>Flags</NaviBar>

      <div className="container">
        {status && (
          <div className="alert alert-success">
            <AmaranthIcon icon={aiCheck} /> {status}
          </div>
        )}
        <div className="row g-1">
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
                      disabled={progress}
                    >
                      <AmaranthIcon
                        icon={progress ? aiSpinnerThird : aiArrowUp}
                        spin={progress}
                      />{" "}
                      {progress ? "Processing..." : "Upload"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
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
