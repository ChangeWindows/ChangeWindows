import React from "react";
import { useForm } from "@inertiajs/inertia-react";

import Admin from "@/Layouts/Admin";
import Checkbox from "@/Components/UI/Forms/Checkbox";
import Fieldset from "@/Components/UI/Forms/Fieldset";
import NaviBar from "@/Components/NaviBar";
import SaveButton from "@/Components/UI/Forms/SaveButton";
import Select from "@/Components/UI/Forms/Select";
import TextField from "@/Components/UI/Forms/TextField";

import { parse, format, isValid, parseISO } from "date-fns";

export default function Create({ platforms }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    version: null,
    canonical_version: null,
    codename: "",
    description: "",
    platform_id: "",
    start_preview: null,
    start_public: null,
    start_extended: null,
    start_lts: null,
    end_lts: null,
    ongoing: 0,
    start_build: null,
    start_delta: null,
    end_build: null,
    end_delta: null,
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route("admin.releases.store"));
  }

  return (
    <Admin>
      <form onSubmit={handleSubmit}>
        <NaviBar
          back="/admin/releases"
          actions={<SaveButton loading={processing} />}
        >
          {data.name || "Unnamed release"}
        </NaviBar>

        <div className="container my-3">
          <Fieldset title="Identity" description="About this release.">
            <div className="col-12 col-lg-6">
              <Select
                id="platform_id"
                label="Platform"
                value={data.platform_id}
                selects={platforms}
                selectLabel={(x) => x.name}
                selectValue={(x) => x.id}
                errors={errors.platform_id}
                onChange={(e) => setData('platform_id', e.target.value)}
              />
            </div>
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
                id="version"
                label="Version"
                value={data.version}
                errors={errors.version}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="canonical_version"
                label="Canonical Version"
                value={data.canonical_version}
                errors={errors.canonical_version}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                id="codename"
                label="Codename"
                value={data.codename}
                errors={errors.codename}
                onChange={setData}
              />
            </div>
            <div className="col-12">
              <TextField
                type="textarea"
                id="description"
                label="Description"
                value={data.description}
                errors={errors.description}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset
            title="Life cycle"
            description="Dates relate to the life cycle of the release."
          >
            <div className="col-12 col-lg-6">
              <TextField
                type="date"
                id="start_preview"
                label="Start preview"
                value={
                  isValid(parse(data.start_preview, "P", new Date()))
                    ? format(parseISO(data.start_preview), "yyyy-MM-dd")
                    : data.start_preview
                }
                errors={errors.start_preview}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="date"
                id="start_public"
                label="Start public"
                value={
                  isValid(parse(data.start_public, "P", new Date()))
                    ? format(parseISO(data.start_public), "yyyy-MM-dd")
                    : data.start_public
                }
                errors={errors.start_public}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="date"
                id="start_extended"
                label="Start extended"
                value={
                  isValid(parse(data.start_extended, "P", new Date()))
                    ? format(parseISO(data.start_extended), "yyyy-MM-dd")
                    : data.start_extended
                }
                errors={errors.start_extended}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="date"
                id="start_lts"
                label="Start LTS"
                value={
                  isValid(parse(data.start_lts, "P", new Date()))
                    ? format(parseISO(data.start_lts), "yyyy-MM-dd")
                    : data.start_lts
                }
                errors={errors.start_lts}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="date"
                id="end_lts"
                label="End LTS"
                value={
                  isValid(parse(data.end_lts, "P", new Date()))
                    ? format(parseISO(data.end_lts), "yyyy-MM-dd")
                    : data.end_lts
                }
                errors={errors.end_lts}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <Checkbox
                id="ongoing"
                label="Ongoing phase"
                helper="The current phase is undated but ongoing."
                checked={data.ongoing}
                onChange={setData}
              />
            </div>
          </Fieldset>
          <Fieldset
            title="Flight range"
            description="The range within all flights of this release fall."
          >
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                id="start_build"
                label="Start build"
                value={data.start_build}
                errors={errors.start_build}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                id="start_delta"
                label="Start delta"
                value={data.start_delta}
                errors={errors.start_delta}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                id="end_build"
                label="End build"
                value={data.end_build}
                errors={errors.end_build}
                onChange={setData}
              />
            </div>
            <div className="col-12 col-lg-6">
              <TextField
                type="number"
                id="end_delta"
                label="End delta"
                value={data.end_delta}
                errors={errors.end_delta}
                onChange={setData}
              />
            </div>
          </Fieldset>
        </div>
      </form>
    </Admin>
  );
}
