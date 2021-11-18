import React, { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import AmaranthIcon, { aiArrowRightFromBracket, aiArrowRightToBracket, aiGear } from '@changewindows/amaranth';

import { getLocal, setLocal } from '../utils/localStorage';
import useMediaQuery from '../hooks/useMediaQuery';

export default function AppBar() {
  const { app, auth } = usePage().props;
	const matchesDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    const theme = getLocal('theme');

    if (theme === 'default') {
      if (matchesDarkMode) {
        document.head.children['color-scheme'].content = 'dark';
        document.head.children['theme-color'].content = '#202020';
      } else {
        document.head.children['color-scheme'].content = 'light';
        document.head.children['theme-color'].content = '#f3f3f3';
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
      document.head.children['theme-color'].content = '#f3f3f3';
    } else if (theme === 'dark') {
      document.querySelector('html').classList.add('theme-dark');
      document.querySelector('html').classList.remove('theme-default');
      document.head.children['color-scheme'].content = 'dark';
      document.head.children['theme-color'].content = '#202020';
    }
  });

  function handleLogout(e) {
      e.preventDefault();
      Inertia.post('/logout');
  }

  return (
    <div className="grid-header">
      <nav className="navbar navbar-dark navbar-main">
        <div className="container-fluid">
          <InertiaLink className="navbar-brand" href="/">
            <img src={app.preview === 'preview' ? '/images/logo-preview.svg' : (app.preview === 'canary' ? '/images/logo-canary.svg' : '/images/logo.svg')} alt="ChangeWindows" className="app-icon" />
            <span className="brand-label d-none d-md-inline">ChangeWindows{app.preview === 'canary' ? <span className="text-muted text-sm d-none d-lg-inline"> canary</span> : (app.preview === 'preview' ? <span className="text-muted text-sm d-none d-lg-inline"> preview</span> : '')}</span>
          </InertiaLink>
          <div className="navbar-content">
            <InertiaLink
              href="/settings"
              className="btn btn-transparent btn-sm me-1"
            >
              <AmaranthIcon icon={aiGear} /><span className="d-none d-sm-inline"> Settings</span>
            </InertiaLink>
            {auth ?
              <form onSubmit={handleLogout} className="d-inline-block">
                <button type="submit" className="btn btn-transparent btn-sm">
                  <AmaranthIcon icon={aiArrowRightFromBracket} /><span className="d-none d-sm-inline"> Log out</span>
                </button>
              </form>
            :
              <InertiaLink href="/login" className="btn btn-transparent btn-sm">
                <AmaranthIcon icon={aiArrowRightToBracket} /><span className="d-none d-sm-inline"> Sign in</span>
              </InertiaLink>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}