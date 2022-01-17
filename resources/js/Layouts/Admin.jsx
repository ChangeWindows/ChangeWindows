import React from 'react';
import { InertiaHead } from '@inertiajs/inertia-react';

import AppBar from './AppBar';
import AdminNavigation from './Navigation/AdminNavigation';

export default function App({ children }) {
  return (
    <div className="bg-light">
      <InertiaHead title="Backstage" />

      <div className="grid">
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