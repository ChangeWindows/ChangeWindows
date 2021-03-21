import React from 'react';

import App from '../../Layouts/App';
import Channel from '../../Components/Cards/Channel';
import DropdownItem from '../../Components/Navbar/DropdownItem';
import Flight from '../../Components/Timeline/Flight';
import NavItem from '../../Components/Navbar/NavItem';
import ReleaseCard from '../../Components/Cards/ReleaseCard';
import Timeline from '../../Components/Timeline/Timeline';

import PlatformIcon from '../../Components/Platforms/PlatformIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faLaptop, faListTimeline } from '@fortawesome/pro-regular-svg-icons';

export default function Show({ platforms, platform }) {
    console.log(platforms);
    return (
        <App>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Plaforms</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-page" aria-controls="navbar-page" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar-page">
                        <ul className="navbar-nav me-auto">
                            {platforms.filter((platform) => !platform.legacy).map((platform, key) => (
                                <NavItem url={platform.url} key={key}>
                                    <PlatformIcon platform={platform} /> {platform.name}
                                </NavItem>
                            ))}
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="legacyPlatforms" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Legacy
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="legacyPlatforms">
                                    {platforms.filter((platform) => platform.legacy).map((platform, key) => (
                                        <DropdownItem url={platform.url} key={key}>
                                            <PlatformIcon platform={platform} /> {platform.name}
                                        </DropdownItem>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12">
                        <h1 className="h2"><PlatformIcon platform={platform} color /> {platform.name}</h1>
                        <p className="lead fw-bold">{platform.description}</p>

                        <div className="row g-2 mt-3">
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
                        </div>
                    </div>
                    <div className="col-12">
                        <nav className="mt-4">
                            <div className="nav nav-lined" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-releases-tab" data-bs-toggle="tab" data-bs-target="#nav-releases" type="button" role="tab" aria-controls="nav-releases" aria-selected="true"><FontAwesomeIcon icon={faFlag} fixedWidth /> Releases</button>
                                <button className="nav-link" id="nav-timeline-tab" data-bs-toggle="tab" data-bs-target="#nav-timeline" type="button" role="tab" aria-controls="nav-timeline" aria-selected="false"><FontAwesomeIcon icon={faListTimeline} fixedWidth /> Timeline</button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-releases" role="tabpanel" aria-labelledby="nav-releases-tab">
                                <div className="row">
                                    <div className="col-12 mt-4">
                                        <h2 className="h5 mb-3 fw-bold">Current releases</h2>
                                        <div className="row g-2">
                                            <ReleaseCard
                                                name="Continuous development"
                                                channels={[
                                                    { class: 'dev', name: 'Dev' }
                                                ]}
                                            />
                                            <ReleaseCard
                                                name="Windows 10 version 21H1"
                                                alts={['March 2021 Update', 'Vibranium']}
                                                channels={[
                                                    { class: 'release', name: 'Release Preview' },
                                                    { class: 'beta', name: 'Beta' }
                                                ]}
                                            />
                                            <ReleaseCard
                                                name="Windows 10 version 20H2"
                                                alts={['November 2020 Update', 'Vibranium']}
                                                channels={[
                                                    { class: 'public', name: 'Semi-Annual' },
                                                    { class: 'release', name: 'Release Preview' },
                                                    { class: 'beta', name: 'Beta' }
                                                ]}
                                            />
                                            <ReleaseCard
                                                name="Windows 10 version 2004"
                                                alts={['May 2020 Update', 'Vibranium']}
                                                channels={[
                                                    { class: 'public', name: 'Semi-Annual' }
                                                ]}
                                            />
                                            <ReleaseCard
                                                name="Windows 10 version 1909"
                                                alts={['October 2019 Update', 'Titanium']}
                                                channels={[
                                                    { class: 'public', name: 'Semi-Annual' }
                                                ]}
                                            />
                                            <ReleaseCard
                                                name="Windows 10 version 1809"
                                                alts={['November 2018 Update', 'Redstone 5']}
                                                channels={[
                                                    { class: 'ltsc', name: 'LTSC' },
                                                    { class: 'broad', name: 'Broad' },
                                                    { class: 'public', name: 'Semi-Annual' }
                                                ]}
                                            />
                                            <ReleaseCard
                                                name="Windows 10 version 1607"
                                                alts={['Anniversary Update', 'Redstone 1']}
                                                channels={[
                                                    { class: 'ltsc', name: 'LTSC' }
                                                ]}
                                            />
                                            <ReleaseCard
                                                name="Windows 10 version 1507"
                                                alts={['Threshold 1']}
                                                channels={[
                                                    { class: 'ltsc', name: 'LTSC' }
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <h2 className="h5 mb-3 fw-bold">Packages</h2>
                                        <div className="row g-2">
                                            <ReleaseCard
                                                name="Windows Feature Experience Pack"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <h2 className="h5 mb-3 fw-bold">Unsupported releases</h2>
                                        <div className="row g-2">
                                            <ReleaseCard
                                                name="Windows 10 version 1903"
                                                alts={['May 2019 Update', 'Titanium']}
                                            />
                                            <ReleaseCard
                                                name="Windows 10 version 1803"
                                                alts={['April 1803 Update', 'Redstone 4']}
                                            />
                                            <ReleaseCard
                                                name="Windows 10 version 1709"
                                                alts={['Fall Creators Update', 'Redstone 3']}
                                            />
                                            <ReleaseCard
                                                name="Windows 10 version 1703"
                                                alts={['Creators Update', 'Redstone 2']}
                                            />
                                            <ReleaseCard
                                                name="Windows 10 version 1511"
                                                alts={['November Update', 'Threshold 2']}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav-timeline" role="tabpanel" aria-labelledby="nav-timeline-tab">
                                <div className="row">
                                    <div className="col-8 mt-4">
                                        <h2 className="h5 mb-3 fw-bold">Timeline</h2>
                                        <div className="row g-4">
                                            <Timeline date="3 March 2021">
                                                <Flight
                                                    platform="pc"
                                                    build="21627.1000"
                                                    channels={[
                                                        { class: 'dev', name: 'Dev' }
                                                    ]}
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
                                        </div>
                                    </div>
                                    <div className="col-4">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}