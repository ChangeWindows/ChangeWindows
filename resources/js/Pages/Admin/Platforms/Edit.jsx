import React from "react";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import Checkbox from "@/Components/UI/Forms/Checkbox";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Select from "@/Components/UI/Forms/Select";
import Status from "@/Components/Status";
import TextField from "@/Components/UI/Forms/TextField";

import AmaranthIcon, { aiPlus, aiTrashCan } from "@changewindows/amaranth";

export default function Edit({
  can,
  platform,
  channels,
  tweet_streams,
  status,
}) {
  const {
    data,
    setData,
    patch,
    delete: destroy,
    processing,
    errors,
  } = useForm(platform);

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.platforms.update", platform));
  }

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("admin.platforms.destroy", platform));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/platforms"
          actions={<SaveButton loading={processing} />}
        >
          <PlatformIcon platform={data} color className="me-2" />{" "}
          {data.name || "Unnamed platform"}
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <Fieldset
            title="Identity"
            description="About this platform."
            disabled={!can.edit_platforms}
          >
            <div className="col-12 col-lg-6">
              <TextField
                id="name"
                label="Name"
                value={data.name}
                errors={errors.name}
                onChange={setData}
              />
            </div>
            <div className="col-12">
              <TextField
                type="textarea"
                id="description"
                label="Description"
                value={data.description}
                errors={errors.description}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset title="Appearance" description="The way it will look.">
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                id="position"
                label="Position"
                value={data.position}
                errors={errors.position}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="color"
                label="Color"
                value={data.color}
                errors={errors.color}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="icon"
                label="Icon"
                value={data.icon}
                errors={errors.icon}
                onChange={setData}
                helper="Note that ChangeWindows only supports a limited set of icons as value here, any unsupported icon will be replaced with the Windows logo."
              />
            </div>
          </Fieldset>
          <Fieldset
            title="Status"
            description="The platform's current status."
            disabled={!can.edit_platforms}
          >
            <div className="col-12 col-lg-6">
              <Checkbox
                id="active"
                label="Active"
                helper="This platform is still receiving updates."
                checked={data.active}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <Checkbox
                id="legacy"
                label="Legacy"
                helper="This platform has been deprecated or is nearing deprecation."
                checked={data.legacy}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <Checkbox
                id="tool"
                label="Tool"
                helper="This platform is a tool and should not be displayed beyond the timeline."
                checked={data.tool}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset
            title="Tweet Stream"
            description="Keeping people up-to-date with Twitter."
            disabled={!can.edit_platforms}
          >
            <div className="col-12 col-lg-6">
              <Select
                id="tweet_stream_id"
                label="Tweet Stream"
                value={data.tweet_stream_id}
                selects={tweet_streams}
                selectLabel={(x) => x.name}
                selectValue={(x) => x.id}
                errors={errors.tweet_stream_id}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <Select
                id="retweet_stream_id"
                label="Retweet Stream"
                value={data.retweet_stream_id}
                selects={tweet_streams}
                selectLabel={(x) => x.name}
                selectValue={(x) => x.id}
                errors={errors.retweet_stream_id}
                onChange={setData}
              />
            </div>
            <div className="col-12">
              <TextField
                type="textarea"
                label="Tweet Template"
                id="tweet_template"
                value={data.tweet_template}
                errors={errors.tweet_template}
                onChange={setData}
                helper={
                  <>
                    Include <code>%RELEASE%</code>, <code>%VERSION%</code>,{" "}
                    <code>%CODENAME%</code>, <code>%FLIGHT%</code>,{" "}
                    <code>%CHANNELS%</code>, and <code>%URL%</code>.
                  </>
                }
              />
            </div>
            <div className="col-12">
              <TextField
                type="textarea"
                label="Tweet Template for Packages"
                id="tweet_template_package"
                value={data.tweet_template_package}
                errors={errors.tweet_template_package}
                onChange={setData}
                helper={
                  <>
                    Include <code>%RELEASE%</code>, <code>%FLIGHT%</code>,{" "}
                    <code>%CHANNELS%</code>, and <code>%URL%</code>.
                  </>
                }
              />
            </div>
          </Fieldset>
        </div>
      </form>
      <div className="container my-3">
        <Fieldset
          title="Channels"
          description="The channels for this platform."
          disabled={!can.edit_platforms}
          disabledCard
        >
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
        </Fieldset>
      </div>
      {can.delete_platforms && (
        <form onSubmit={handleDelete} className="container my-3 py-0">
          <Fieldset
            title="Danger zone"
            description="All alone in the danger zone."
            danger
          >
            <div className="col-12">
              <p>
                Deleting a platform will remove all the content associated with
                that platform. Are you sure?
              </p>
              <button className="btn btn-danger btn-sm" type="submit">
                <AmaranthIcon icon={aiTrashCan} /> Delete
              </button>
            </div>
          </Fieldset>
        </form>
      )}
    </Admin>
  );
}
