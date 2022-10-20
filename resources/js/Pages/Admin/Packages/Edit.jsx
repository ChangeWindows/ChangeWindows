import React, { useMemo } from "react";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Select from "@/Components/UI/Forms/Select";
import Status from "@/Components/Status";
import TextField from "@/Components/UI/Forms/TextField";

import AmaranthIcon, {
  aiEye,
  aiNotes,
  aiPlus,
  aiTrashCan,
} from "@changewindows/amaranth";

export default function Edit({
  can,
  platforms,
  pack,
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
  } = useForm(pack);

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.packages.update", pack));
  }

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("admin.packages.destroy", pack));
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
          back="/admin/packages"
          actions={<SaveButton loading={processing} />}
        >
          {data.name || "Unnamed package"}
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
                href={route("admin.packages.changelog.edit", pack)}
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
        </div>
      </form>
      <div className="container mb-0">
        <Fieldset
          title="PAckage channels"
          description="The channels for this package."
          disabledCard
        >
          <div className="col-12 col-md-8">
            <div className="row g-3">
              {release_channels.map((releaseChannel, key) => {
                const releaseChannelstatus = [];

                releaseChannelstatus.push(releaseChannel.short_name);
                releaseChannel.supported &&
                  releaseChannelstatus.push("Supported");

                return (
                  <div className="col-12 col-sm-6 col-xl-4" key={key}>
                    <InertiaLink
                      href={route("admin.releasechannels.edit", releaseChannel)}
                      className="card border-0 shadow-sm h-100"
                    >
                      <div className="card-body">
                        <div className="d-flex">
                          <h3 className="h6 mb-0">
                            <div
                              className="dot"
                              style={{ backgroundColor: releaseChannel.color }}
                            />
                          </h3>
                          <div className="ms-2">
                            <h3 className="h6 mb-0">{releaseChannel.name}</h3>
                            <p className="text-muted mb-0">
                              <small>{releaseChannelstatus.join(", ")}</small>
                            </p>
                          </div>
                        </div>
                        <div className="flex-grox-1" />
                      </div>
                    </InertiaLink>
                  </div>
                );
              })}
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
                            release: pack,
                            platform: pack.platform,
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
      {can.releases.delete && (
        <form onSubmit={handleDelete} className="container my-3 py-0">
          <Fieldset
            title="Danger zone"
            description="All alone in the danger zone."
            danger
          >
            <div className="col-12">
              <p>
                Deleting a package will remove all the content associated with
                that package. Are you sure?
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
