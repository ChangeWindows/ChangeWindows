import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/inertia-react';

import AmaranthIcon, { aiArrowLeft, aiChangeWindows, aiChangeWindowsCan, aiChangeWindowsDev } from '@changewindows/amaranth';

import { getLocal, setLocal } from '../utils/localStorage';
import useMediaQuery from '../hooks/useMediaQuery';

export default function Auth({ children }) {
  const { app } = usePage().props;

  const matchesDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    const theme = getLocal('theme');

    if (theme === 'dark' || theme === 'default' && matchesDarkMode) {
      document.head.children['color-scheme'].content = 'dark';
      document.head.children['theme-color'].content = '#202020';
    } else {
      document.head.children['color-scheme'].content = 'light';
      document.head.children['theme-color'].content = '#f3f3f3';
    }
  }, [matchesDarkMode]);

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
    <div className="auth auth-flow">
      <div className="content">
        <a href="javascript:history.back()" className="btn btn-link btn-sm"><AmaranthIcon icon={aiArrowLeft} /> Back</a>
        <div className="auth-card">
          <h1 className="h3 m-0 py-5 d-flex justify-content-center align-items-center">
            <AmaranthIcon icon={app.preview === 'preview' ? aiChangeWindowsDev : (app.preview === 'canary' ? aiChangeWindowsCan : aiChangeWindows)} className="me-1" />
            ChangeWindows
          </h1>
          { children }
        </div>
      </div>
    </div>
  )
}