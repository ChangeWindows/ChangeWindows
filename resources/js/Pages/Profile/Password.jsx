import React from "react";
import { Head, useForm } from "@inertiajs/react";

import App from "@/Layouts/App";
import TextField from "@/Components/UI/Forms/TextField";
import NaviBar from "@/Components/NaviBar";
import Status from "@/Components/Status";

import AmaranthIcon, {
  aiCheck,
  aiShieldKeyhole,
  aiSpinnerThird,
} from "@studio384/amaranth";

export default function Index({ status, user }) {
  const { data, setData, patch, processing, errors } = useForm(user);

  function submitPatch(event) {
    event.preventDefault();
    patch(route("front.profile.password.update", user), {
      preserveScroll: true,
    });
  }

  return (
    <App>
      <Head title="Change password" />

      <NaviBar
        back="/profile"
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
                <p className="h6 mb-2">Password</p>
                <div className="settings-card">
                  <div className="settings-icon">
                    <AmaranthIcon icon={aiShieldKeyhole} className="fs-6" />
                  </div>
                  <div className="flex-grow-1">
                    <span className="d-block">New password</span>
                  </div>
                  <div>
                    <TextField
                      required
                      type="password"
                      id="password"
                      label="New password"
                      value={data.password}
                      errors={errors.password}
                      onChange={setData}
                      disableFloating
                    />
                  </div>
                </div>
                <div className="settings-card">
                  <div className="settings-icon">
                    <AmaranthIcon icon={aiShieldKeyhole} className="fs-6" />
                  </div>
                  <div className="flex-grow-1">
                    <span className="d-block">Confirm password</span>
                  </div>
                  <div>
                    <TextField
                      required
                      type="password"
                      id="password_confirmation"
                      label="Confirm password"
                      value={data.password_confirmation}
                      errors={errors.password_confirmation}
                      onChange={setData}
                      disableFloating
                    />
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
