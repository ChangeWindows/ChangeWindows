import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";

import Auth from "@/Layouts/Auth";

import AmaranthIcon, { aiUserPlus } from "@changewindows/amaranth";

export default function Register({ app, status }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    router.post("/register", form);
  }

  return (
    <Auth>
      <Head title="Register" />

      <form onSubmit={handleSubmit} className="row g-3">
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
              type="text"
              className="form-control"
              id="name"
              value={form.name}
              onChange={(event) =>
                setForm((curForm) => ({ ...curForm, name: event.target.value }))
              }
              autoFocus
            />
            <label htmlFor="name">Name</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              value={form.email}
              onChange={(event) =>
                setForm((curForm) => ({
                  ...curForm,
                  email: event.target.value,
                }))
              }
              autoFocus
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              value={form.password}
              onChange={(event) =>
                setForm((curForm) => ({
                  ...curForm,
                  password: event.target.value,
                }))
              }
              autoComplete="new-password"
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password_confirmation"
              value={form.password_confirmation}
              onChange={(event) =>
                setForm((curForm) => ({
                  ...curForm,
                  password_confirmation: event.target.value,
                }))
              }
            />
            <label htmlFor="password_confirmation">Confirm password</label>
          </div>
        </div>
        <div className="col-12 d-flex flex-column">
          <button className="btn btn-primary btn-sm py-2" type="submit">
            <AmaranthIcon icon={aiUserPlus} /> Register
          </button>
        </div>
      </form>
    </Auth>
  );
}
