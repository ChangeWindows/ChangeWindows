import React from 'react';

import App from '../../Layouts/App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSunHaze } from '@fortawesome/pro-regular-svg-icons';

export default function Show({ can, app }) {
    return (
        <App can={can} background>
            <div className="auth-card auth-card-lg">
                <h1 className="h3 m-0 py-5 text-center"><FontAwesomeIcon icon={faSunHaze} fixedWidth className="me-1" /> ChangeWindows Preview</h1>
                <a href="https://twitter.com/changewindows" target="_blank" className="btn btn-primary btn-sm me-1 mb-3"><FontAwesomeIcon icon={faTwitter} /> Twitter</a>
                <a href="https://github.com/changewindows/horizon" target="_blank" className="btn btn-primary btn-sm me-1 mb-3"><FontAwesomeIcon icon={faGithub} /> GitHub</a>
                <p className="text-muted mb-2">Version {app.version}</p>
                <p>ChangeWindows is a detailed changelog and release history for Windows across all platforms it appears on. With detailed and timely updates, as well as a clean and clear interface, ChangeWindows' goal is to provide a solid resource for anyone interested in knowing what's next for Windows.</p>
                <p>&copy; 2014-2021 &middot; All Right Reserved</p>
                <p className="m-0 h4 f-384">Studio <span className="studio-384">384</span></p>
            </div>
        </App>
    )
}