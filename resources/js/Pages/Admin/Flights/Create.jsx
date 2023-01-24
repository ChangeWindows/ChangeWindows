import React, { useMemo, useRef, useState } from "react";
import { useForm } from "@inertiajs/react";

import Admin from "@/Layouts/Admin";
import Checkbox from "@/Components/UI/Forms/Checkbox";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import TextField from "@/Components/UI/Forms/TextField";
import PlatformIcon from "@/Components/Platforms/PlatformIcon";

import { parse, format, isValid, parseISO } from "date-fns";

export default function Create({ releases }) {
  const [showAll, setShowAll] = useState(false);
  const [showEligible, setShowEligible] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    major: "10",
    minor: "0",
    build: "",
    delta: "",
    releaseChannels: [],
    date: format(new Date(), "yyyy-MM-dd"),
    tweet: true,
  });

  const eligibleReleases = useMemo(() => {
    return releases.filter((release) => {
      if (
        !showAll &&
        (Number(data.build) < Number(release.start_build) ||
          (Number(data.build) === Number(release.start_build) &&
            Number(data.delta) < Number(release.start_delta)) ||
          Number(data.build) > Number(release.end_build) ||
          (Number(data.build) === Number(release.end_build) &&
            Number(data.delta) > Number(release.end_delta)))
      ) {
        return false;
      }

      if (!showAll && !showEligible) {
        release.availableChannels = release.channels
          .filter((channel) => channel.supported)
          .sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
      } else {
        release.availableChannels = release.channels.sort(
          (a, b) => parseFloat(a.order) - parseFloat(b.order)
        );
      }

      if (!showAll && release.availableChannels.length === 0) {
        return false;
      }

      return true;
    });
  }, [data, showAll, showEligible]);

  function channelHandler(e) {
    const id = e.target.id;

    if (data.releaseChannels.find((channelId) => channelId === id)) {
      setData(
        "releaseChannels",
        data.releaseChannels.filter((channelId) => channelId !== id)
      );
    } else {
      setData("releaseChannels", [...data.releaseChannels, id]);
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
    post(route("admin.flights.store"));
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
                <div className="card-header">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="1"
                      id="showEligible"
                      name="channel"
                      checked={showEligible}
                      onChange={() => setShowEligible(!showEligible)}
                    />
                    <label className="form-check-label" htmlFor="showEligible">
                      <span className="fw-bold">
                        Show all eligible releases and channels
                      </span>
                      <p className="lh-sm mt-1 mb-0">
                        <small className="text-muted d-block mt-n1">
                          You'll be able to select any channel within a release
                          that accepts this build string.
                        </small>
                      </p>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="1"
                      id="showAll"
                      name="channel"
                      checked={showAll}
                      onChange={() => setShowAll(!showAll)}
                    />
                    <label className="form-check-label" htmlFor="showAll">
                      <span className="fw-bold">
                        Show all releases and channels
                      </span>
                      <p className="lh-sm mt-1 mb-0">
                        <small className="text-muted d-block mt-n1">
                          You'll be able to select any channel, but publishing
                          may be blocked if the build doesn't match.
                        </small>
                      </p>
                    </label>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    {eligibleReleases.map((release, key) => (
                      <div className="col-12 col-lg-6" key={key}>
                        <div className="d-flex mb-1">
                          <div className="me-2">
                            <PlatformIcon platform={release.platform} color />
                          </div>
                          <div className="d-flex flex-column">
                            <span className="fw-bold">{release.name}</span>
                            <small className="text-muted mt-n1">
                              {`${release.start_build}.${release.start_delta}`}{" "}
                              - {`${release.end_build}.${release.end_delta}`}
                            </small>
                          </div>
                        </div>
                        {release.availableChannels.map((channel, _key) => (
                          <div className="form-check" key={_key}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="1"
                              id={channel.id}
                              name="channel"
                              checked={data.releaseChannels.find(
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
                    {eligibleReleases.length === 0 && (
                      <div className="col-12">
                        {data.major === '10' && data.minor === '0' ? (
                          <p className="mb-0">
                            Enter a string to get started...
                          </p>
                        ) : (
                          <p className="mb-0">
                            This build doesn't seem to match any release...
                          </p>
                        )}
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
