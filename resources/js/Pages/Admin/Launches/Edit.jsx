import React from "react";
import { useForm } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import Status from "@/Components/Status";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import TextField from "@/Components/UI/Forms/TextField";

import AmaranthIcon, { aiTrashCan } from "@changewindows/amaranth";

import { parse, format, isValid, parseISO } from "date-fns";

export default function Edit({ can, launch, release, platform, status }) {
  const {
    data,
    setData,
    patch,
    delete: destroy,
    processing,
    errors,
  } = useForm({
    ...launch,
    date: format(parseISO(launch.date), "yyyy-MM-dd"),
  });

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.launches.update", launch));
  }

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("admin.launches.destroy", launch));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back={route("admin.launches")}
          actions={can.launches.edit && <SaveButton loading={processing} />}
        >
          <PlatformIcon platform={platform} color className="me-2" />
          Version {release.version}
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <Fieldset
            title="Launch date"
            description="T-minus."
            disabled={!can.launches.edit}
          >
            <div className="col-12 col-sm-6">
              <TextField
                type="date"
                id="date"
                label="Date"
                value={
                  isValid(parse(data.date, "P", new Date()))
                    ? format(parseISO(data.date), "yyyy-MM-dd")
                    : data.date
                }
                errors={errors.date}
                onChange={setData}
              />
            </div>
          </Fieldset>
        </div>
      </form>
      {can.launches.delete && (
        <form onSubmit={handleDelete} className="container my-3 py-0">
          <Fieldset
            title="Danger zone"
            description="All alone in the danger zone."
            danger
          >
            <div className="col-12">
              <p>
                Deleting a launch will remove all the content associated with
                that launch. Are you sure?
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
