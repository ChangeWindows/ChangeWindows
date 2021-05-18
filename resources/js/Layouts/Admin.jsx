import React, { useEffect, useState } from 'react';

import AdminNavigation from './Navigation/AdminNavigation';
import { getLocal, setLocal } from '../utils/localStorage';

export default function App({ children }) {
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
                    <AdminNavigation />
                </header>
                <main className="grid-content">
                    { children }
                </main>
            </div>
        </div>
    )
}