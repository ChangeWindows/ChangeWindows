import React from 'react';
import { InertiaLink, InertiaHead } from '@inertiajs/inertia-react';

import App from '../../Layouts/App';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faGear } from '@fortawesome/pro-regular-svg-icons';
import { faGithub, faTwitter, faPatreon } from '@fortawesome/free-brands-svg-icons';
import AmaranthIcon, { aiChangewindows, aiChangewindowsCan, aiChangewindowsDev } from '@changewindows/amaranth';

export default function Show({ app, patrons }) {
    return (
        <App>
            <InertiaHead title={`About &middot; ${app.name}`} />

            <nav className="navbar navbar-expand navbar-light sticky-top">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbar-page">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <InertiaLink className="nav-link" href="/settings">
                                    <FontAwesomeIcon icon={faGear} /> Settings
                                </InertiaLink>
                            </li>
                            <li className="nav-item">
                                <InertiaLink className="nav-link active" href="/settings/about">
                                    <FontAwesomeIcon icon={faCircleInfo} /> About
                                </InertiaLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            <div className="container my-3">
                <div className="d-flex flex-column align-items-center">
                    <h1 className="h3 m-0 pt-5 text-center d-inline-flex justify-content-center">
                        <AmaranthIcon icon={app.preview === 'preview' ? aiChangewindowsDev : (app.preview === 'canary' ? aiChangewindowsCan : aiChangewindows)} className="me-1" />
                        ChangeWindows {app.preview === 'preview' && 'Preview'}{app.preview === 'canary' && 'Canary'}
                    </h1>
                    <p className="text-muted mb-5 text-center d-inline"><a href="https://github.com/changewindows/horizon/releases" target="_blank">Version {app.version}</a></p>

                    <p className="lead mb-5 fw-normal text-center d-inline" style={{ maxWidth: 600 }}>ChangeWindows is a detailed changelog and release history for Windows across all platforms it appears on. With detailed and timely updates, as well as a clean and clear interface, ChangeWindows' goal is to provide a solid resource for anyone interested in knowing what's next for Windows.</p>
                    
                    <h2 className="my-5 h4">Special thanks to our Patrons</h2>
                    <div className="row w-100 g-3 justify-content-center mb-5">
                        {patrons.map((patron, key) => (
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2" key={key}>
                                <div className="d-flex flex-column align-items-center">
                                    <img src={patron.avatar} alt={patron.name} style={{ width: 40, height: 40 }} className="rounded-circle" />
                                    <div className="mt-2">
                                        <p className="fw-bold m-0">{patron.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5">
                        <a href="https://twitter.com/changewindows" target="_blank" className="btn btn-primary btn-sm me-1 mb-3"><FontAwesomeIcon icon={faTwitter} /> Twitter</a>
                        <a href="https://github.com/changewindows/horizon" target="_blank" className="btn btn-primary btn-sm me-1 mb-3"><FontAwesomeIcon icon={faGithub} /> GitHub</a>
                        <a href="https://patreon.com/changewindows" target="_blank" className="btn btn-primary btn-sm me-1 mb-3"><FontAwesomeIcon icon={faPatreon} /> Patreon</a>
                    </div>

                    
                    <div className="w-100 d-flex flex-column flex-md-row align-items-end justify-content-between mt-5">
                        <a className="m-0 h4 f-384" href="https://studio384.be" target="_blank">Studio <span className="studio-384">384</span></a>
                        <p className="m-0">&copy; 2014-2021 &middot; All Right Reserved</p>
                    </div>
                </div>
            </div>
        </App>
    )
}