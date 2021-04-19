import React, { useEffect, useState } from 'react';

import AdminNavigation from './Navigation/AdminNavigation';

export default function App({ children, can, auth }) {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', function() {
            setWindowHeight(window.innerHeight);
        });

        () => window.removeEventListener('resize');
    });

    return (
        <div className="bg-light">
            <div className="grid" style={{ height: windowHeight }}>
                <header className="grid-sidebar">
                    <AdminNavigation can={can} auth={auth} />
                </header>
                <main className="grid-content">
                    { children }
                </main>
            </div>
        </div>
    )
}