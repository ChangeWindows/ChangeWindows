import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import App from '../../Layouts/App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faGear } from '@fortawesome/pro-regular-svg-icons';

import { getLocal, setLocal } from '../../utils/localStorage';

export default function Show() {
    const [theme, setTheme] = useState(getLocal('theme'));
    function toggle(mode) {
        if (mode === 'default') {
            setLocal('theme', 'default');
            setTheme('default');
            document.querySelector('html').classList.add('theme-default');
            document.querySelector('html').classList.remove('theme-light');
            document.querySelector('html').classList.remove('theme-dark');
        } else if (mode === 'light') {
            setLocal('theme', 'light');
            setTheme('light');
            document.querySelector('html').classList.add('theme-light');
            document.querySelector('html').classList.remove('theme-default');
            document.querySelector('html').classList.remove('theme-dark');
        } else {
            setLocal('theme', 'dark');
            setTheme('dark');
            document.querySelector('html').classList.add('theme-dark');
            document.querySelector('html').classList.remove('theme-light');
            document.querySelector('html').classList.remove('theme-default');
        }
    }

    return (
        <App>
            <nav className="navbar navbar-expand navbar-light sticky-top">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbar-page">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <InertiaLink className="nav-link active" href="/settings">
                                    <FontAwesomeIcon icon={faGear} /> Settings
                                </InertiaLink>
                            </li>
                            <li className="nav-item">
                                <InertiaLink className="nav-link" href="/settings/about">
                                    <FontAwesomeIcon icon={faCircleInfo} /> About
                                </InertiaLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            <div className="container my-3">
                <fieldset className="row mb-3">
                    <div className="col-12 col-md-4 my-4 my-md-0">
                        <h4 className="h5 mb-0">Theme</h4>
                        <p className="text-muted mb-0"><small>Turn off the lights! Or turn them on.</small></p>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-12 mt-4">
                                        <h6>Theme color</h6>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="theme" id="system" checked={theme === 'default'} onChange={() => toggle('default')} />
                                            <label className="form-check-label" htmlFor="system">
                                                System
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="theme" id="dark" checked={theme === 'dark'} onChange={() => toggle('dark')} />
                                            <label className="form-check-label" htmlFor="dark">
                                                Dark
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="theme" id="light" checked={theme === 'light'} onChange={() => toggle('light')} />
                                            <label className="form-check-label" htmlFor="light">
                                                Light
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
        </App>
    )
}