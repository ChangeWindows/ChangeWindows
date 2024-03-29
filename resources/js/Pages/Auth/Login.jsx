import React, { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";

import Auth from "@/Layouts/Auth";

import AmaranthIcon, {
  aiArrowRightToBracket,
  aiShieldKeyhole,
  aiPersonPlus,
} from "@studio384/amaranth";

export default function Login({ app, status }) {
  const [form, setForm] = useState({ email: "", password: "", remember: true });

  function handleSubmit(event) {
    event.preventDefault();
    router.post("/login", form);
  }

  return (
    <Auth>
      <Head title="Login" />

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
              type="email"
              className="form-control"
              id="email"
              value={form.email}
              onChange={(event) =>
                setForm((curLogin) => ({
                  ...curLogin,
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
                setForm((curLogin) => ({
                  ...curLogin,
                  password: event.target.value,
                }))
              }
              autoComplete="current-password"
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="1"
              id="remember"
              name="remember"
              checked={form.remember}
              onChange={() =>
                setForm((curLogin) => ({
                  ...curLogin,
                  remember: curLogin.remember ? null : true,
                }))
              }
            />
            <label className="form-check-label" htmlFor="remember">
              <span className="fw-bold">Remember me</span>
            </label>
          </div>
        </div>
        <div className="col-12 d-flex flex-column">
          <button className="btn btn-primary btn-sm py-2" type="submit">
            <AmaranthIcon icon={aiArrowRightToBracket} /> Login
          </button>
        </div>
        <div className="col-12">
          <hr className="m-0" />
        </div>
        <div className="col-12 d-flex flex-column">
          <Link href="/register" className="btn btn-light btn-sm py-2 mb-2">
            <AmaranthIcon icon={aiPersonPlus} /> Register
          </Link>
          <Link href="/forgot-password" className="btn btn-light btn-sm py-2">
            <AmaranthIcon icon={aiShieldKeyhole} /> Forgot password
          </Link>
        </div>
      </form>
    </Auth>
  );
}
