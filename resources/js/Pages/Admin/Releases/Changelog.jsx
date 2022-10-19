import React from "react";
import { useForm } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import Status from "@/Components/Status";
import SaveButton from "@/Components/UI/Forms/SaveButton";

import Editor from "@/Components/Editor";

export default function Edit({ release, status }) {
  const { data, setData, patch, processing } = useForm(release);

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.releases.changelog.update", release));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/releases"
          actions={<SaveButton loading={processing} />}
        >
          {data.name}
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <fieldset className="row mb-3">
            <div className="col-12 position-relative">
              <Editor content={release.changelog} setData={setData} />
            </div>
          </fieldset>
        </div>
      </form>
    </Admin>
  );
}
