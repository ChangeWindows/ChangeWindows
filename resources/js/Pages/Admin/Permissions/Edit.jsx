import React from "react";
import { useForm } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Status from "@/Components/Status";
import TextField from "@/Components/UI/Forms/TextField";

import AmaranthIcon, { aiTrashCan } from "@changewindows/amaranth";

export default function Edit({ can, permission, status }) {
  const {
    data,
    setData,
    patch,
    delete: destroy,
    processing,
    errors,
  } = useForm(permission);

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.permissions.update", permission));
  }

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("admin.permissions.destroy", permission));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/permissions"
          actions={can.permissions.edit && <SaveButton loading={processing} />}
        >
          {data.name || "Unnamed permisison"}
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <Fieldset
            title="General"
            description="Basic settings."
            disabled={!can.permissions.edit}
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
        </div>
      </form>
      {can.permissions.delete && (
        <form onSubmit={handleDelete} className="container my-3 py-0">
          <Fieldset
            title="Danger zone"
            description="All alone in the danger zone."
            danger
          >
            <div className="col-12">
              <p>
                Deleting a permission will remove all the content associated
                with that permission. Are you sure?
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
