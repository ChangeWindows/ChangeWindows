import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";

import App from "@/Layouts/App";
import FlagStatus from "@/Components/_FlagStatus";
import NaviBar from "@/Components/NaviBar";
import Status from "@/Components/Status";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Amicon, {
  aiFloppyDisk,
  aiPen,
  aiSpinnerThird,
  aiXmark,
} from "@studio384/amaranth";

import clsx from "clsx";

export default function Show({ flag, flagContent, status }) {
  const [show, setShow] = useState(false);

  const { data, setData, post, patch, processing, errors } = useForm(
    flagContent ?? {
      name: flag.latest_contents?.name,
      description: flag.latest_contents?.description,
    }
  );

  function submit(e) {
    e.preventDefault();
    if (flagContent) {
      patch(route("front.flags.suggestionPatch", [flag, flagContent]), {
        onSuccess: () => {
          setShow(false);
        },
      });
    } else {
      post(route("front.flags.suggestion", flag), {
        onSuccess: () => {
          setShow(false);
        },
      });
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <App>
      <Head title="Flags" />
      <NaviBar
        back="/flags"
        actions={
          <Button variant="primary" size="sm" onClick={handleShow}>
            <Amicon icon={aiPen} />{" "}
            {flagContent ? "Edit your suggestion" : "Submit a suggestion"}
          </Button>
        }
      >
        {flag.latest_contents?.name || flag.feature_name}
      </NaviBar>

      <div className="container">
        <Status status={status} />
        <div className="row g-1">
          <div className="col-12 titlebar">
            <h2 className="h1 mb-1">
              {flag.latest_contents?.name || flag.feature_name}
            </h2>
            <h3 className="h5 fw-normal mb-3">
              {flag.feature_name}{" "}
              {flag.flag_status[0].feature_id && (
                <small className="font-monospace text-muted">
                  {flag.flag_status[0].feature_id}
                </small>
              )}
            </h3>
          </div>
          <div className="col-12">
            <p className="">
              {flag.latest_contents?.description || (
                <i className="text-muted">
                  This feature flag doesn't have a description yet.
                </i>
              )}
            </p>
          </div>
          <div className="col-12 titlebar">
            <p className="h5 fw-bold">Flag history</p>
          </div>
          <div className="col-12 timeline">
            {flag.flag_status.map((status) => (
              <div className="event px-2" key={status.id}>
                <div className="revision">{status.build}</div>
                {status.feature_id !== null && (
                  <div className="text-muted font-monospace">
                    {status.feature_id}
                  </div>
                )}
                <div className="flex-grow-1" />
                <FlagStatus flagStatus={status} hideBuild />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} as="form">
        <Modal.Header>
          <h3>Suggest a change</h3>
        </Modal.Header>
        <Modal.Body className="py-0">
          <div className="row g-3">
            <div className="col-12">
              <p className="mb-0">
                You're submission will be linked to your account if you are
                logged in. When approved it will appear on the page and you will
                appear as a source. Until then you can keep editing it.
              </p>
            </div>
            <div className="col-12">
              <div
                className={clsx("form-floating", {
                  "is-invalid": errors.name,
                })}
              >
                <input
                  required
                  className="form-control"
                  placeholder="Feature name"
                  id="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <label htmlFor="email">Feature Name</label>
              </div>
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="col-12">
              <div
                className={clsx("form-floating", {
                  "is-invalid": errors.description,
                })}
              >
                <textarea
                  id="description"
                  className="form-control"
                  style={{ minHeight: 160 }}
                  defaultValue={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                />
                <label htmlFor="description">
                  Description <small className="text-muted">- optional</small>
                </label>
              </div>
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            <Amicon icon={aiXmark} /> Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={submit}>
            <Amicon
              icon={processing ? aiSpinnerThird : aiFloppyDisk}
              spin={processing}
            />{" "}
            {processing ? "Saving..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </App>
  );
}
