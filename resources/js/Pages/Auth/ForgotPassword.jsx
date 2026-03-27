import React, { useState } from "react";

import Auth from "@/Layouts/Auth";

import { Head, router } from "@inertiajs/react";
import Amicon, { aiPaperPlane } from "@studio384/amaranth";

export default function ForgotPassword({ app, status }) {
  const [form, setForm] = useState({ email: "" });

  function handleSubmit(event) {
    event.preventDefault();
    router.post("/forgot-password", form);
  }

  return (
    <Auth>
      <Head title="Forgot Password" />

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <p>
            <small>
              Forgot your password? No problem. Just let us know your email address and we will email you a password
              reset link that will allow you to choose a new one.
            </small>
          </p>
        </div>
        {Object.keys(status).length > 0 && (
          <div className="col-12">
            <div className="alert alert-danger mb-0">
              {Object.keys(status).map((errorGroup, _key) =>
                status[errorGroup].map((error, key) => <span key={key}>{error}</span>),
              )}
            </div>
          </div>
        )}
        <div className="col-12">
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              value={form.email}
              onChange={(event) => setForm({ email: event.target.value })}
              autoFocus
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="d-flex flex-column col-12">
          <button className="btn btn-primary btn-sm py-2" type="submit">
            <Amicon icon={aiPaperPlane} /> Send password reset link
          </button>
        </div>
      </form>
    </Auth>
  );
}
