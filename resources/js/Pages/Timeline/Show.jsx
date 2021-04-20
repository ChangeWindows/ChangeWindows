import React from 'react';

import App from '../../Layouts/App';

import PlatformNavigation from '../../Components/PlatformNavigation';

export default function Show({ can, auth, platforms }) {
    return (
        <App can={can} auth={auth}>
            <PlatformNavigation all="/timeline" page="Timeline" platforms={platforms} />
        
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12 mt-4">
                        <h2 className="h5 mb-3 fw-bold">Nothing to see here yet</h2>
                        <p>We're still working on this... See you again later.</p>
                    </div>
                </div>
            </div>
        </App>
    )
}