import React from 'react';

import App from '../../Layouts/App';

export default function Show({ can, auth }) {
    
    return (
        <App can={can} auth={auth}>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Profile</span>
                </div>
            </nav>
        
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12 mt-4">
                        <h2 className="h5 mb-3 fw-bold">Hello {auth.name}</h2>
                        <p>We currently don't have anything to show here yet. In later versions of ChangeWindows you'll be able to edit your details and password here.</p>
                    </div>
                </div>
            </div>
        </App>
    )
}