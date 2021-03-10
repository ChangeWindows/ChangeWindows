import React from 'react'

import App from '../../Layouts/App'
import Channel from '../../Components/Cards/Channel'
import Flight from '../../Components/Timeline/Flight'
import Promotion from '../../Components/Timeline/Promotion'
import Release from '../../Components/Timeline/Release'
import Timeline from '../../Components/Timeline/Timeline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCloud, faCode, faCompactDisc, faGamepadModern, faHeadSideGoggles, faLaptop, faMicrochip, faMobile, faServer, faSunHaze, faTablet, faTv } from '@fortawesome/pro-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Show() {
    return (
        <App>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <a className="navbar-brand" href="#">Timeline</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-page" aria-controls="navbar-page" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-page">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    All
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faLaptop} fixedWidth /> PC
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faGamepadModern} fixedWidth /> Xbox
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faServer} fixedWidth /> Server
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faHeadSideGoggles} fixedWidth /> Holographic
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faTablet} fixedWidth /> 10X
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faTv} fixedWidth /> Team
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faCloud} fixedWidth /> Azure
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faCode} fixedWidth /> SDK
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faCompactDisc} fixedWidth /> ISO
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="legacyPlatforms" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Legacy
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="legacyPlatforms">
                                    <li><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faMicrochip} fixedWidth /> IoT</a></li>
                                    <li><a className="dropdown-item" href="#"><FontAwesomeIcon icon={faMobile} fixedWidth /> Mobile</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12">
                        <div className="card shadow border-0 overflow-hidden d-flex flex-row">
                            <div className="bg-primary text-white p-3">
                                <h3><FontAwesomeIcon icon={faSunHaze} fixedWidth /></h3>
                            </div>
                            <div className="card-body">
                                <h1 className="h3">Welcome to ChangeWindows Preview</h1>
                                <p>We're still working on this, so stay with us while we get everything ready for launch.</p>
                                <a href="https://changewindows.org" className="btn btn-primary btn-sm me-1"><FontAwesomeIcon icon={faArrowLeft} fixedWidth /> Back to ChangeWindows</a>
                                <a href="https://github.com/changewindows" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faGithub} fixedWidth /> GitHub</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-7">
                        <div className="row g-4">
                            <Timeline date="5 March 2021">
                                <Flight
                                    platform="xbox"
                                    build="21326.1019"
                                    channels={[
                                        { class: 'skip', name: 'Skip'}
                                    ]}
                                    version={2108}
                                />
                                <Flight
                                    platform="xbox"
                                    build="19041.6736"
                                    channels={[
                                        { class: 'preview', name: 'Delta' },
                                        { class: 'beta', name: 'Beta' },
                                        { class: 'dev', name: 'Alpha' }
                                    ]}
                                    version={2103}
                                />
                            </Timeline>
                            <Timeline date="4 March 2021">
                                <Flight
                                    platform="xbox"
                                    build="19041.6736"
                                    channels={[
                                        { class: 'release', name: 'Omega' }
                                    ]}
                                    version={2103}
                                />
                            </Timeline>
                            <Timeline date="3 March 2021">
                                <Flight
                                    platform="pc"
                                    build="21627.1000"
                                    channels={[
                                        { class: 'dev', name: 'Dev' }
                                    ]}
                                />
                                <Flight
                                    platform="xbox"
                                    build="21326.1000"
                                    channels={[
                                        { class: 'skip', name: 'Skip' }
                                    ]}
                                    version={2108}
                                />
                                <Flight
                                    platform="server"
                                    build="20303.1"
                                    channels={[
                                        { class: 'beta', name: 'Preview' }
                                    ]}
                                    version="21H2"
                                />
                                <Flight
                                    platform="sdk"
                                    build="20303.1"
                                    channels={[
                                        { class: 'public', name: 'Public' }
                                    ]}
                                    version="21H2"
                                />
                                <Flight
                                    platform="holographic"
                                    build="20303.1000"
                                    channels={[
                                        { class: 'beta', name: 'Slow' },
                                        { class: 'dev', name: 'Fast' }
                                    ]}
                                    version="21H1"
                                />
                                <Flight
                                    platform="xbox"
                                    build="19041.6729"
                                    channels={[
                                        { class: 'dev', name: 'Alpha' }
                                    ]}
                                    version={2103}
                                />
                            </Timeline>
                            <Timeline date="23 February 2021">
                                <Flight
                                    platform="pc"
                                    build="120.2212.3030.0"
                                    channels={[
                                        { class: 'beta', name: 'Beta' }
                                    ]}
                                    component="Windows Feature Experience Pack"
                                />
                            </Timeline>
                            <Timeline date="16 February 2021">
                                <Flight
                                    platform="azure"
                                    build="17784.1557"
                                    channels={[
                                        { class: 'beta', name: 'Beta' }
                                    ]}
                                    version="20H2"
                                />
                            </Timeline>
                            <Timeline date="4 February 2021">
                                <Flight
                                    platform="xbox"
                                    build="19041.5496"
                                    channels={[
                                        { class: 'skip', name: 'Skip' }
                                    ]}
                                    version={2109}
                                />
                                <Promotion
                                    platform="xbox"
                                    version="2109"
                                    channel={{ class: 'skip', name: 'Alpha Skip-Ahead' }}
                                />
                                <Release
                                    platform="xbox"
                                    version={2109}
                                />
                            </Timeline>
                            <Timeline date="26 January 2021">
                                <Flight
                                    platform="pc"
                                    build="120.2212.2020.0"
                                    channels={[
                                        { class: 'beta', name: 'Beta' }
                                    ]}
                                    component="Windows Feature Experience Pack"
                                />
                            </Timeline>
                            <Timeline date="20 January 2021">
                                <Flight
                                    platform="xbox"
                                    build="2011.1.2012.11004"
                                    channels={[
                                        { class: 'release', name: 'Omega' }
                                    ]}
                                    component="Xbox Shell"
                                />
                            </Timeline>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-5">
                        <div className="row g-2">
                            <div className="col-12 mb-n2">
                                <h3 className="h6 text-pc"><FontAwesomeIcon icon={faLaptop} fixedWidth /> <span className="fw-bold">PC</span></h3>
                            </div>
                            <Channel
                                channel={{ class: 'dev', name: 'Dev' }}
                                build="21327.1000"
                                date="3 Mar 2021"
                            />
                            <Channel
                                channel={{ class: 'beta', name: 'Beta' }}
                                build="19043.844"
                                date="17 Feb 2021"
                            />
                            <Channel
                                channel={{ class: 'release', name: 'Release Preview' }}
                                build="19042.844"
                                date="17 Feb 2021"
                            />
                            <Channel
                                channel={{ class: 'public', name: 'Semi-Annual' }}
                                build="19042.844"
                                date="3 Mar 2021"
                            />
                            <Channel
                                channel={{ class: 'broad', name: 'Broad' }}
                                build="17763.1790"
                                date="16 Feb 2021"
                            />
                            <Channel
                                channel={{ class: 'ltsc', name: 'LTSC' }}
                                build="17763.1790"
                                date="16 Feb 2021"
                            />
                            
        
                            
                            <div className="col-12 mb-n2 mt-3">
                                <h3 className="h6 text-xbox"><FontAwesomeIcon icon={faGamepadModern} fixedWidth /> <span className="fw-bold">Xbox</span></h3>
                            </div>
                            <Channel
                                channel={{ class: 'skip', name: 'Skip' }}
                                build="21326.1019"
                                date="5 Mar 2021"
                            />
                            <Channel
                                channel={{ class: 'dev', name: 'Alpha' }}
                                build="19041.6736"
                                date="4 Mar 2021"
                            />
                            <Channel
                                channel={{ class: 'beta', name: 'Beta' }}
                                build="19041.6736"
                                date="5 Mar 2021"
                            />
                            <Channel
                                channel={{ class: 'preview', name: 'Delta' }}
                                build="19041.6736"
                                date="5 Mar 2021"
                            />
                            <Channel
                                channel={{ class: 'release', name: 'Omega' }}
                                build="19041.6736"
                                date="5 Mar 2021"
                            />
                            <Channel
                                channel={{ class: 'broad', name: 'Public' }}
                                build="19041.6288"
                                date="22 Feb 2021"
                            />
                            
        
                            
                            <div className="col-12 mb-n2 mt-3">
                                <h3 className="h6 text-server"><FontAwesomeIcon icon={faServer} fixedWidth /> <span className="fw-bold">Server</span></h3>
                            </div>
                            <Channel
                                channel={{ class: 'beta', name: 'Preview' }}
                                build="20303.1"
                                date="3 Mar 2021"
                            />
                            <Channel
                                channel={{ class: 'broad', name: 'Semi-Annual' }}
                                build="19042.804"
                                date="9 Feb 2021"
                            />
                            <Channel
                                channel={{ class: 'ltsc', name: 'LTSC' }}
                                build="17763.1790"
                                date="16 Feb 2021"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}