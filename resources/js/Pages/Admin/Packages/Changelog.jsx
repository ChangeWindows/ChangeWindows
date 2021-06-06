import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';

import AmaranthIcon, { aiCheck, aiFloppyDisc } from '@changewindows/amaranth';
import Editor from 'rich-markdown-editor';

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
    const [changelog, setChangelog] = useState(null);

    useEffect(() => {
        setCurRelease(release);
    }, [release]);

    function handleSubmit(event) {
        const _release = Object.assign({}, curRelease);
        _release.changelog = changelog;
        event.preventDefault();
        Inertia.patch(urls.update_release, _release);
    }

    return (
        <Admin>
            <form onSubmit={handleSubmit}>
                <NaviBar
                    back="/admin/packages"
                    actions={
                        <button className="btn btn-primary btn-sm" type="submit"><AmaranthIcon icon={aiFloppyDisc} /> Save</button>
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
                            <h4 className="h5 mb-0">Changelog</h4>
                            <p className="text-muted mb-0"><small>What's new?</small></p>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="card">
                                <div className="card-body ps-editor changelog-content">
                                    <Editor
                                        autoFocus
                                        id="changelog"
                                        value={curRelease.changelog}
                                        onChange={(value) => setChangelog(value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </form>
        </Admin>
    )
}