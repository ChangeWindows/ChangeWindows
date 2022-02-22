import React, { useEffect, useMemo, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Admin from '../../../Layouts/Admin';
import NaviBar from '../../../Components/NaviBar';

import AmaranthIcon, { aiCheck, aiFloppyDisc, aiPlus, aiTrashCan } from '@changewindows/amaranth';

import { parse, format, isValid, parseISO } from 'date-fns';

export default function Edit({ can, urls, platforms, release, channels, release_channels, status = null }) {
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
    ongoing: 0,
    start_build: null,
    start_delta: null,
    end_build: null,
    end_delta: null
  });

  useEffect(() => {
    setCurRelease(release);
  }, [release]);

  function formHandler(event) {
    const { id, value, type } = event.target;
    const _release = Object.assign({}, curRelease);

    switch (type) {
      case 'checkbox':
        _release[id] = _release[id] === 0 ? 1 : 0;
        break;
      default:
        _release[id] = value;
        break;
    }

    setCurRelease(_release);
  }

  function handleSubmit(event) {
    event.preventDefault();
    Inertia.patch(urls.update_release, curRelease);
  }

  function handleDelete(event) {
    event.preventDefault();
    Inertia.delete(urls.destroy_release, curRelease);
  }

  const availablePlatformChannels = useMemo(() => channels.filter((channel) => !release_channels.find((releaseChannel) => releaseChannel.channel_id === channel.id)), [channels, release_channels]);

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/releases"
          actions={
            <button className="btn btn-primary btn-sm" type="submit"><AmaranthIcon icon={aiFloppyDisc} /> Save</button>
          }
        >
          {curRelease.name || 'Unnamed release'}
        </NaviBar>

        <div className="container my-3">
          {status &&
            <div className="alert alert-success"><AmaranthIcon icon={aiCheck} /> {status}</div>
          }
          <fieldset className="row mb-3">
            <div className="col-12 col-md-4 my-4 my-md-0">
              <h4 className="h5 mb-0">Identity</h4>
              <p className="text-muted mb-0"><small>About this release.</small></p>
            </div>
            <div className="col-12 col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <select className="form-select" disabled id="platform_id" aria-label="Platform" value={curRelease.platform_id ?? ''} onChange={formHandler}>
                          <option style={{ display: 'none' }}>Select platform</option>
                          {platforms.map((platform, key) => (
                            <option value={platform.id} key={key}>{platform.name}</option>
                          ))}
                        </select>
                        <label htmlFor="platform_id">Platform</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="name" value={curRelease.name} onChange={formHandler} />
                        <label htmlFor="name">Name</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="version" value={curRelease.version} onChange={formHandler} />
                        <label htmlFor="version">Version</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="canonical_version" value={curRelease.canonical_version} onChange={formHandler} />
                        <label htmlFor="canonical_version">Canonical version</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="codename" value={curRelease.codename} onChange={formHandler} />
                        <label htmlFor="codename">Codename</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea className="form-control" id="description" style={{ minHeight: 80 }} defaultValue={curRelease.description} onChange={formHandler}></textarea>
                        <label htmlFor="description">Description</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="row mb-3">
            <div className="col-12 col-md-4 my-4 my-md-0">
              <h4 className="h5 mb-0">Changelog</h4>
              <p className="text-muted mb-0"><small>What's new?</small></p>
            </div>
            <div className="col-12 col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea className="form-control" id="changelog" style={{ minHeight: 240 }} defaultValue={curRelease.changelog} onChange={formHandler}></textarea>
                        <label htmlFor="changelog">Changelog</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="row mb-3">
            <div className="col-12 col-md-4 my-4 my-md-0">
              <h4 className="h5 mb-0">Life cycle</h4>
              <p className="text-muted mb-0"><small>Dates related to the life cycle of the release.</small></p>
            </div>
            <div className="col-12 col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input type="date" className="form-control" id="start_preview" value={isValid(parse(curRelease.start_preview, 'P', new Date())) ? format(parseISO(curRelease.start_preview), 'yyyy-MM-dd') : curRelease.start_preview} onChange={formHandler} />
                        <label htmlFor="start_preview">Start preview</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input type="date" className="form-control" id="start_public" value={isValid(parse(curRelease.start_public, 'P', new Date())) ? format(parseISO(curRelease.start_public), 'yyyy-MM-dd') : curRelease.start_public} onChange={formHandler} />
                        <label htmlFor="start_public">Start public</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input type="date" className="form-control" id="start_extended" value={isValid(parse(curRelease.start_extended, 'P', new Date())) ? format(parseISO(curRelease.start_extended), 'yyyy-MM-dd') : curRelease.start_extended} onChange={formHandler} />
                        <label htmlFor="start_extended">Start extended</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input type="date" className="form-control" id="start_lts" value={isValid(parse(curRelease.start_lts, 'P', new Date())) ? format(parseISO(curRelease.start_lts), 'yyyy-MM-dd') : curRelease.start_lts} onChange={formHandler} />
                        <label htmlFor="start_lts">Start LTS</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input type="date" className="form-control" id="end_lts" value={isValid(parse(curRelease.end_lts, 'P', new Date())) ? format(parseISO(curRelease.end_lts), 'yyyy-MM-dd') : curRelease.end_lts} onChange={formHandler} />
                        <label htmlFor="end_lts">End LTS</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                          id="ongoing"
                          checked={curRelease.ongoing === 1}
                          onChange={formHandler}
                        />
                        <label className="form-check-label" htmlFor="ongoing">
                          Ongoing<br />
                          <p className="form-text">The current phase is undated but ongoing.</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="row mb-3">
            <div className="col-12 col-md-4 my-4 my-md-0">
              <h4 className="h5 mb-0">Flight range</h4>
              <p className="text-muted mb-0"><small>The range within all flights of this release fall.</small></p>
            </div>
            <div className="col-12 col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row g-2">
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input type="number" className="form-control" id="start_build" value={curRelease.start_build} onChange={formHandler} />
                        <label htmlFor="start_build">Start build</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input type="number" className="form-control" id="start_delta" value={curRelease.start_delta} onChange={formHandler} />
                        <label htmlFor="start_delta">Start delta</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input type="number" className="form-control" id="end_build" value={curRelease.end_build} onChange={formHandler} />
                        <label htmlFor="end_build">End build</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input type="number" className="form-control" id="end_delta" value={curRelease.end_delta} onChange={formHandler} />
                        <label htmlFor="end_delta">End delta</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </form>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 my-4 my-md-0">
            <h4 className="h5 mb-0">Release channels</h4>
            <p className="text-muted mb-0"><small>The channels for this release.</small></p>
          </div>
          <div className="col-12 col-md-8">
            <div className="row g-1">
              {release_channels.map((releaseChannel, key) => {
                const releaseChannelstatus = [];

                releaseChannelstatus.push(releaseChannel.short_name)
                releaseChannel.supported && releaseChannelstatus.push('Supported');

                return (
                  <div className="col-12 col-sm-6 col-xl-4" key={key}>
                    <InertiaLink href={releaseChannel.edit_url} className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex">
                          <h3 className="h6 mb-0">
                            <div className="dot" style={{ backgroundColor: releaseChannel.color }} />
                          </h3>
                          <div className="ms-2">
                            <h3 className="h6 mb-0">{releaseChannel.name}</h3>
                            <p className="text-muted mb-0"><small>{releaseChannelstatus.join(', ')}</small></p>
                          </div>
                        </div>
                        <div className="flex-grox-1" />
                      </div>
                    </InertiaLink>
                  </div>
                );
              })}
              {can.edit_releases && availablePlatformChannels.length > 0 &&
                <div className="col-12 col-sm-6 col-xl-4">
                  <div className="dropdown h-100">
                    <a href="#" className="card card-add dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                      <div className="card-body py-3">
                        <h3 className="h5 fw-normal m-0"><AmaranthIcon icon={aiPlus} /> New channel</h3>
                      </div>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      {availablePlatformChannels.map((channel, key) => (
                        <InertiaLink key={key} href={`${urls.create_release_channel}&channel=${channel.id}`} className="dropdown-item d-flex align-items-center">
                          <div className="dot" style={{ backgroundColor: channel.color, padding: 0, margin: '4px 0 0 0' }} /> <div className="ms-2">{channel.name}</div>
                        </InertiaLink>
                      ))}
                    </ul>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      {can.delete_releases &&
        <form onSubmit={handleDelete}>
          <div className="container my-3">
            <div className="row">
              <div className="col-12 col-md-4 my-4 my-md-0">
                <h4 className="h5 mb-0 text-danger">Danger zone</h4>
                <p className="text-muted mb-0"><small>All alone in the danger zone.</small></p>
              </div>
              <div className="col-12 col-md-8">
                <div className="card">
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <p>Deleting a release will remove all the content associated with that release. Are you sure?</p>
                        <button className="btn btn-danger btn-sm" type="submit"><AmaranthIcon icon={aiTrashCan} /> Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      }
    </Admin>
  )
}
