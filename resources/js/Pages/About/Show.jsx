import React from 'react';

import App from '../../Layouts/App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faPatreon } from '@fortawesome/free-brands-svg-icons';

export default function Show({ app, patrons, is_preview }) {
    return (
        <App background>
            <div className="auth-card auth-card-lg">
                <h1 className="h3 m-0 py-5 text-center d-flex justify-content-center align-items-center">
                    <img src={is_preview ? '/images/logo-preview-dark.svg' : '/images/logo-dark.svg'} width="28px" height="28px" className="me-2 mt-1" /> ChangeWindows {is_preview && 'Preview'}
                </h1>
                <a href="https://twitter.com/changewindows" target="_blank" className="btn btn-primary btn-sm me-1 mb-3"><FontAwesomeIcon icon={faTwitter} /> Twitter</a>
                <a href="https://github.com/changewindows/horizon" target="_blank" className="btn btn-primary btn-sm me-1 mb-3"><FontAwesomeIcon icon={faGithub} /> GitHub</a>
                <a href="https://patreon.com/changewindows" target="_blank" className="btn btn-primary btn-sm me-1 mb-3"><FontAwesomeIcon icon={faPatreon} /> Patreon</a>
                <p className="text-muted mb-2">Version {app.version}</p>
                <p>ChangeWindows is a detailed changelog and release history for Windows across all platforms it appears on. With detailed and timely updates, as well as a clean and clear interface, ChangeWindows' goal is to provide a solid resource for anyone interested in knowing what's next for Windows.</p>
                <h5 className="my-4">Special thanks to our Patrons</h5>
                <div className="row g-3">
                    {patrons.map((patron, key) => (
                        <div className="col-12 col-sm-6" key={key}>
                            <div className="d-flex align-items-center">
                                <img src={patron.avatar} alt={patron.name} style={{ width: 40, height: 40 }} className="rounded-circle" />
                                <div className="ms-2">
                                    <p className="fw-bold m-0">{patron.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex flex-column flex-md-row align-items-end justify-content-between mt-4">
                    <p className="m-0 h4 f-384">Studio <span className="studio-384">384</span></p>
                    <p className="m-0">&copy; 2014-2021 &middot; All Right Reserved</p>
                </div>
            </div>
        </App>
    )
}