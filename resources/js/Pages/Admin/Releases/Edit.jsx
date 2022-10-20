import React, { useMemo } from "react";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import Checkbox from "@/Components/UI/Forms/Checkbox";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Select from "@/Components/UI/Forms/Select";
import Status from "@/Components/Status";
import TextField from "@/Components/UI/Forms/TextField";

import ReleaseChannel from "./_ReleaseChannel";

import AmaranthIcon, {
  aiEye,
  aiNotes,
  aiPlus,
  aiTrashCan,
} from "@changewindows/amaranth";

import { parse, format, isValid, parseISO } from "date-fns";

export default function Edit({
  can,
  platforms,
  release,
  channels,
  release_channels,
  status,
}) {
  const {
    data,
    setData,
    patch,
    delete: destroy,
    processing,
    errors,
  } = useForm(release);

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.releases.update", release));
  }

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("admin.releases.destroy", release));
  }

  const availablePlatformChannels = useMemo(
    () =>
      channels.filter(
        (channel) =>
          !release_channels.find(
            (releaseChannel) => releaseChannel.channel_id === channel.id
          )
      ),
    [channels, release_channels]
  );

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/releases"
          actions={can.releases.edit && <SaveButton loading={processing} />}
        >
          {data.name || "Unnamed release"}
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <Fieldset
            title="Identity"
            description="About this release."
            disabled={!can.releases.edit}
          >
            <div className="col-12 col-lg-6">
              <Select
                disabled
                id="platform_id"
                label="Platform"
                value={data.platform_id}
                selects={platforms}
                selectLabel={(x) => x.name}
                selectValue={(x) => x.id}
                errors={errors.platform_id}
                onChange={(e) => setData("platform_id", e.target.value)}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="name"
                label="Name"
                value={data.name}
                errors={errors.name}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="version"
                label="Version"
                value={data.version}
                errors={errors.version}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="canonical_version"
                label="Canonical Version"
                value={data.canonical_version}
                errors={errors.canonical_version}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="codename"
                label="Codename"
                value={data.codename}
                errors={errors.codename}
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
          <Fieldset title="Changelog" description="What's new?" disabledCard>
            <div className="col-12">
              <InertiaLink
                href={route("admin.releases.changelog.edit", release)}
                className="btn btn-primary btn-sm"
              >
                <AmaranthIcon
                  icon={can.releases.edit ? aiNotes : aiEye}
                  className="me-2"
                />
                {can.releases.edit ? "Edit changelog" : "View changelog"}
              </InertiaLink>
            </div>
          </Fieldset>
          <Fieldset
            title="Life cycle"
            description="Dates relate to the life cycle of the release."
            disabled={!can.releases.edit}
          >
            <div className="col-12 col-lg-6">
              <TextField
                type="date"
                id="start_preview"
                label="Start preview"
                value={
                  isValid(parse(data.start_preview, "P", new Date()))
                    ? format(parseISO(data.start_preview), "yyyy-MM-dd")
                    : data.start_preview
                }
                errors={errors.start_preview}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="date"
                id="start_public"
                label="Start public"
                value={
                  isValid(parse(data.start_public, "P", new Date()))
                    ? format(parseISO(data.start_public), "yyyy-MM-dd")
                    : data.start_public
                }
                errors={errors.start_public}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="date"
                id="start_extended"
                label="Start extended"
                value={
                  isValid(parse(data.start_extended, "P", new Date()))
                    ? format(parseISO(data.start_extended), "yyyy-MM-dd")
                    : data.start_extended
                }
                errors={errors.start_extended}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="date"
                id="start_lts"
                label="Start LTS"
                value={
                  isValid(parse(data.start_lts, "P", new Date()))
                    ? format(parseISO(data.start_lts), "yyyy-MM-dd")
                    : data.start_lts
                }
                errors={errors.start_lts}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="date"
                id="end_lts"
                label="End LTS"
                value={
                  isValid(parse(data.end_lts, "P", new Date()))
                    ? format(parseISO(data.end_lts), "yyyy-MM-dd")
                    : data.end_lts
                }
                errors={errors.end_lts}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <Checkbox
                id="ongoing"
                label="Ongoing phase"
                helper="The current phase is undated but ongoing."
                checked={data.ongoing}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset
            title="Flight range"
            description="The range within all flights of this release fall."
            disabled={!can.releases.edit}
          >
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                id="start_build"
                label="Start build"
                value={data.start_build}
                errors={errors.start_build}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                id="start_delta"
                label="Start delta"
                value={data.start_delta}
                errors={errors.start_delta}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                id="end_build"
                label="End build"
                value={data.end_build}
                errors={errors.end_build}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                id="end_delta"
                label="End delta"
                value={data.end_delta}
                errors={errors.end_delta}
                onChange={setData}
              />
            </div>
          </Fieldset>
        </div>
      </form>
      <div className="container mb-0">
        <Fieldset
          title="Release channels"
          description="The channels for this release."
          disabledCard
        >
          <div className="col-12">
            <div className="row g-1">
              {release_channels.map((releaseChannel, key) => (
                <ReleaseChannel key={key} releaseChannel={releaseChannel} can={can} />
              ))}
              {can.releases.edit && availablePlatformChannels.length > 0 && (
                <div className="col-12 col-sm-6 col-xl-4">
                  <div className="dropdown h-100">
                    <a
                      href="#"
                      className="card card-add dropdown-toggle"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="card-body py-3">
                        <h3 className="h5 fw-normal m-0">
                          <AmaranthIcon icon={aiPlus} /> New channel
                        </h3>
                      </div>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {availablePlatformChannels.map((channel, key) => (
                        <InertiaLink
                          key={key}
                          href={route("admin.releasechannels.create", {
                            release: release.id,
                            platform: release.platform.id,
                            channel: channel.id,
                          })}
                          className="dropdown-item d-flex align-items-center"
                        >
                          <div
                            className="dot"
                            style={{
                              backgroundColor: channel.color,
                              padding: 0,
                              margin: "4px 0 0 0",
                            }}
                          />{" "}
                          <div className="ms-2">{channel.name}</div>
                        </InertiaLink>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fieldset>
      </div>
      {can.delete_releases && (
        <form onSubmit={handleDelete} className="container my-3 py-0">
          <Fieldset
            title="Danger zone"
            description="All alone in the danger zone."
            danger
          >
            <div className="col-12">
              <p>
                Deleting a release will remove all the content associated with
                that release. Are you sure?
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
