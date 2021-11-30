import React from 'react';
import { InertiaHead } from '@inertiajs/inertia-react';

import App from '../../Layouts/App';

import ReleaseCard from '../../Components/Cards/ReleaseCard';

export default function Index() {
  return (
    <App>
      <InertiaHead title="Search" />

      <div className="container">
        <div className="row g-1">
          <div className="col-12 titlebar">
            <h1>Search</h1>
          </div>
          <div className="col-12 my-3">
            <p>You can search through our release list by name, version, canonical version, and codename.</p>
          </div>
        </div>
      </div>
    </App>
  )
}