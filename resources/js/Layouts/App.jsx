import React from 'react';
import clsx from 'clsx';

import AppBar from './AppBar';
import Navigation from './Navigation/Navigation';

export default function App({ children, background = false }) {
  return (
    <div className="bg-light">
      <div className="grid">
        <header className="grid-sidebar">
          <Navigation />
        </header>
        <AppBar />
        <main className={clsx('grid-content', { 'auth': background })}>
          { children }
        </main>
      </div>
    </div>
  )
}