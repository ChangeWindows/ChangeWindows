import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";

import Auth from "@/Layouts/Auth";

import Amicon, { aiCheck } from "@studio384/amaranth";

export default function ConfirmPassword({ app, status }) {
  const [form, setForm] = useState({ password: "" });

  function handleSubmit(event) {
    event.preventDefault();
    router.post("/reset-password", form);
  }

  return (
    <Auth>
      <Head title="Confirm Password" />

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <p>
            <small>
              This is a secure area of the application. Please confirm your
              password before continuing.
            </small>
          </p>
        </div>
        {Object.keys(status).length > 0 && (
          <div className="col-12">
            <div className="alert alert-danger mb-0">
              {Object.keys(status).map((errorGroup, _key) =>
                status[errorGroup].map((error, key) => (
                  <span key={key}>{error}</span>
                ))
              )}
            </div>
          </div>
        )}
        <div className="col-12">
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              value={form.password}
              onChange={(event) => setForm({ password: event.target.value })}
              autoComplete="current-password"
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="col-12 d-flex flex-column">
          <button className="btn btn-primary btn-sm py-2" type="submit">
            <Amicon icon={aiCheck} /> Confirm
          </button>
        </div>
      </form>
    </Auth>
  );
}
