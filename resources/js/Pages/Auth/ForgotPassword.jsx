import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Auth from '../../Layouts/Auth';

import { faPaperPlane } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ForgotPassword({ can }) {
    const [form, setForm] = useState({ email: '' });

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.post('/forgot-password', form);
    }

    return (
        <Auth can={can}>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                    <p className="text-muted"><small>Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</small></p>
                </div>
                <div className="col-12">
                    <div className="form-floating">
                        <input type="email" className="form-control" id="email" value={form.email} onChange={(event) => setForm({ email: event.target.value })} autoFocus />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <div className="flex-grow-1" />
                    <button className="btn btn-primary" type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} fixedWidth /> Send password reset link
                    </button>
                </div>
            </form>
        </Auth>
    )
}