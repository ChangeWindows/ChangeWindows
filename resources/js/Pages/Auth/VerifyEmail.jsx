import React from 'react';
import { Inertia } from '@inertiajs/inertia';

import Auth from '../../Layouts/Auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faPaperPlane } from '@fortawesome/pro-regular-svg-icons';

import { Helmet } from 'react-helmet';

export default function VerifyEmail({ app, session, status }) {
    function handleSubmit(event) {
      event.preventDefault();
      Inertia.post('/email/verification-notification', form);
    }

    function handleLogout(event) {
      event.preventDefault();
      Inertia.post('/logout', form);
    }

    return (
        <Auth>
            <Helmet>
                <title>Verify Email &middot; {app.name}</title>
            </Helmet>

            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                    <p className="text-muted"><small>Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.</small></p>
                </div>
                {Object.keys(status).length > 0 &&
                    <div className="col-12">
                        <div className="alert alert-danger mb-0">
                            {Object.keys(status).map((errorGroup, _key) => (
                                status[errorGroup].map((error, key) => (
                                    <span key={key}>{error}</span>
                                ))
                            ))}
                        </div>
                    </div>
                }
                {session &&
                    <div className="col-12">
                        <p className="text-muted"><small>A new verification link has been sent to the email address you provided during registration.</small></p>
                    </div>
                }
                <div className="col-12 d-flex justify-content-between">
                    <button className="btn btn-primary me-1" type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} fixedWidth /> Resend verification email
                    </button>
                    <button className="btn btn-primary me-1" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} fixedWidth /> Logout
                    </button>
                </div>
            </form>
        </Auth>
    )
}