import React from "react";
import { useForm } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import Checkbox from "@/Components/UI/Forms/Checkbox";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Select from "@/Components/UI/Forms/Select";
import Status from "@/Components/Status";
import TextField from "@/Components/UI/Forms/TextField";

import AmaranthIcon, { aiTrashCan } from "@changewindows/amaranth";

export default function Edit({
  can,
  releaseChannel,
  releases,
  channels,
  status,
}) {
  const {
    data,
    setData,
    patch,
    delete: destroy,
    processing,
    errors,
  } = useForm(releaseChannel);

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.releasechannels.update", releaseChannel));
  }

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("admin.releasechannels.destroy", releaseChannel));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/releases"
          actions={can.releases.edit && <SaveButton loading={processing} />}
        >
          {data.name || "Unnamed channel"}
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <Fieldset
            title="Identity"
            description="About this release channel."
            disabled={!can.releases.edit}
          >
            <div className="col-12 col-lg-6">
              <Select
                id="channel_id"
                label="Channel"
                value={data.channel_id}
                selects={channels}
                selectLabel={(x) => x.name}
                selectValue={(x) => x.id}
                errors={errors.channel_id}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <Select
                id="release_id"
                label="Release"
                value={data.release_id}
                selects={releases}
                selectLabel={(x) => x.name}
                selectValue={(x) => x.id}
                errors={errors.release_id}
                onChange={setData}
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
                id="short_name"
                label="Short name"
                value={data.short_name}
                errors={errors.short_name}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset
            title="Status"
            description="The channel's current status."
            disabled={!can.releases.edit}
          >
            <div className="col-12 col-lg-6">
              <Checkbox
                id="supported"
                label="Supported"
                helper="This release channel is still receiving updates."
                checked={data.supported}
                onChange={setData}
              />
            </div>
          </Fieldset>
        </div>
      </form>
      {can.releases.delete && (
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
