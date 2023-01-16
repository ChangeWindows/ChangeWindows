import React from "react";
import { useForm } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import Checkbox from "@/Components/UI/Forms/Checkbox";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Select from "@/Components/UI/Forms/Select";
import TextField from "@/Components/UI/Forms/TextField";

export default function Create({ platforms, params }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    color: "#",
    order: 0,
    active: 1,
    platform_id: params.platform.id,
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route("admin.channels.store"));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back={route("admin.platforms.edit", params.platform)}
          actions={<SaveButton loading={processing} />}
        >
          {data.name || "Unnamed channel"}
        </NaviBar>

        <div className="container my-3">
          <Fieldset title="Identity" description="About this channel.">
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
          <Fieldset title="Appearance" description="The way it will look.">
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
          <Fieldset title="Status" description="The paltform's current status.">
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
    </Admin>
  );
}
