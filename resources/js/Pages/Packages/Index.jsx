import React from 'react';

import App from '../../Layouts/App';
import ReleaseCard from '../../Components/Cards/ReleaseCard';

export default function Index({ can, auth, packages }) {
    return (
        <App can={can} auth={auth}>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Packages</span>
                </div>
            </nav>
        
            <div className="container my-3">
                <div className="row g-3">
                    {packages.length > 0 &&
                        <div className="col-12 mt-4">
                            <h2 className="h5 mb-3 fw-bold">Packages</h2>
                            <div className="row g-2">
                                {packages.map((pack, key) => (
                                    <ReleaseCard
                                        key={key}
                                        pack
                                        name={pack.name}
                                        platform={pack.platform}
                                        channels={pack.channels}
                                        url={pack.url}
                                    />
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </App>
    )
}