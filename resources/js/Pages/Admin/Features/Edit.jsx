import React from "react";
import { useForm } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Status from "@/Components/Status";
import TextField from "@/Components/UI/Forms/TextField";

import AmaranthIcon, { aiTrashCan } from "@changewindows/amaranth";
import Editor from "@/Components/Editor";

export default function Edit({ can, feature, status }) {
  const {
    data,
    setData,
    patch,
    delete: destroy,
    processing,
    errors,
  } = useForm(feature);

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.features.update", feature));
  }

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("admin.features.destroy", feature));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back={route('admin.features.directory')}
          actions={can.features.edit && <SaveButton loading={processing} />}
        >
          {data.name || "Unnamed feature"}
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <Fieldset title="Identity" disabled={!can.features.edit}>
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
                id="featureName"
                label="Feature name"
                value={data.featureName}
                errors={errors.featureName}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset title="Description" disabled={!can.features.edit}>
            <div className="col-12">
              <Editor
                content={data.description}
                setData={setData}
                id="description"
              />
            </div>
          </Fieldset>
        </div>
      </form>
      {can.features.delete && (
        <form onSubmit={handleDelete} className="container my-3 py-0">
          <Fieldset
            title="Danger zone"
            description="All alone in the danger zone."
            danger
          >
            <div className="col-12">
              <p>
                Deleting a feature will remove all the content associated with
                that feature. Are you sure?
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
