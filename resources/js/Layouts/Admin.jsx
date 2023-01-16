import React from 'react';
import { Head } from '@inertiajs/react';

import '../../sass/style.scss';

import AppBar from './AppBar';
import AdminNavigation from './Navigation/AdminNavigation';

export default function App({ children }) {
  return (
    <div className="bg-light">
      <Head title="Backstage" />

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
