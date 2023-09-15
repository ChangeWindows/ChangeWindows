import React from "react";
import { useForm } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import TextField from "@/Components/UI/Forms/TextField";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import Checkbox from "@/Components/UI/Forms/Checkbox";

export default function Create({ permissions, urls }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    permissions: [],
  });

  function permissionHandler(e) {
    const id = e.target.id;

    if (data.permissions.find((permission) => permission === id)) {
      setData(
        "permissions",
        data.permissions.filter((permission) => permission !== id)
      );
    } else {
      setData("permissions", [...data.permissions, id]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    post(route("admin.roles.store"));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/roles"
          actions={<SaveButton loading={processing} />}
        >
          {data.name || "Unnamed role"}
        </NaviBar>

        <div className="container my-3">
          <Fieldset title="General" description="Basic settings.">
            <div className="col-12 col-sm-6">
              <TextField
                id="name"
                label="Name"
                value={data.name}
                errors={errors.name}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset title="Permissions" description="What this role can do.">
            {permissions.map((permission, key) => (
              <div className="col-12 col-sm-6 col-md-4" key={key}>
                <Checkbox
                  id={permission.name}
                  name="permission"
                  label={permission.name}
                  checked={
                    data.permissions.filter(
                      (_permission) => _permission === permission.name
                    ).length === 1
                  }
                  disabled={data.permissions.find(
                    (_permission) =>
                      _permission ===
                      permission.name.substr(0, permission.name.indexOf("."))
                  )}
                  onChange={permissionHandler}
                />
              </div>
            ))}
          </Fieldset>
        </div>
      </form>
    </Admin>
  );
}
