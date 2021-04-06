import React from 'react';

import App from '../../Layouts/App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSunHaze } from '@fortawesome/pro-regular-svg-icons';

export default function Show({ can, app }) {
    return (
        <App can={can}>
            <div className="container-fluid">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="h2 mb-0 text-primary"><FontAwesomeIcon icon={faSunHaze} fixedWidth /> About Horizon</h1>
                                <p className="text-muted">Version {app.version}</p>
                                <a href="https://twitter.com/changewindows" target="_blank" className="btn btn-primary btn-sm me-1 mb-3"><FontAwesomeIcon icon={faTwitter} /> Twitter</a>
                                <a href="https://github.com/changewindows/horizon" target="_blank" className="btn btn-primary btn-sm me-1 mb-3"><FontAwesomeIcon icon={faGithub} /> GitHub</a>
                                <p>ChangeWindows is a detailed changelog and release history for Windows across all platforms it appears on. With detailed and timely updates, as well as a clean and clear interface, ChangeWindows' goal is to provide a solid resource for anyone interested in knowing what's next for Windows.</p>
                                <p>&copy; 2014-2021 &middot; All Right Reserved</p>
                                <p className="m-0 h4 f-384">Studio <span className="studio-384">384</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}