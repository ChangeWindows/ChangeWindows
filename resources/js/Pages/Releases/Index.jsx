import React, { useMemo } from 'react';

import App from '../../Layouts/App';
import ReleaseCard from '../../Components/Cards/ReleaseCard';
import { isAfter, isBefore, parseISO } from 'date-fns';

export default function Index({ can, releases }) {
    const [devReleases, currentReleases, legacyReleases] = useMemo(() => {
        const devReleases = releases.filter((release) => release.start_public ? isAfter(parseISO(release.start_public), new Date()) : true);
        const currentReleases = releases.filter((release) => isBefore(parseISO(release.start_public), new Date()) && release.channels.length > 0);
        const legacyReleases = releases.filter((release) => release.channels.length === 0);

        return [devReleases, currentReleases, legacyReleases];
    }, [releases]);

    return (
        <App can={can}>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Releases</span>
                </div>
            </nav>
        
            <div className="container my-3">
                <div className="row g-3">
                    {devReleases.length > 0 &&
                        <div className="col-12 mt-4">
                            <h2 className="h5 mb-3 fw-bold">Development releases</h2>
                            <div className="row g-2">
                                {devReleases.map((release, key) => {
                                    return (
                                        <ReleaseCard
                                            key={key}
                                            name={release.name}
                                            platform={release.platform}
                                            alts={[`Version ${release.version}`, release.codename]}
                                            channels={release.channels}
                                            url={release.url}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    }
                    {currentReleases.length > 0 &&
                        <div className="col-12 mt-4">
                            <h2 className="h5 mb-3 fw-bold">Current releases</h2>
                            <div className="row g-2">
                                {currentReleases.map((release, key) => {
                                    return (
                                        <ReleaseCard
                                            key={key}
                                            name={release.name}
                                            platform={release.platform}
                                            alts={[`Version ${release.version}`, release.codename]}
                                            channels={release.channels}
                                            url={release.url}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    }
                    {legacyReleases.length > 0 &&
                        <div className="col-12 mt-4">
                            <h2 className="h5 mb-3 fw-bold">Unsupported releases</h2>
                            <div className="row g-2">
                                {legacyReleases.map((release, key) => {
                                    return (
                                        <ReleaseCard
                                            key={key}
                                            name={release.name}
                                            platform={release.platform}
                                            alts={[`Version ${release.version}`, release.codename]}
                                            url={release.url}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </App>
    )
}