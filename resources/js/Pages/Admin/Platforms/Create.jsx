import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";

import AmaranthIcon, { aiFloppyDisk } from "@changewindows/amaranth";

export default function Create({ tweet_streams }) {
  const [curPlatform, setCurPlatform] = useState({
    name: "",
    description: "",
    icon: "",
    color: "#",
    position: 0,
    active: 1,
    legacy: 0,
    tweet_template: "",
    tweet_template_package: "",
    tweet_stream_id: null,
    retweet_stream_id: null,
  });

  function formHandler(event) {
    const { id, value, type } = event.target;
    const _platform = Object.assign({}, curPlatform);

    switch (type) {
      case "checkbox":
        _platform[id] = _platform[id] === 0 ? 1 : 0;
        break;
      default:
        _platform[id] = value;
        break;
    }

    setCurPlatform(_platform);
  }

  function handleSubmit(event) {
    event.preventDefault();
    Inertia.post(route('admin.platforms.store'), curPlatform);
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/platforms"
          actions={
            <button className="btn btn-primary btn-sm" type="submit">
              <AmaranthIcon icon={aiFloppyDisk} /> Save
            </button>
          }
        >
          <PlatformIcon platform={curPlatform} color className="me-2" />{" "}
          {curPlatform.name || "Unnamed platform"}
        </NaviBar>

        <div className="container my-3">
          <fieldset className="row mb-3">
            <div className="col-12 col-md-4 my-4 my-md-0">
              <h4 className="h5 mb-0">Identity</h4>
              <p className="text-muted mb-0">
                <small>About this platform.</small>
              </p>
            </div>
            <div className="col-12 col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={curPlatform.name}
                          onChange={formHandler}
                        />
                        <label htmlFor="name">Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          id="description"
                          style={{ minHeight: 120 }}
                          defaultValue={curPlatform.description}
                          onChange={formHandler}
                        ></textarea>
                        <label htmlFor="description">Comments</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="row mb-3">
            <div className="col-12 col-md-4 my-4 my-md-0">
              <h4 className="h5 mb-0">Appearance</h4>
              <p className="text-muted mb-0">
                <small>The way it will look.</small>
              </p>
            </div>
            <div className="col-12 col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="position"
                          value={curPlatform.position}
                          onChange={formHandler}
                        />
                        <label htmlFor="position">Position</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="color"
                          value={curPlatform.color}
                          onChange={formHandler}
                        />
                        <label htmlFor="color">Color</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="icon"
                          value={curPlatform.icon}
                          onChange={formHandler}
                        />
                        <label htmlFor="icon">Icon</label>
                      </div>
                      <p className="form-text">
                        Note that ChangeWindows only supports a limited set of
                        icons as value here, any unsupported icon will be
                        replaced with the Windows logo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset className="row mb-3">
            <div className="col-12 col-md-4 my-4 my-md-0">
              <h4 className="h5 mb-0">Status</h4>
              <p className="text-muted mb-0">
                <small>The platform's current status.</small>
              </p>
            </div>
            <div className="col-12 col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row g-2">
                    <div className="col-12 col-lg-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                          id="active"
                          checked={curPlatform.active === 1}
                          onChange={formHandler}
                        />
                        <label className="form-check-label" htmlFor="active">
                          Active
                          <br />
                          <p className="form-text">
                            This platform is still receiving updates.
                          </p>
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                          id="legacy"
                          checked={curPlatform.legacy === 1}
                          onChange={formHandler}
                        />
                        <label className="form-check-label" htmlFor="legacy">
                          Legacy
                          <br />
                          <p className="form-text">
                            This platform has been deprecated or is nearing
                            deprecation.
                          </p>
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                          id="tool"
                          checked={curPlatform.tool === 1}
                          onChange={formHandler}
                        />
                        <label className="form-check-label" htmlFor="tool">
                          Tool
                          <br />
                          <p className="form-text">
                            This platform is a tool and should not be displayed
                            beyond the timeline.
                          </p>
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
              <h4 className="h5 mb-0">Tweet Stream</h4>
              <p className="text-muted mb-0">
                <small>Keeping people up-to-date with Twitter.</small>
              </p>
            </div>
            <div className="col-12 col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          id="tweet_stream_id"
                          aria-label="Tweet Stream"
                          value={curPlatform.tweet_stream_id ?? ""}
                          onChange={formHandler}
                        >
                          <option style={{ display: "none" }}>
                            Tweet Stream
                          </option>
                          {tweet_streams.map((tweetStreams, key) => (
                            <option value={tweetStreams.id} key={key}>
                              {tweetStreams.name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="tweet_stream_id">Tweet Stream</label>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          id="retweet_stream_id"
                          aria-label="Retweet Stream"
                          value={curPlatform.retweet_stream_id ?? ""}
                          onChange={formHandler}
                        >
                          <option style={{ display: "none" }}>
                            Retweet Stream
                          </option>
                          {tweet_streams.map((tweetStreams, key) => (
                            <option value={tweetStreams.id} key={key}>
                              {tweetStreams.name}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="retweet_stream_id">
                          Retweet Stream
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control font-monospace"
                          id="tweet_template"
                          style={{ minHeight: 158 }}
                          defaultValue={curPlatform.tweet_template}
                          onChange={formHandler}
                        ></textarea>
                        <label htmlFor="tweet_template">Tweet Template</label>
                      </div>
                      <p className="form-text">
                        Include <code>%RELEASE%</code>, <code>%VERSION%</code>,{" "}
                        <code>%CODENAME%</code>, <code>%FLIGHT%</code>,{" "}
                        <code>%CHANNELS%</code>, and <code>%URL%</code>.
                      </p>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control font-monospace"
                          id="tweet_template_package"
                          style={{ minHeight: 158 }}
                          defaultValue={curPlatform.tweet_template_package}
                          onChange={formHandler}
                        ></textarea>
                        <label htmlFor="tweet_template_package">
                          Tweet Template for Packages
                        </label>
                      </div>
                      <p className="form-text">
                        Include <code>%RELEASE%</code>, <code>%FLIGHT%</code>,{" "}
                        <code>%CHANNELS%</code>, and <code>%URL%</code>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </form>
    </Admin>
  );
}
