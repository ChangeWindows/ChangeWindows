import React, { useMemo } from 'react';

import App from '../../Layouts/App';
import ReleaseCard from '../../Components/Cards/ReleaseCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faFlagCheckered } from '@fortawesome/pro-regular-svg-icons';

import { isAfter, isBefore, parseISO } from 'date-fns';

export default function Index({ can, auth, releases }) {
    const [devReleases, currentReleases, legacyReleases] = useMemo(() => {
        const devReleases = releases.filter((release) => release.start_public ? isAfter(parseISO(release.start_public), new Date()) : true);
        const currentReleases = releases.filter((release) => isBefore(parseISO(release.start_public), new Date()) && release.channels.length > 0);
        const legacyReleases = releases.filter((release) => release.channels.length === 0);

        return [devReleases, currentReleases, legacyReleases];
    }, [releases]);

    return (
        <App>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <div className="nav nav-lined" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-active-tab" data-bs-toggle="tab" data-bs-target="#nav-active" type="button" role="tab" aria-controls="nav-active" aria-selected="true"><FontAwesomeIcon icon={faFlag} fixedWidth /> Supported</button>
                        <button className="nav-link" id="nav-inactive-tab" data-bs-toggle="tab" data-bs-target="#nav-inactive" type="button" role="tab" aria-controls="nav-inactive" aria-selected="false"><FontAwesomeIcon icon={faFlagCheckered} fixedWidth /> Unsupported</button>
                    </div>
                </div>
            </nav>
        
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12 mt-4">
                        <h1 className="h4 mb-2">Releases</h1>
                    </div>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-active" role="tabpanel" aria-labelledby="nav-active-tab">
                            {devReleases.length > 0 &&
                                <div className="col-12">
                                    <h2 className="h5 mb-3 fw-bold">Development releases</h2>
                                    <div className="row g-2">
                                        {devReleases.map((release, key) => (
                                            <ReleaseCard
                                                key={key}
                                                name={release.name}
                                                platform={release.platform}
                                                alts={[`Version ${release.version}`, release.codename]}
                                                channels={release.channels}
                                                url={release.url}
                                            />
                                        ))}
                                    </div>
                                </div>
                            }
                            {currentReleases.length > 0 &&
                                <div className="col-12 mt-4">
                                    <h2 className="h5 mb-3 fw-bold">Current releases</h2>
                                    <div className="row g-2">
                                        {currentReleases.map((release, key) => (
                                            <ReleaseCard
                                                key={key}
                                                name={release.name}
                                                platform={release.platform}
                                                alts={[`Version ${release.version}`, release.codename]}
                                                channels={release.channels}
                                                url={release.url}
                                            />
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="tab-pane fade" id="nav-inactive" role="tabpanel" aria-labelledby="nav-inactive-tab">
                            {legacyReleases.length > 0 &&
                                <div className="col-12">
                                    <h2 className="h5 mb-3 fw-bold">Unsupported releases</h2>
                                    <div className="row g-2">
                                        {legacyReleases.map((release, key) => (
                                            <ReleaseCard
                                                key={key}
                                                name={release.name}
                                                platform={release.platform}
                                                alts={[`Version ${release.version}`, release.codename]}
                                                url={release.url}
                                            />
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}