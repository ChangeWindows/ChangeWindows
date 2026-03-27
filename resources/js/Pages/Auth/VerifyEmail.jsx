import React from "react";

import Auth from "@/Layouts/Auth";

import { Head, router } from "@inertiajs/react";
import Amicon, { aiArrowRightFromBracket, aiPaperPlane } from "@studio384/amaranth";

export default function VerifyEmail({ app, session, status }) {
  function handleSubmit(event) {
    event.preventDefault();
    router.post("/email/verification-notification", form);
  }

  function handleLogout(event) {
    event.preventDefault();
    router.post("/logout", form);
  }

  return (
    <Auth>
      <Head title="Verify Email" />

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <p>
            <small>
              Thanks for signing up! Before getting started, could you verify your email address by clicking on the link
              we just emailed to you? If you didn't receive the email, we will gladly send you another.
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
        {session && (
          <div className="col-12">
            <p>
              <small>
                A new verification link has been sent to the email address you provided during registration.
              </small>
            </p>
          </div>
        )}
        <div className="d-flex flex-column col-12">
          <button className="btn btn-primary btn-sm mb-2 py-2" type="submit">
            <Amicon icon={aiPaperPlane} /> Resend verification email
          </button>
          <button className="btn btn-primary btn-sm mb-2 py-2" onClick={handleLogout}>
            <Amicon icon={aiArrowRightFromBracket} /> Logout
          </button>
        </div>
      </form>
    </Auth>
  );
}
