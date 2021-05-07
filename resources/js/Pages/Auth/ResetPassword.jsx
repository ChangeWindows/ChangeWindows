import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Auth from '../../Layouts/Auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/pro-regular-svg-icons';

export default function ResetPassword({ can, token, status }) {
    const [form, setForm] = useState({ token, email: '', password: '', password_confirmation: '' });

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.post('/reset-password', form);
    }

    return (
        <Auth can={can}>
            <form onSubmit={handleSubmit} className="row g-3">
                <input type="hidden" name="token" value={token} />
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
                <div className="col-12">
                    <div className="form-floating">
                        <input type="email" className="form-control" id="email" value={form.email} onChange={(event) => setForm((curForm) => ({ ...curForm, email: event.target.value }))} autoFocus />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" value={form.password} onChange={(event) => setForm((curForm) => ({ ...curForm, password: event.target.value }))} autoComplete="new-password" />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password_confirmation" value={form.password_confirmation} onChange={(event) => setForm((curForm) => ({ ...curForm, password_confirmation: event.target.value }))} />
                        <label htmlFor="password_confirmation">Confirm password</label>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <button className="btn btn-primary me-1" type="submit">
                        <FontAwesomeIcon icon={faUserPlus} fixedWidth /> Reset password
                    </button>
                </div>
            </form>
        </Auth>
    )
}