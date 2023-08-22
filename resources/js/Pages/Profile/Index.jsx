import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import App from "@/Layouts/App";
import TextField from "@/Components/UI/Forms/TextField";
import NaviBar from "@/Components/NaviBar";
import Status from "@/Components/Status";

import AmaranthIcon, {
  aiCheck,
  aiEnvelope,
  aiShieldKeyhole,
  aiSpinnerThird,
  aiPerson,
} from "@studio384/amaranth";

export default function Index({ status, user }) {
  const { data, setData, patch, processing, errors } = useForm(user);

  function submitPatch(event) {
    event.preventDefault();
    patch(route("front.profile.update", user), {
      preserveScroll: true,
    });
  }

  return (
    <App noHeader>
      <Head title="Profile" />

      <NaviBar
        actions={
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={processing}
            onClick={submitPatch}
          >
            <AmaranthIcon
              icon={processing ? aiSpinnerThird : aiCheck}
              spin={processing}
            />{" "}
            Save
          </button>
        }
      >
        {user.name}
      </NaviBar>

      <form className="container" onSubmit={submitPatch}>
        <Status status={status} />
        <fieldset className="row g-3">
          <div className="col-12 col-lg-8 col-xl-9">
            <div className="row g-3">
              <div className="col-12 pt-3">
                <p className="h6 mb-2">Details</p>
                <div className="settings-card">
                  <div className="settings-icon">
                    <AmaranthIcon icon={aiPerson} className="fs-6" />
                  </div>
                  <div className="flex-grow-1">
                    <span className="d-block">Username</span>
                  </div>
                  <div>
                    <TextField
                      id="name"
                      label="Username"
                      value={data.name}
                      errors={errors.name}
                      onChange={setData}
                      disableFloating
                    />
                  </div>
                </div>
                <div className="settings-card">
                  <div className="settings-icon">
                    <AmaranthIcon icon={aiEnvelope} className="fs-6" />
                  </div>
                  <div className="flex-grow-1">
                    <span className="d-block">Email address</span>
                  </div>
                  <div>
                    <TextField
                      type="email"
                      id="email"
                      label="Email address"
                      value={data.email}
                      errors={errors.email}
                      onChange={setData}
                      disableFloating
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 pt-3">
                <p className="h6 mb-2">Security</p>
                <div className="settings-card">
                  <div className="settings-icon">
                    <AmaranthIcon icon={aiShieldKeyhole} className="fs-6" />
                  </div>
                  <div className="flex-grow-1">
                    <span className="d-block mb-n1">Password</span>
                    <span className="d-block text-muted text-sm">
                      Manage your password
                    </span>
                  </div>
                  <div>
                    <Link
                      href={route("front.profile.password")}
                      className="btn btn-primary btn-sm"
                    >
                      <AmaranthIcon icon={aiShieldKeyhole} /> Change password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </App>
  );
}
