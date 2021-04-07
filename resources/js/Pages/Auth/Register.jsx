import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Auth from '../../Layouts/Auth';

import { faArrowRightToBracket, faUserPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Register({ can }) {
    const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });

    function handleSubmit(event) {
      event.preventDefault();
      Inertia.post('/register', form);
    }

    return (
        <Auth can={can}>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="name" value={form.name} onChange={(event) => setForm((curForm) => ({ ...curForm, name: event.target.value }))} autoFocus />
                        <label htmlFor="name">Name</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-floating">
                        <input type="email" className="form-control" id="email" value={form.email} onChange={(event) => setForm((curForm) => ({ ...curForm, email: event.target.value }))} autoFocus />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" value={form.password} onChange={(event) => setForm((curForm) => ({ ...curForm, password: event.target.value }))} autocomplete="new-password" />
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
                        <FontAwesomeIcon icon={faUserPlus} fixedWidth /> Register
                    </button>
                    <InertiaLink href="/login" className="btn btn-link">
                        <FontAwesomeIcon icon={faArrowRightToBracket} fixedWidth /> Login
                    </InertiaLink>
                </div>
            </form>
        </Auth>
    )
}