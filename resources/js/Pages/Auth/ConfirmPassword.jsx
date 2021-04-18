import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Auth from '../../Layouts/Auth';

import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ConfirmPassword({ can }) {
    const [form, setForm] = useState({ password: '' });

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.post('/reset-password', form);
    }

    return (
        <Auth can={can}>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                    <p className="text-muted"><small>This is a secure area of the application. Please confirm your password before continuing.</small></p>
                </div>
                <div className="col-12">
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" value={form.password} onChange={(event) => setForm({ password: event.target.value })} autoComplete="current-password" />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <button className="btn btn-primary me-1" type="submit">
                        <FontAwesomeIcon icon={faCheck} fixedWidth /> Confirm
                    </button>
                </div>
            </form>
        </Auth>
    )
}