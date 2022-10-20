import React from "react";
import { useForm } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import Status from "@/Components/Status";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import TextField from "@/Components/UI/Forms/TextField";
import Checkbox from "@/Components/UI/Forms/Checkbox";
import Fieldset from "@/Components/UI/Forms/Fieldset";

import AmaranthIcon, { aiTrashCan } from "@changewindows/amaranth";

export default function Edit({ can, role, permissions, status }) {
  const {
    data,
    setData,
    patch,
    delete: destroy,
    processing,
    errors,
  } = useForm(role);

  function permissionHandler(permission) {
    if (data.permissions.find((_permission) => _permission === permission)) {
      setData(
        "permissions",
        data.permissions.filter((_permission) => _permission !== permission)
      );
    } else {
      setData("permissions", [...data.permissions, permission]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.roles.update", role));
  }

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("admin.roles.destroy", role));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/roles"
          actions={can.roles.edit && <SaveButton loading={processing} />}
        >
          {data.name || "Unnamed role"}
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <Fieldset
            title="General"
            description="Basic settings."
            disabled={!can.roles.edit}
          >
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
          <Fieldset
            title="Permissions"
            description="What this role can do."
            disabled={!can.roles.edit}
          >
            {permissions.map((permission, key) => (
              <div className="col-12 col-sm-6 col-md-4" key={key}>
                <Checkbox
                  id={permission.name}
                  name={permission.name}
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
      {can.roles.delete && (
        <form onSubmit={handleDelete} className="container my-3 py-0">
          <Fieldset
            title="Danger zone"
            description="All alone in the danger zone."
            danger
          >
            <div className="col-12">
              <p>
                Deleting a user will remove all the content associated with that
                user. Are you sure?
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
