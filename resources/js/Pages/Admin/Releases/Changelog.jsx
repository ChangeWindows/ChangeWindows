import React, { useMemo, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';

import AmaranthIcon, { aiCheck, aiFloppyDisk } from '@changewindows/amaranth';
import Editor from '../../../Components/Editor';

export default function Edit({ urls, release, status = null }) {
  const [curRelease, setCurRelease] = useState(release);

  function handleSubmit(event) {
    event.preventDefault();
    Inertia.patch(urls.update_release, curRelease);
  }

  const editor = useMemo(() => release.changelog, []);

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
            <div className="col-12 position-relative">
              <Editor content={editor} setData={setCurRelease} />
            </div>
          </fieldset>
        </div>
      </form>
    </Admin>
  )
}
