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
    channel: null,
    date: format(new Date(), "yyyy-MM-dd"),
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route("admin.promotions.store"));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/promotions"
          actions={<SaveButton loading={processing} />}
        >
          New promotion
        </NaviBar>

        <div className="container my-3">
          <Fieldset title="Promotion date" description="T-minus.">
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
            title="Release channel"
            description="All release channels with no promotion date."
          >
            {releases
              .filter((release) => release.channels.length !== 0)
              .map((release, key) => (
                <div className="col-12 col-lg-6" key={key}>
                  <div className="d-flex mb-1">
                    <div className="me-2">
                      <PlatformIcon platform={release.platform} color />
                    </div>
                    <div className="d-flex flex-column">
                      <span className="fw-bold">{release.name}</span>
                      <small className="text-muted mt-n1">
                        {`${release.start_build}.${release.start_delta}`} -{" "}
                        {`${release.end_build}.${release.end_delta}`}
                      </small>
                    </div>
                  </div>
                  {release.channels.map((channel, key) => (
                    <div className="form-check" key={key}>
                      <input
                        className="form-check-input"
                        type="radio"
                        value={channel.id}
                        id={channel.id}
                        name="channel"
                        checked={data.channel === channel.id}
                        onChange={(e) =>
                          setData("channel", Number(e.target.value))
                        }
                      />
                      <label className="form-check-label" htmlFor={channel.id}>
                        <span style={{ color: channel.color }}>
                          {channel.name}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            {releases.length === 0 && (
              <div className="col-12">
                <p className="mb-0">
                  There are no releases channels without a promotion.
                </p>
              </div>
            )}
          </Fieldset>
        </div>
      </form>
    </Admin>
  );
}
