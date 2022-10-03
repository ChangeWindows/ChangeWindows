import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Status from "@/Components/Status";

import AmaranthIcon, {
  aiFloppyDisk,
  aiPlus,
  aiTrashCan,
} from "@changewindows/amaranth";

export default function Edit({
  can,
  platform,
  channels,
  tweet_streams,
  status,
}) {
  const [curPlatform, setCurPlatform] = useState(platform);

  useEffect(() => {
    setCurPlatform(platform);
  }, [platform]);

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
    Inertia.patch(route("admin.platforms.update", platform), curPlatform);
  }

  function handleDelete(event) {
    event.preventDefault();
    Inertia.delete(route("admin.platforms.destroy", platform), curPlatform);
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
          <Status status={status} />
          <fieldset className="row mb-3" disabled={!can.edit_platforms}>
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
          <fieldset className="row mb-3" disabled={!can.edit_platforms}>
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
          <fieldset className="row mb-3" disabled={!can.edit_platforms}>
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
          <fieldset className="row mb-3" disabled={!can.edit_platforms}>
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
      <div className="container my-3">
        <div className="row">
          <div className="col-12 col-md-4 my-4 my-md-0">
            <h4 className="h5 mb-0">Channels</h4>
            <p className="text-muted mb-0">
              <small>The channels for this platform.</small>
            </p>
          </div>
          <div className="col-12 col-md-8">
            <div className="row g-1">
              {channels.map((channel) => {
                const channelstatus = [];

                channel.active && channelstatus.push("Active");

                return (
                  <div className="col-12 col-sm-6 col-xl-4" key={channel.id}>
                    <InertiaLink
                      href={channel.edit_url}
                      className="card border-0 shadow-sm h-100"
                    >
                      <div className="card-body">
                        <div className="d-flex">
                          <h3 className="h6 mb-0">
                            <div
                              className="dot"
                              style={{ backgroundColor: channel.color }}
                            />
                          </h3>
                          <div className="ms-2">
                            <h3 className="h6 mb-0">{channel.name}</h3>
                            <p className="text-muted mb-0 mt-n1">
                              <small>{channelstatus.join(", ")}</small>
                            </p>
                          </div>
                        </div>
                        <div className="flex-grox-1" />
                      </div>
                    </InertiaLink>
                  </div>
                );
              })}
              {can.create_channels && (
                <div className="col-12 col-sm-6 col-xl-4">
                  <InertiaLink
                    href={route("admin.channels.create", {
                      platform: platform.id,
                    })}
                    className="card card-add"
                  >
                    <div className="card-body py-3">
                      <h3 className="h5 fw-normal m-0">
                        <AmaranthIcon icon={aiPlus} /> New channel
                      </h3>
                    </div>
                  </InertiaLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {can.delete_platforms && (
        <form onSubmit={handleDelete}>
          <div className="container my-3">
            <div className="row">
              <div className="col-12 col-md-4 my-4 my-md-0">
                <h4 className="h5 mb-0 text-danger">Danger zone</h4>
                <p className="text-muted mb-0">
                  <small>All alone in the danger zone.</small>
                </p>
              </div>
              <div className="col-12 col-md-8">
                <div className="card">
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <p>
                          Deleting a platform will remove all the content
                          associated with that platform. Are you sure?
                        </p>
                        <button className="btn btn-danger btn-sm" type="submit">
                          <AmaranthIcon icon={aiTrashCan} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Admin>
  );
}
