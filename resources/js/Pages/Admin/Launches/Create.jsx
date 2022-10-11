import React from "react";
import { useForm } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import NaviBar from "@/Components/NaviBar";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import TextField from "@/Components/UI/Forms/TextField";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Fieldset from "@/Components/UI/Forms/Fieldset";

import { parse, format, isValid, parseISO } from "date-fns";

export default function Create({ releases }) {
  const { data, setData, post, processing, errors } = useForm({
    release: null,
    date: format(new Date(), "yyyy-MM-dd"),
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route("admin.launches.store"));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/launches"
          actions={<SaveButton loading={processing} />}
        >
          New launch
        </NaviBar>

        <div className="container my-3">
          <Fieldset title="Launch date" description="T-minus.">
            <div className="col-12 col-sm-6">
              <TextField
                type="date"
                id="date"
                label="date"
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
          <Fieldset
            title="Releases"
            description="Releases with no launch date."
          >
            {releases.map((release, key) => (
              <div className="col-12 col-lg-6" key={key}>
                <div className="form-check" key={key}>
                  <input
                    className="form-check-input"
                    type="radio"
                    value={release.id}
                    id={release.id}
                    name="release"
                    checked={data.release === release.id}
                    onChange={(e) => setData("release", Number(e.target.value))}
                  />
                  <label className="form-check-label" htmlFor={release.id}>
                    <span className="fw-bold">
                      <PlatformIcon platform={release.platform} color />{" "}
                      {release.name}
                    </span>
                    <p className="lh-sm mt-1 mb-0">
                      <small className="text-muted d-block mt-n1">
                        Version {release.version}, {release.codename}
                      </small>
                    </p>
                  </label>
                </div>
              </div>
            ))}
            {releases.length === 0 && (
              <div className="col-12">
                <p className="mb-0">There are no releases without a launch.</p>
              </div>
            )}
          </Fieldset>
        </div>
      </form>
    </Admin>
  );
}
