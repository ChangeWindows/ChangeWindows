import React from "react";
import { useForm } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import Checkbox from "@/Components/UI/Forms/Checkbox";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Select from "@/Components/UI/Forms/Select";
import Status from "@/Components/Status";
import TextField from "@/Components/UI/Forms/TextField";

import AmaranthIcon, { aiTrashCan } from "@changewindows/amaranth";

export default function Edit({ can, channel, platforms, status }) {
  const {
    data,
    setData,
    patch,
    delete: destroy,
    processing,
    errors,
  } = useForm(channel);

  console.log(can);

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.channels.update", channel));
  }

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("admin.channels.destroy", channel));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back={route("admin.platforms.edit", channel.platform)}
          actions={can.channels.edit && <SaveButton loading={processing} />}
        >
          {data.name || "Unnamed channel"}
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <Fieldset
            title="Identity"
            description="About this channel."
            disabled={!can.channels.edit}
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
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset
            title="Appearance"
            description="The way it will look."
            disabled={!can.channels.edit}
          >
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                id="order"
                label="Order"
                value={data.order}
                errors={errors.order}
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
          </Fieldset>
          <Fieldset
            title="Status"
            description="The paltform's current status."
            disabled={!can.channels.edit}
          >
            <div className="col-12 col-lg-6">
              <Checkbox
                id="active"
                label="Active"
                helper="This channel is still receiving updates."
                checked={data.active}
                onChange={setData}
              />
            </div>
          </Fieldset>
        </div>
      </form>
      {can.channels.delete && (
        <form onSubmit={handleDelete} className="container my-3 py-0">
          <Fieldset
            title="Danger zone"
            description="All alone in the danger zone."
            danger
          >
            <div className="col-12">
              <p>
                Deleting a channel will remove all the content associated with
                that channel. Are you sure?
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
