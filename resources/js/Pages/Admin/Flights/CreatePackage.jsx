import React, { useRef } from "react";
import { useForm } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import Checkbox from "@/Components/UI/Forms/Checkbox";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import TextField from "@/Components/UI/Forms/TextField";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";

import { parse, format, isValid, parseISO } from "date-fns";

export default function Create({ packages }) {
  const { data, setData, post, processing, errors } = useForm({
    major: "",
    minor: "",
    build: "",
    delta: "",
    packageChannels: [],
    date: format(new Date(), "yyyy-MM-dd"),
    tweet: true,
  });

  function channelHandler(e) {
    const id = e.target.id;

    if (data.packageChannels.find((channelId) => channelId === id)) {
      setData(
        "packageChannels",
        data.packageChannels.filter((channelId) => channelId !== id)
      );
    } else {
      setData("packageChannels", [...data.packageChannels, id]);
    }
  }

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
    post(route('admin.flights.storePackage'));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/flights"
          actions={<SaveButton loading={processing} />}
        >
        New flight
        </NaviBar>

        <div className="container my-3">
          <Fieldset
            title="Build string"
            description="The build string for this flight."
          >
            <div className="col-12 col-xl-6">
              <div className="row g-1">
                <div className="col-3">
                  <TextField
                    id="major"
                    label="Major"
                    value={data.major}
                    onFocus={(e) => e.target.select()}
                    onChange={versionHandler}
                    ref={refMajor}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="minor"
                    label="Minor"
                    value={data.minor}
                    onFocus={(e) => e.target.select()}
                    onChange={versionHandler}
                    ref={refMinor}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="build"
                    label="Build"
                    value={data.build}
                    onFocus={(e) => e.target.select()}
                    onChange={versionHandler}
                    ref={refBuild}
                  />
                </div>
                <div className="col-3">
                  <TextField
                    id="delta"
                    label="Delta"
                    value={data.delta}
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
          <Fieldset
            title="Socials"
            description="Socializing, but safe of course, it's still a pandemic..."
          >
            <div className="col-12">
              <Checkbox
                id="tweet"
                label="Publish to Twitter"
                helper="Tweet to the platform-connected Twitter handles."
                checked={data.tweet}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset
            title="Release channels"
            description="All channels this flight is in."
            disabledCard
          >
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row g-3">
                    {packages.map((pack, key) => (
                      <div className="col-12 col-lg-6" key={key}>
                        <div className="d-flex mb-1">
                          <div className="me-2">
                            <PlatformIcon platform={pack.platform} color />
                          </div>
                          <div className="d-flex flex-column">
                            <span className="fw-bold">{pack.name}</span>
                          </div>
                        </div>
                        {pack.channels.map((channel, key) => (
                          <div className="form-check" key={key}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="1"
                              id={channel.id}
                              name="channel"
                              checked={data.packageChannels.find(
                                (channelId) => channelId === channel.id
                              )}
                              onChange={channelHandler}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={channel.id}
                            >
                              <span style={{ color: channel.color }}>
                                {channel.name}
                              </span>
                              {!channel.supported && (
                                <small className="text-muted">
                                  {" "}
                                  - <i>Unsupported</i>
                                </small>
                              )}
                            </label>
                          </div>
                        ))}
                      </div>
                    ))}
                    {packages.length === 0 && (
                      <div className="col-12">
                        <p className="mb-0">No packages available...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Fieldset>
        </div>
      </form>
    </Admin>
  );
}
