import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import Navigation from './Navigation/Navigation';

export default function App({ children, can, auth, background = false }) {
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
                    <Navigation can={can} auth={auth} />
                </header>
                <main className={clsx('grid-content', { 'auth': background })}>
                    { children }
                </main>
            </div>
        </div>
    )
}