import React, { useState } from "react";
import { InertiaHead } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";

import App from "../../Layouts/App";
import FlagStatus from "../../Components/_FlagStatus";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AmaranthIcon, {
  aiFloppyDisk,
  aiPen,
  aiSpinnerThird,
  aiXmark,
} from "@changewindows/amaranth";

export default function Show({ flag }) {
  const [show, setShow] = useState(false);

  console.log(flag);

  const { data, setData, post, progress, reset } = useForm({
    name: flag.name,
    description: flag.description,
  });

  function submit(e) {
    e.preventDefault();
    post(route("front.flags.suggestion", flag), {
      onSuccess: () => {
        reset();
        setShow(false);
      },
      onError: () => {
        console.log("error");
      }
    });
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <App>
      <InertiaHead title="Flags" />

      <div className="container">
        <div className="row g-1">
          <div className="col-12 titlebar">
            <h2 className="h1 mb-1">{flag.latest_content?.name || flag.feature_name}</h2>
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
              {flag.latest_content?.description || (
                <i className="text-muted">
                  This feature flag doesn't have a description yet.
                </i>
              )}
            </p>
            <Button
              variant="primary"
              size="sm"
              className="mb-3"
              onClick={handleShow}
            >
              <AmaranthIcon icon={aiPen} /> Submit a suggestion
            </Button>
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
              <div className="form-floating">
                <input
                  className="form-control"
                  placeholder="Feature name"
                  id="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <label htmlFor="email">Feature Name</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="description"
                  style={{ minHeight: 160 }}
                  defaultValue={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                />
                <label htmlFor="description">Description</label>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            <AmaranthIcon icon={aiXmark} /> Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={submit}>
            <AmaranthIcon
              icon={progress ? aiSpinnerThird : aiFloppyDisk}
              spin={progress}
            />{" "}
            {progress ? "Saving..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </App>
  );
}
