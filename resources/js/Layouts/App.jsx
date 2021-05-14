import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import Navigation from './Navigation/Navigation';
import { getLocal, setLocal } from '../utils/localStorage';

export default function App({ children, background = false }) {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize', function() {
            setWindowHeight(window.innerHeight);
        });

        () => window.removeEventListener('resize');
    });

    useEffect(() => {
        const theme = getLocal('theme');

        if (!theme) {
            setLocal('theme', 'default');
        } else if (theme === 'light') {
            document.querySelector('html').classList.add('theme-light');
            document.querySelector('html').classList.remove('theme-default');
        } else if (theme === 'dark') {
            document.querySelector('html').classList.add('theme-dark');
            document.querySelector('html').classList.remove('theme-default');
        }
    });

    return (
        <div className="bg-light">
            <div className="grid" style={{ height: windowHeight }}>
                <header className="grid-sidebar">
                    <Navigation />
                </header>
                <main className={clsx('grid-content', { 'auth': background })}>
                    { children }
                </main>
            </div>
        </div>
    )
}