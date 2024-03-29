import React from "react";
import { useForm } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import Status from "@/Components/Status";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import TextField from "@/Components/UI/Forms/TextField";
import Checkbox from "@/Components/UI/Forms/Checkbox";
import Fieldset from "@/Components/UI/Forms/Fieldset";

import AmaranthIcon, { aiTrashCan } from "@studio384/amaranth";

export default function Edit({ can, user, roles, status }) {
  const {
    data,
    setData,
    patch,
    delete: destroy,
    processing,
    errors,
  } = useForm(user);

  function roleHandler(role) {
    if (data.roles.find((_role) => _role === role)) {
      setData(
        "roles",
        data.roles.filter((_role) => _role !== role)
      );
    } else {
      setData("roles", [...data.roles, role]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.users.update", user));
  }

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("admin.users.destroy", user));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/users"
          actions={<SaveButton loading={processing} />}
        >
          {data.name || "Unnamed user"}
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <Fieldset
            title="Identity"
            description="Hello! Who are you?"
            disabled={!can.users.edit}
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
            <div className="col-12 col-sm-6">
              <TextField
                type="email"
                id="email"
                label="Email address"
                value={data.email}
                errors={errors.email}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset
            title="Permissions"
            description="What you can do."
            disabled={!can.users.edit}
          >
            {roles.map((role, key) => (
              <div className="col-12 col-sm-6" key={key}>
                <Checkbox
                  id={role.name}
                  name={role.name}
                  label={role.name}
                  checked={
                    data.roles.filter((_role) => _role === role.name)
                      .length === 1
                  }
                  onChange={roleHandler}
                />
              </div>
            ))}
          </Fieldset>
        </div>
      </form>
      {can.users.delete && (
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
