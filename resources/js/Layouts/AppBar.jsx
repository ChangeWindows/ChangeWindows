import React, { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import AmaranthIcon, { aiArrowRightFromBracket, aiArrowRightToBracket, aiGear, aiMagnifyingGlass, aiUser } from '@changewindows/amaranth';

import { getLocal, setLocal } from '../utils/localStorage';
import useMediaQuery from '../hooks/useMediaQuery';

export default function AppBar() {
  const { app, auth } = usePage().props;
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

  function handleLogout(e) {
      e.preventDefault();
      Inertia.post('/logout');
  }

  return (
    <div className="grid-header">
      <nav className="navbar navbar-dark navbar-main">
        <div className="container-fluid">
          <div className="navbar-main">
            <InertiaLink className="navbar-brand" href="/">
              <img src={app.preview === 'preview' ? '/images/logo-preview.svg' : (app.preview === 'canary' ? '/images/logo-canary.svg' : '/images/logo.svg')} alt="ChangeWindows" className="app-icon" />
              <span className="brand-label d-none d-sm-inline">ChangeWindows{app.preview === 'canary' ? <span className="text-muted text-sm"> canary</span> : (app.preview === 'preview' ? <span className="text-muted text-sm"> preview</span> : '')}</span>
            </InertiaLink>
          </div>
          <div className="navbar-search">
            <div className="input-group input-group-search">
              <span className="input-group-text" id="search"><AmaranthIcon icon={aiMagnifyingGlass} /></span>
              <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search" />
            </div>
          </div>
          <div className="navbar-content">
            <div className="dropdown d-inline-block">
              <button className="btn btn-transparent btn-profile rounded-circle dropdown-toggle" type="button" id="dropdown-profile" data-bs-toggle="dropdown" aria-expanded="false">
                <AmaranthIcon icon={auth ? aiUser : aiGear} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-profile">
                <li>
                  <InertiaLink
                    href="/settings"
                    className="dropdown-item"
                  >
                    <AmaranthIcon icon={aiGear} /> Settings
                  </InertiaLink>
                </li>
                
                <li>
                  {auth ?
                    <form onSubmit={handleLogout} className="d-block">
                      <button type="submit" className="dropdown-item">
                        <AmaranthIcon icon={aiArrowRightFromBracket} /> Log out
                      </button>
                    </form>
                  :
                    <InertiaLink href="/login" className="dropdown-item">
                      <AmaranthIcon icon={aiArrowRightToBracket} /> Sign in
                    </InertiaLink>
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}