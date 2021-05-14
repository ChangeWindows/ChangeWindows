import React, { useState } from 'react';

import App from '../../Layouts/App';

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
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Settings</span>
                </div>
            </nav>
        
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12 mt-4">
                        <h2 className="h5 mb-3 fw-bold">Theme</h2>
                        <button className="btn btn-primary btn-sm me-2" disabled={theme === 'default'} onClick={() => toggle('default')}>System</button>
                        <button className="btn btn-primary btn-sm me-2" disabled={theme === 'dark'} onClick={() => toggle('dark')}>Dark</button>
                        <button className="btn btn-primary btn-sm me-2" disabled={theme === 'light'} onClick={() => toggle('light')}>Light</button>
                    </div>
                </div>
            </div>
        </App>
    )
}