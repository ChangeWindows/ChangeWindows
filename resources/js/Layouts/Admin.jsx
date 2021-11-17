import React, { useEffect, useState } from 'react';
import { InertiaHead } from '@inertiajs/inertia-react';

import AppBar from './AppBar';
import AdminNavigation from './Navigation/AdminNavigation';

export default function App({ children }) {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener('resize', function() {
      setWindowHeight(window.innerHeight);
    });

    () => window.removeEventListener('resize');
  });

  return (
    <div className="bg-light">
      <InertiaHead title="Backstage" />

      <div className="grid" style={{ height: windowHeight }}>
        <header className="grid-sidebar">
          <AdminNavigation />
        </header>
        <AppBar />
        <main className="grid-content">
          { children }
        </main>
      </div>
    </div>
  )
}