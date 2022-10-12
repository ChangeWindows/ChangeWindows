import React from "react";
import { useForm } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Select from "@/Components/UI/Forms/Select";
import TextField from "@/Components/UI/Forms/TextField";

export default function Create({ platforms }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    platform_id: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route("admin.packages.store"));
  }

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
          <Fieldset title="Identity" description="About this package.">
            <div className="col-12 col-lg-6">
              <Select
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
        </div>
      </form>
    </Admin>
  );
}
