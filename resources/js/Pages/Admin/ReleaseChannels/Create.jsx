import React from "react";

import NaviBar from "@/Components/NaviBar";
import Checkbox from "@/Components/UI/Forms/Checkbox";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Select from "@/Components/UI/Forms/Select";
import TextField from "@/Components/UI/Forms/TextField";
import Admin from "@/Layouts/Admin";

import { useForm } from "@inertiajs/react";

export default function Create({ releases, channels, channel, params }) {
  const { data, setData, post, processing, errors } = useForm({
    name: channel.name,
    short_name: channel.name.split(" ")[0],
    supported: 1,
    channel_id: params.channel,
    release_id: params.release,
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route("admin.releasechannels.store"));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar back="/admin/releases" actions={<SaveButton loading={processing} />}>
          {data.name || "Unnamed channel"}
        </NaviBar>

        <div className="container my-3">
          <Fieldset title="Identity" description="About this release channel.">
            <div className="col-lg-6 col-12">
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
            <div className="col-lg-6 col-12">
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
            <div className="col-lg-6 col-12">
              <TextField id="name" label="Name" value={data.name} errors={errors.name} onChange={setData} />
            </div>
            <div className="col-lg-6 col-12">
              <TextField
                id="short_name"
                label="Short name"
                value={data.short_name}
                errors={errors.short_name}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset title="Status" description="The channel's current status.">
            <div className="col-lg-6 col-12">
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
    </Admin>
  );
}
