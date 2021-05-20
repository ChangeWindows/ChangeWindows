import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';

import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getLocal, setLocal } from '../utils/localStorage';
import useMediaQuery from '../hooks/useMediaQuery';

export default function Auth({ children }) {
    const { app } = usePage().props;

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
	const matchesDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    useEffect(() => {
        window.addEventListener('resize', function() {
            setWindowHeight(window.innerHeight);
        });

        () => window.removeEventListener('resize');
    });

    useEffect(() => {
        const theme = getLocal('theme');

        if (theme === 'default') {
            if (matchesDarkMode) {
                document.head.children['color-scheme'].content = 'dark';
            } else {
                document.head.children['color-scheme'].content = 'light';
            }
        }
    }, [matchesDarkMode]);

    useEffect(() => {
        const theme = getLocal('theme');

        if (!theme) {
            setLocal('theme', 'default');
        } else if (theme === 'light') {
            document.querySelector('html').classList.add('theme-light');
            document.querySelector('html').classList.remove('theme-default');
            document.head.children['color-scheme'].content = 'light';
        } else if (theme === 'dark') {
            document.querySelector('html').classList.add('theme-dark');
            document.querySelector('html').classList.remove('theme-default');
            document.head.children['color-scheme'].content = 'dark';
        }
    });

    return (
        <div className="auth auth-flow" style={{ height: windowHeight }}>
            <div className="content">
                <a href="javascript:history.back()" className="btn btn-link btn-sm text-white"><FontAwesomeIcon icon={faArrowLeft} /> Back</a>
                <div className="auth-card">
                    <h1 className="h3 m-0 py-5 d-flex justify-content-center align-items-center">
                        <img src={app.preview ? '/images/logo-preview-dark.svg' : '/images/logo-dark.svg'} width="28px" height="28px" className="me-2 mt-1 display-light" />
                        <img src={app.preview ? '/images/logo-preview-light.svg' : '/images/logo-light.svg'} width="28px" height="28px" className="me-2 mt-1 display-dark" />
                        ChangeWindows
                    </h1>
                    { children }
                </div>
            </div>
        </div>
    )
}