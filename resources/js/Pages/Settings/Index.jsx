import React, { useState } from 'react';
import { InertiaLink, InertiaHead } from '@inertiajs/inertia-react';

import App from '../../Layouts/App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faGear } from '@fortawesome/pro-regular-svg-icons';

import { getLocal, setLocal } from '../../utils/localStorage';

export default function Show({ app }) {
    const [theme, setTheme] = useState(getLocal('theme'));
    const [showActiveOnly, setShowActiveOnly] = useState(getLocal('showActiveOnly'));

    function toggleTheme(mode) {
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
    
    function toggleShowActiveOnly() {
        setLocal('showActiveOnly', showActiveOnly ? 0 : 1);
        setShowActiveOnly(showActiveOnly ? 0 : 1);
    }

    return (
        <App>
            <InertiaHead title={`Settings &middot; ${app.name}`} />

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
            
            <div className="container">
                <fieldset className="row g-3">
                    <div className="col-12 titlebar">
                        <h1>Settings</h1>
                    </div>
                    
                    <div className="col-12 col-md-4">
                        <h4 className="h5 mb-0">Theme</h4>
                        <p className="text-muted mb-0"><small>Turn off the lights! Or turn them on.</small></p>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-12 mt-3">
                                        <h6>Theme color</h6>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="theme" id="system" checked={theme === 'default'} onChange={() => toggleTheme('default')} />
                                            <label className="form-check-label" htmlFor="system">
                                                System
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="theme" id="dark" checked={theme === 'dark'} onChange={() => toggleTheme('dark')} />
                                            <label className="form-check-label" htmlFor="dark">
                                                Dark
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="theme" id="light" checked={theme === 'light'} onChange={() => toggleTheme('light')} />
                                            <label className="form-check-label" htmlFor="light">
                                                Light
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-4">
                        <h4 className="h5 mb-0">Channels</h4>
                        <p className="text-muted mb-0"><small>Change channels settings.</small></p>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-12 mt-3">
                                        <h6>Inactive channels</h6>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" onChange={toggleShowActiveOnly} checked={showActiveOnly} id="showActiveChannelsOnly" />
                                            <label className="form-check-label" htmlFor="showActiveChannelsOnly">Only show active channels on the Channels-pages.</label>
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