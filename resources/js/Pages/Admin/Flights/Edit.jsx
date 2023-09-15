import React, { useRef } from "react";
import { useForm } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Status from "@/Components/Status";
import TextField from "@/Components/UI/Forms/TextField";

import AmaranthIcon, { aiTrashCan } from "@studio384/amaranth";

import { parse, format, isValid, parseISO } from "date-fns";

export default function Edit({
  can,
  flight,
  platform,
  release_channel,
  status,
}) {
  const {
    data,
    setData,
    patch,
    delete: destroy,
    processing,
    errors,
  } = useForm({
    ...flight,
    date: format(parseISO(flight.date), "yyyy-MM-dd"),
  });

  const refMajor = useRef(null);
  const refMinor = useRef(null);
  const refBuild = useRef(null);
  const refDelta = useRef(null);

  function versionHandler(key, value) {
    const order = ["major", "minor", "build", "delta"];

    if (value[value.length - 1] === ".") {
      if (key === "major") {
        refMinor.current.focus();
      } else if (key === "minor") {
        refBuild.current.focus();
      } else if (key === "build") {
        refDelta.current.focus();
      }
    } else {
      if (value.includes(".")) {
        const version = value.split(".");

        const target = order.slice(order.indexOf(key));
        const fields = {};

        target.map((key, i) => {
          fields[key] = version[i] ?? "0";
        });

        setData({ ...data, ...fields });
      } else {
        setData(key, value);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    patch(route("admin.flights.update", { flight: flight.id }));
  }

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("admin.flights.destroy", { flight: flight.id }));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/flights"
          actions={can.flights.edit && <SaveButton loading={processing} />}
        >
          <PlatformIcon platform={platform} color className="me-2" />
          {`${data.major}.${data.minor}.${data.build}.${data.delta}`}
          <span
            className="badge ms-2"
            style={{ background: release_channel.color }}
          >
            {release_channel.name}
          </span>
        </NaviBar>

        <div className="container my-3">
          <Status status={status} />
          <Fieldset
            title="Build string"
            description="The build string for this flight."
            disabled={!can.flights.edit}
          >
            <div className="col-12 col-xl-6">
              <div className="row g-1">
                <div className="col-3">
                  <TextField
                    id="major"
                    label="Major"
                    value={data.major.toString()}
                    onFocus={(e) => e.target.select()}
                    onChange={versionHandler}
                    ref={refMajor}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="minor"
                    label="Minor"
                    value={data.minor.toString()}
                    onFocus={(e) => e.target.select()}
                    onChange={versionHandler}
                    ref={refMinor}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="build"
                    label="Build"
                    value={data.build.toString()}
                    onFocus={(e) => e.target.select()}
                    onChange={versionHandler}
                    ref={refBuild}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="delta"
                    label="Delta"
                    value={data.delta.toString()}
                    onFocus={(e) => e.target.select()}
                    onChange={versionHandler}
                    ref={refDelta}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6">
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
      {can.flights.delete && (
        <form onSubmit={handleDelete} className="container my-3 py-0">
          <Fieldset
            title="Danger zone"
            description="All alone in the danger zone."
            danger
          >
            <div className="col-12">
              <p>
                Deleting a flight will remove all the content associated with
                that flight. Are you sure?
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
