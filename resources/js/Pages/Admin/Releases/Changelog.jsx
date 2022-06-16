import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';

import AmaranthIcon, { aiCheck, aiFloppyDisk } from '@changewindows/amaranth';
import Editor from '../../../Components/Editor';

export default function Edit({ urls, release, status = null }) {
  const [curRelease, setCurRelease] = useState({
    name: '',
    version: null,
    canonical_version: null,
    codename: '',
    description: '',
    changelog: '',
    platform_id: null,
    start_preview: null,
    start_public: null,
    start_extended: null,
    start_lts: null,
    end_lts: null,
    start_build: null,
    start_delta: null,
    end_build: null,
    end_delta: null
  });

  useEffect(() => {
    setCurRelease(release);
  }, [release]);

  function handleSubmit(event) {
    event.preventDefault();
    Inertia.patch(urls.update_release, curRelease);
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/releases"
          actions={
            <button className="btn btn-primary btn-sm" type="submit"><AmaranthIcon icon={aiFloppyDisk} /> Save</button>
          }
        >
          {curRelease.name}
        </NaviBar>

        <div className="container my-3">
          {status &&
            <div className="alert alert-success"><AmaranthIcon icon={aiCheck} /> {status}</div>
          }
          <fieldset className="row mb-3">
            <div className="col-12">
              <div className="card">
                <div className="card-body p-0 changelog-content">
                  <Editor content={curRelease.changelog} />
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </form>
    </Admin>
  )
}
